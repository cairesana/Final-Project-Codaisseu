import { JsonController, Get, Post, HttpCode, Body, Param, Authorized } from 'routing-controllers'
import Event from './entity'


@JsonController()
export default class EventController {

    // endpoint that returns all the events 
    @Get('/events')
    async allEvents() {
    const events = await Event.find()         // .find() is used to get all rows
    return { events }
    } //tested: http :4000/events

    //endpoint that finds an event by id
    @Get('/events/:id')
    getEvent(
        @Param('id') id: number
    ) {
        return Event.findOne(id)
    } // tested: http :4000/events/1   -- id 3 not found error -- precisa do catch error?

    //endpoint that creates an event
    @Authorized()
    @Post('/events')
    @HttpCode(201)
    createEvent(
        @Body() event: Event
    ) {
        return event.save()
    } //tested: http post :4000/events name="music festival" description="enjoy music all day" pictureUrl="http://customerfaithful.com/wp-content/uploads/2015/07/pemberton-music-festival-evening-696x386.jpg" startDate="2018-08-10" endDate="2018-08-11"
}