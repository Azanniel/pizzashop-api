import postgres from 'postgres'
import chalk from 'chalk'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { env } from '../env'

const connection = postgres(env.DATABASE_URL, { max: 1 })
const db = drizzle(connection)

await migrate(db, {migrationsFolder: 'drizzle'})
await connection.end()

console.log(chalk.greenBright('Migrations applied successfully!'))

process.exit()