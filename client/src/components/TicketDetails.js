import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import {fetchTicket} from '../actions/ticket';
import CommentForm from './CommentForm';
import {createComment} from '../actions/comment';
import {Link} from 'react-router-dom';



class TicketDetails extends PureComponent {
    
    createComment = (comment) => {
        this.props.createComment(comment, this.props.match.params.id)
    }

    componentDidMount() {
        this.props.fetchTicket(this.props.match.params.id);
    }

    render() {
        const { ticket } = this.props;

        if (!ticket) return null
    
        let riskPercentage = 5;
        let myTicket = ticket;
        const totalTickets = myTicket ? myTicket.user.tickets.length : 0;
        const allTicketsFromEvent = myTicket ? myTicket.event.tickets : 0;

        if (totalTickets === 1) {
            riskPercentage += 10;
        }

        if (allTicketsFromEvent) {
            // console.log(allTicketsFromEvent);
            let totalPrice = 0;
            let averagePrice = 0;
            let percentageDifference = 0;

            for (let i = 0; i < allTicketsFromEvent.length; i++) {
                totalPrice += allTicketsFromEvent[i].price;   
            }

            averagePrice = totalPrice / allTicketsFromEvent.length;
            percentageDifference = (((averagePrice - ticket.price) / averagePrice) * 100);

            if (ticket.price < averagePrice) { // ticket x% cheaper than the average price
                riskPercentage += percentageDifference;  //add x% to the risk
            } else {
                percentageDifference = percentageDifference * -1; // convertendo resultado neg para positivo 
                if (percentageDifference > 10) { // ticket is x% more expensive than average price
                    riskPercentage -= 10; // deduct a maximum of 10*
                } else {
                    riskPercentage -= percentageDifference;
                }
            }
        }

        // Check what time the ticket was created
        const createdTime = ticket.created.split('T')[1];
        const createdHour = parseInt(createdTime.substring(0, 2),10); // Pega so a hora porque nao e possivel comparar se string eh maior ou menor
        //console.log(createdHour);

        if (createdHour >= 9 && createdHour <= 17) {
            riskPercentage -= 10;
        } else {
            riskPercentage += 10;
        }

        // Check the amount of comments
        if (ticket.comments.length > 3) {
            riskPercentage += 5;
        }

        //ckecks final values (minimal risk of 5 and a maximum risk of 95)
        if (riskPercentage < 5) {
            riskPercentage = 5;
        }
        if (riskPercentage > 95) {
            riskPercentage = 95;
        }

        riskPercentage = parseInt(riskPercentage, 10);


        return (
            <div>
                <h2>Ticket Details:</h2>
                
                <img src={ticket.ticketPictureUrl} alt=""/>
                {<p>Description: {ticket.description}</p>}
                {<p>Price: {ticket.price}</p>}
                {<p>Seller: {ticket.user.firstName}</p>}
                {<p>Created at: {ticket.created}</p>}
                {<p>We calculated that the risk of this ticket being a fraud is {riskPercentage}%</p>}
                
                <br/>

                <h1>Comments:</h1>
                { ticket.comments.map(comment => (<div key={comment.id}>
                <h4>{comment.content}</h4>
                <p>By {comment.author}</p>
                </div> ))}

                <br/>

                { this.props.currentUser && <h2>Create a comment to this ticket</h2> }

                { this.props.currentUser && <CommentForm ticketId={this.props.match.params.id} onSubmit={this.createComment} /> }
                { !this.props.currentUser && <h2>To create a comment, please <Link to="/login">login</Link></h2> }
            </div>
        )
    }
}

    const mapStateToProps = function (state, props) {
        return {
            ticket: state.ticket,
            tickets: state.tickets,
            currentUser: state.currentUser
        }
    }

export default connect(mapStateToProps, {fetchTicket, createComment})(TicketDetails)