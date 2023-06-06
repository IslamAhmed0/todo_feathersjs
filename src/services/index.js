import { todo } from './todo/todo.js'
import { users } from './users/users.js'

export const services = (app) => {

 app.configure(todo)
  app.configure(users)
  // All services will be registered here
}
