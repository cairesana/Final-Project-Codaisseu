import 'reflect-metadata'
import {createKoaServer, Action} from "routing-controllers"
import EventController from "./event/controller"
import TicketController from './ticket/controller'
import CommentController from './comment/controller'
import setupDb from './db'
import UserController from './user/controller';
import LoginController from './logins/controller';
import { verify } from './jwt';



const app = createKoaServer({
    cors: true,
    controllers: [
       EventController, 
       TicketController, 
       CommentController, 
       UserController,
       LoginController
    ],
    authorizationChecker: (action: Action) => {
      const header: string = action.request.headers.authorization
    
      if (header && header.startsWith('Bearer ')) {
        const [ , token ] = header.split(' ')
        return !!(token && verify(token))
      }
      // ...
      return false
    }
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))


  
  