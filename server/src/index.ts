import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import EventController from "./event/controller"
import TicketController from './ticket/controller'
import CommentController from './comment/controller'
import setupDb from './db'


const app = createKoaServer({
    cors: true,
    controllers: [
       EventController, 
       TicketController, 
       CommentController]
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))

