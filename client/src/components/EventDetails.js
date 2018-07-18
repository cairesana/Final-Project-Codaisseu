import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import {fetchEvent} from '../actions/event';
import {createTicket} from '../actions/ticket';
import TicketForm from './TicketForm';
import {Link} from 'react-router-dom';

class EventDetails extends PureComponent {
    createTicket = (ticket) => {
        this.props.createTicket(ticket, this.props.match.params.id)
    }
    
    componentWillMount() {
        this.props.fetchEvent(this.props.match.params.id);
    }

    render() {
        const { event } = this.props;
        if (!event) return null
        return (
            <div>
                <h1>{event.name}</h1>
                
                <img src={event.pictureUrl} alt=""/>
                {<p>Description: {event.description}</p>}
                {<p>Start Date: {event.startDate}</p>}
                {<p>End Date: {event.endDate}</p>}

                <h2>Tickets for sale:</h2>
                { event.tickets.map(ticket => (<div key={ticket.id}>
                    <Link to={`/ticket/${ticket.id}`}>{ticket.description}</Link>
                    <p>Price: {ticket.price}</p>
                    <img src={ticket.ticketPictureUrl} alt=""/>
                </div> ))}

                <h2>Create a ticket to sell</h2>

                <TicketForm eventId={this.props.match.params.id} onSubmit={this.createTicket} />

          </div>
        )
    }
}

const mapStateToProps = function (state, props) {
    return {
      event: state.event
    }
}

export default connect(mapStateToProps, {fetchEvent, createTicket})(EventDetails)
       