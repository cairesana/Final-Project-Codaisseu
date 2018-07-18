import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
//import './style.css';
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
              
                { events.map(event => (<div key={event.Id}>
                    <ul>
                        <Link to={`/events/${event.Id}`}><h2>{event.name}</h2></Link>
                        <img src={event.pictureUrl} alt=""/>
                    </ul>
                </div> ))}

                <h1>Create a new event</h1>

                <EventForm onSubmit={this.createEvent} />

          </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        events: state.events
    }
}
      
export default connect(mapStateToProps, { fetchAllEvents, createEvent })(EventList)

     

// { events.map(event => (<div key={event.id}>
//     <h2>{event.name}</h2>
//     <img src={event.pictureUrl} alt=""/>
//     </div> ))}