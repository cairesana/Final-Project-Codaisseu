import {FETCHED_ALL_TICKETS, ADD_TICKET} from '../actions/ticket'

export default function (state = [], action) {
  switch (action.type) {
    case FETCHED_ALL_TICKETS:
      return action.payload
      
    case ADD_TICKET:
      return [...state, action.payload]

    default:
      return state
  }
}
