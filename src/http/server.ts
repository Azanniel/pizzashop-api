import { Elysia } from 'elysia'
import { registerRestaurant } from './routes/register-restaurants'
import { sendAuthLink } from './routes/send-auth-link'

const app = new Elysia().use(registerRestaurant).use(sendAuthLink)

app.listen(3333, () => {
  console.log('🔥 HTTP server running')
})
