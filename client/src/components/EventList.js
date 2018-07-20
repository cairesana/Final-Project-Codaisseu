import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {fetchAllEvents, createEvent} from '../actions/event'
import EventForm from './EventForm';

class EventList extends PureComponent {
    static propTypes = {
      events: PropTypes.arrayOf(PropTypes.shape({
        Id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        pictureUrl: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired
        })).isRequired
    }
    
    createEvent = (event) => {
        this.props.createEvent(event)
    }

    componentWillMount() {
        this.props.fetchAllEvents();
    }
    
    render() {
        const { events } = this.props;
    
        return (
          <div>
            <h1>All events</h1>
                <ul className="event-list">
                    { events.map(event => (
                            <Link className="event" key={event.Id} to={`/events/${event.Id}`}>
                                <li className="event-item">
                                    <h2 className="event-title">{event.name}</h2>
                                    <img src={event.pictureUrl} alt=""/> 
                                </li>
                            </Link>
                    ))}
                </ul>

                <br/>

                { this.props.currentUser && <h2>Create a new event</h2> }
                { this.props.currentUser && <p>-- Please, fill in all fields --</p> }

                { this.props.currentUser && <EventForm onSubmit={this.createEvent} /> } 
                { !this.props.currentUser && <h2>To create a new event, please <Link to="/login">login</Link></h2 >}

          </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        events: state.events,
        currentUser: state.currentUser 
    }
}
      
export default connect(mapStateToProps, { fetchAllEvents, createEvent })(EventList)