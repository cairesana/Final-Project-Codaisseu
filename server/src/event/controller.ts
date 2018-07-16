import { JsonController, Get } from 'routing-controllers'
import Event from './entity'


@JsonController()
export default class EventController {

    // endpoint that returns all the events 
    @Get('/events')
    async allEvents() {
    const events = await Event.find()         // .find() is used to get all rows
    return { events }
    } //tested: http :4000/events
}