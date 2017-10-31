import test from 'tape'
import reducer from './index.js'
import * as types from '../../constants/ActionTypes'

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

const sendingState = {
  'sending': true,
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

test('Fax Form reducer', (assert) => {
  assert.deepEqual(reducer(undefined, {}), initialState, 'undefined cases returns the initial state')
  assert.deepEqual(reducer(undefined, {type: types.SEND_FAX_REQUEST}), sendingState, 'request state triggers sending flag')
  assert.deepEqual(reducer(initialState, {type: types.SEND_FAX_SUCCESS, fax: sentFax}), sentFax, 'sending a fax updates initial state')

  assert.end()
})
