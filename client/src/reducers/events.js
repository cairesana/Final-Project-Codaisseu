import {FETCHED_ALL_EVENTS, ADD_EVENT} from '../actions/event'
import {ADD_TICKET} from '../actions/ticket'

export default function (state = [], action) {
  switch (action.type) {
    case FETCHED_ALL_EVENTS:
      return action.payload

    case ADD_EVENT:
      return [...state, action.payload]

    case ADD_TICKET:
    const currentEvent = state.filter(event => event.Id === action.payload.event)[0];
    currentEvent.tickets = [
      ...currentEvent.tickets || [], { ...action.payload, comments: [] }
    ];

    return [...state, currentEvent];

    default:
      return state
  }
}

//sem o || [] vc cria um evento novo, ok, porem, quando entra nele e added um novo ticket,
// da erro de current.Events eh undefined or null.. undefined. Solucao colocar o ou [] 