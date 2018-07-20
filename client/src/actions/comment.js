import * as request from 'superagent'

const baseUrl = 'http://localhost:4000'

export const ADD_COMMENT = 'ADD_COMMENT'

export const createComment = (comment, ticketId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
      .post(`${baseUrl}/comments/${ticketId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send(comment)
      .then(response => dispatch({
        type: ADD_COMMENT,
        payload: response.body
      }))
  }