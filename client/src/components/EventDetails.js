import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import {fetchEvent} from '../actions/event';
import {createTicket} from '../actions/ticket';
import TicketForm from './TicketForm';

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

                { event.tickets.map(ticket => (<div key={ticket.id}>
                  <h2>{ticket.description}</h2>
                  <p>{ticket.price}</p>
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
       