import * as FaxActions from '../../constants/ActionTypes'

const initialState = {
  'sending': false
}

export default function fax(state = initialState, action) {
  const sending = action.sending
  switch (action.type) {
    case FaxActions.SEND_FAX_REQUEST:
      return Object.assign({}, state, {sending})
    case FaxActions.SEND_FAX_SUCCESS:
      return Object.assign({}, state, action.fax)
    case FaxActions.SEND_FAX_FAILURE:
      return Object.assign({}, state, {sending}, action.fax)
    case FaxActions.UPDATE_FAX_STATUS: {
      const {FaxStatus: status, ...rest} = action.status
      return Object.assign({}, state, {sending}, {status}, rest)
    }
    default:
      return state
  }
}
