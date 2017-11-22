import test from 'tape'
import * as actions from './index'
import * as types from '../../constants/ActionTypes'

test('Send Fax Actions', (assert) => {
  const requestAction = {
    type: types.SEND_FAX_REQUEST,
    sending: true
  }

  const fax = {
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

  const successAction = {
    type: types.SEND_FAX_SUCCESS,
    fax
  }

  const failureAction = {
    type: types.SEND_FAX_FAILURE,
    sending: false,
    fax
  }

  assert.deepEqual(actions.sendFaxRequest(), requestAction, 'should generate the correct SEND_FAX_REQUEST object')
  assert.deepEqual(actions.sendFaxSuccess(fax), successAction, 'should generate the correct SEND_FAX_SUCCESS object')
  assert.deepEqual(actions.sendFaxFailure(fax), failureAction, 'should generate the correct SEND_FAX_FAILURE object')
  assert.end()
})
