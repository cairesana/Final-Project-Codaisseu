import {FETCHED_DETAILED_TICKET} from '../actions/ticket'

export default function (state = null, action) {
  switch (action.type) {
    case FETCHED_DETAILED_TICKET:
      return action.payload

    default:
      return state
  }
}