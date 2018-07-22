import {FETCHED_DETAILED_EVENT} from '../actions/event'
import {ADD_TICKET} from '../actions/ticket'

export default function (state = null, action) {
  switch (action.type) {
    case FETCHED_DETAILED_EVENT:
      return action.payload

    case ADD_TICKET:
      return {...state, tickets: [...state.tickets, action.payload]};

    default:
      return state
  }
}