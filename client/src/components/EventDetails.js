import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import {fetchEvent} from '../actions/event';

class EventDetails extends PureComponent {
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

                { event.ticket.map(ticket => (<div key={ticket.id}>
                  <h2>{ticket.description}</h2>
                  <p>{ticket.price}</p>
                </div> ))}
          </div>
        )
    }
}

const mapStateToProps = function (state, props) {
    return {
      event: state.event
    }
}

export default connect(mapStateToProps, {fetchEvent})(EventDetails)
       