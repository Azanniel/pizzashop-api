import { Elysia } from 'elysia'
import { auth } from '../auth'
import { db } from '../../db/connection'

export const getManagedRestaurant = new Elysia()
  .use(auth)
  .get('/managed-restaurant', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new Error('User is not a manager')
    }

    const restaurant = await db.query.restaurants.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, restaurantId)
      },
    })

    return restaurant
  })
