import {FETCHED_ALL_EVENTS} from '../actions/event'

export default function (state = [], action) {
  switch (action.type) {
    case FETCHED_ALL_EVENTS:
      return action.payload

    default:
      return state
  }
}

