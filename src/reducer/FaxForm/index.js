import {SEND_FAX_REQUEST, SEND_FAX_SUCCESS, SEND_FAX_FAILURE} from '../../constants/ActionTypes'

const initialState = {
  'sending': false
}

export default function fax(state = initialState, action) {
  switch (action.type) {
    case SEND_FAX_REQUEST:
      return Object.assign({}, {sending: action.sending})
    case SEND_FAX_SUCCESS:
      return Object.assign({}, {sending: action.sending}, action.fax)
    case SEND_FAX_FAILURE:
      return Object.assign({}, {sending: action.sending}, action.fax)
    default:
      return state
  }
}
