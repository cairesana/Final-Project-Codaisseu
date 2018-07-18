import * as request from 'superagent'

const baseUrl = 'http://localhost:4000'

export const ADD_COMMENT = 'ADD_COMMENT'

export const createComment = (comment, ticketId) => (dispatch) => {
    request
      .post(`${baseUrl}/comments/${ticketId}`)
      .send(comment)
      .then(response => dispatch({
        type: ADD_COMMENT,
        payload: response.body
      }))
  }