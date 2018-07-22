import {FETCHED_DETAILED_TICKET} from '../actions/ticket'
import {ADD_COMMENT} from '../actions/comment'

export default function (state = null, action) {
  switch (action.type) {
    case FETCHED_DETAILED_TICKET:
      return action.payload

    case ADD_COMMENT:
      return {...state, comments: [...state.comments, action.payload]};

    default:
      return state
  }
}