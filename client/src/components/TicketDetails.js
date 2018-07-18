import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import {fetchTicket} from '../actions/ticket';
import CommentForm from './CommentForm';
import {createComment} from '../actions/comment';


class TicketDetails extends PureComponent {
    createComment = (comment) => {
        this.props.createComment(comment, this.props.match.params.id)
    }

    componentWillMount() {
        this.props.fetchTicket(this.props.match.params.id);
    }

    render() {
        const { ticket } = this.props;
        if (!ticket) return null
        return (
            <div>
                <h1>{ticket.id}</h1>
                
                <img src={ticket.ticketPictureUrl} alt=""/>
                {<p>Description: {ticket.description}</p>}
                {<p>Price: {ticket.price}</p>}
                
                <h1>Comments</h1>
                { ticket.comments.map(comment => (<div key={comment.id}>
                <h4>{comment.content}</h4>
                <p>By {comment.author}</p>
                </div> ))}

                <h2>Create a comment to this ticket</h2>

                <CommentForm ticketId={this.props.match.params.id} onSubmit={this.createComment} />
            </div>
        )
    }
}

    const mapStateToProps = function (state, props) {
        return {
            ticket: state.ticket
        }
    }

export default connect(mapStateToProps, {fetchTicket, createComment})(TicketDetails)