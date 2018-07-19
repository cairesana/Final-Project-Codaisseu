import { JsonController, Get, Param, Body, NotFoundError, Put, Post, HttpCode } from 'routing-controllers'
import Ticket from './entity'


@JsonController()
export default class TicketController {

    //endpoint that returns all tickets
    @Get('/tickets')
    async allTickets() {
        const tickets = await Ticket.find()
        return { tickets }
    } //tested: http :4000/tickets

    @Get('/tickets/:id')
    getTicket(
        @Param('id') id: number
    ) {
        return Ticket.findOne(id)
    }  // test: http :4000/tickets/8


    //creates a ticket
    //@Authorized //mudar aqui depois que criar o login
    @Post('/tickets/:id')
    @HttpCode(201)
    createTicket(
        @Body() ticket: Ticket,
        @Param('id') id: number
    ) {
        ticket.event = Number(id);
        return ticket.save()
    } // test: http post :4000/tickets author_id=1 ticket_picture_url="" description="buy now another summer festival" price=40 event_id=4
     
     //update edit ticket
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





