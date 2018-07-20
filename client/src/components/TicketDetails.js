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

        if (totalTickets === 1) {
            riskPercentage += 10;
        }

        return (
            <div>
                <h2>Ticket Details:</h2>
                
                <img src={ticket.ticketPictureUrl} alt=""/>
                {<p>Description: {ticket.description}</p>}
                {<p>Price: {ticket.price}</p>}
                {<p>Seller: {ticket.user.firstName}</p>}
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