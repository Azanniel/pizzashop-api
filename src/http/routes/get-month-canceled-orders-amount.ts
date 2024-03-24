import { Elysia } from 'elysia'
import { auth } from '../auth'
import { UnauthorizedError } from '../errors/unauthorized-error'
import dayjs from 'dayjs'
import { db } from '../../db/connection'
import { orders } from '../../db/schema'
import { and, count, eq, gte, sql } from 'drizzle-orm'

export const getMonthCanceledOrdersAmount = new Elysia()
  .use(auth)
  .get('/metrics/month-canceled-order-amount', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError()
    }

    const today = dayjs()
    const lastMonth = today.subtract(1, 'month')
    const startOfLastMonth = lastMonth.startOf('month')

    const ordersPerMonth = await db
      .select({
        monthWithYear: sql<string>`${sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`}`,
        amount: count(),
      })
      .from(orders)
      .where(
        and(
          eq(orders.restaurantId, restaurantId),
          eq(orders.status, 'canceled'),
          gte(orders.createdAt, startOfLastMonth.toDate()),
        ),
      )
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`)

    const currentMonthWithYear = today.format('YYYY-MM') // 2024-02
    const lastMonthWithYear = lastMonth.format('YYYY-MM') // 2024-01

    const currentMonthOrdersAmount = ordersPerMonth.find((orderPerMonth) => {
      return orderPerMonth.monthWithYear === currentMonthWithYear
    })

    const lastMonthOrdersAmount = ordersPerMonth.find((orderPerMonth) => {
      return orderPerMonth.monthWithYear === lastMonthWithYear
    })

    const diffFromLastMonth =
      currentMonthOrdersAmount && lastMonthOrdersAmount
        ? (currentMonthOrdersAmount.amount * 100) /
            lastMonthOrdersAmount.amount -
          100
        : 0

    return {
      amount: currentMonthOrdersAmount?.amount,
      diffFromLastMonth: diffFromLastMonth.toFixed(2),
    }
  })
