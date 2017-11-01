import test from 'tape'
import reducer from './index.js'
import * as types from '../../constants/ActionTypes'

const initialState = {
  'sending': false
}

const sendingState = {
  'sending': true
}

const sentFax = {
  'sending': false,
  'status': 'queued',
  'direction': 'outbound',
  'from': '+15017250604',
  'date_updated': '2017-04-06T06:39:15Z',
  'price': null,
  'account_sid': 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  'to': '+15558675309',
  'date_created': '2017-04-06T06:39:15Z',
  'url': 'https://fax.twilio.com/v1/Faxes/FX4ac3612393b5a66f11c73a148f956a5c',
  'sid': 'FX4ac3612393b5a66f11c73a148f956a5c',
  'duration': null,
  'num_pages': null,
  'quality': 'fine',
  'price_unit': null,
  'api_version': 'v1',
  'media_url': null
}

const faxFailure = {
  sending: false,
  code: 21203,
  message: 'Dialing to this country is not permitted by your account\'s international permissions',
  more_info: 'https://www.twilio.com/docs/errors/21203',
  status: 403
}

test('Fax Form reducer', (assert) => {
  assert.deepEqual(reducer(undefined, {}), initialState, 'undefined cases returns the initial state')
  assert.deepEqual(reducer(undefined, {type: types.SEND_FAX_REQUEST, sending: true}), sendingState, 'request state triggers sending flag')
  assert.deepEqual(reducer(initialState, {type: types.SEND_FAX_SUCCESS, fax: sentFax}), sentFax, 'sending a fax updates initial state')
  assert.deepEqual(reducer(initialState, {type: types.SEND_FAX_FAILURE, sending: false, fax: faxFailure}), faxFailure, 'sending a fax updates initial state')

  assert.end()
})
