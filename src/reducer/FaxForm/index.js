import {SEND_FAX_REQUEST, SEND_FAX_SUCCESS, SEND_FAX_FAILURE} from '../../constants/ActionTypes'

const initialState = {
  'sending': false,
  'status': null,
  'direction': null,
  'from': null,
  'date_updated': null,
  'price': null,
  'account_sid': null,
  'to': null,
  'date_created': null,
  'url': null,
  'sid': null,
  'duration': null,
  'num_pages': null,
  'quality': null,
  'price_unit': null,
  'api_version': null,
  'media_url': null
}

export default function fax(state = initialState, action) {
  switch (action.type) {
    case SEND_FAX_REQUEST:
      return Object.assign(state, {'sending': true})
    case SEND_FAX_SUCCESS:
      return Object.assign(state, {'sending': false}, action.fax)
    case SEND_FAX_FAILURE:
      return Object.assign(state, {'sending': false}, action.fax)
    default:
      return state
  }
}
