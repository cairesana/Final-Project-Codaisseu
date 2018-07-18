import * as request from 'superagent'

const baseUrl = 'http://localhost:4000'

export const FETCHED_DETAILED_TICKET = 'FETCHED_DETAILED_TICKET'
// export const FETCHED_ALL_TICKETS = 'FETCHED_ALL_TICKETS'
export const ADD_TICKET = 'ADD_TICKET'

export const fetchTicket = (ticketId) => (dispatch) => {
  request
    .get(`${baseUrl}/tickets/${ticketId}`)
    .then(response => dispatch({
      type: FETCHED_DETAILED_TICKET,
      payload: response.body
    }))
    .catch(err => alert(err))
}

// export const fetchAllTickets = () => (dispatch) => {
//   request
//     .get(`${baseUrl}/tickets/`)
//     .then(response => dispatch({
//       type: FETCHED_ALL_TICKETS,
//       payload: response.body.tickets
//     }))
//     .catch(err => alert(err))
// }

export const createTicket = (ticket, eventId) => (dispatch) => {
  request
    .post(`${baseUrl}/tickets/${eventId}`)
    .send(ticket)
    .then(response => dispatch({
      type: ADD_TICKET,
      payload: response.body
    }))
}
