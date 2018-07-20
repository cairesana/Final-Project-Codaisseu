import { JsonController, Get, Param, Body, NotFoundError, Put, Post, HttpCode, Authorized } from 'routing-controllers'
import Ticket from './entity'


@JsonController()
export default class TicketController {

    @Get('/tickets')
    async allTickets() {
        const tickets = await Ticket.find({relations:["user"]})
        return { tickets }
    } //tested: http :4000/tickets

    @Get('/tickets/:id')
    getTicket(
        @Param('id') id: number
    ) {
        return Ticket.findOne(id, {relations:["user"]})
    }  // tested: http :4000/tickets/8

    @Get('/tickets/byuser/:userId')
    getTicketByUser(
        @Param('userId') userId:number
    ) {
        const conditions = {where: {user: userId}}
        return Ticket.findAndCount(conditions)
    }

    @Authorized()
    @Post('/tickets/:id/:userId')
    @HttpCode(201)
    createTicket(
        @Body() ticket: Ticket,
        @Param('id') id: number,
        @Param('userId') userId: number
    ) {
        ticket.event = Number(id);
        ticket.user = Number(userId);
        return ticket.save()
    } // tested: http post :4000/tickets/1/1 ticketPictureUrl="http://oxydy.com/wp-content/uploads/2018/02/test-img-300x194.png" description="buy now another summer festival" price=40
     
     //@Authorized
     @Put('/tickets/:id')
     async updateTicket(
         @Param('id') id: number,
         @Body() update: Partial<Ticket>
     ) {
         const ticket = await Ticket.findOne(id)
         if (!ticket) throw new NotFoundError('Cannot find this ticket')

         return Ticket.merge(ticket, update).save()
     } // test: http put :4000/tickets/15 description="enjoy this lovely summer festival" price=55
}





