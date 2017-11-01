import config from 'config'
import {SEND_FAX_REQUEST, SEND_FAX_SUCCESS, SEND_FAX_FAILURE} from '../../constants/ActionTypes'

export const sendFaxRequest = () => {
  return {
    type: SEND_FAX_REQUEST,
    sending: true
  }
}

export const sendFaxSuccess = (fax) => {
  return {
    type: SEND_FAX_SUCCESS,
    sending: false,
    fax
  }
}

export const sendFaxFailure = (fax) => {
  return {
    type: SEND_FAX_FAILURE,
    sending: false,
    fax
  }
}

export const sendFax = (recipient, resource) => {
  let responseState = null
  return dispatch => {
    dispatch(sendFaxRequest())
    fetch('https://fax.twilio.com/v1/Faxes', {
      body: `To=${encodeURIComponent('+' + recipient)}&From=${encodeURIComponent(config.twilioNumber)}&MediaUrl=${resource}`,
      headers: {
        'Authorization': `Basic ${window.btoa(`${config.twilioSid}:${config.twilioAuth}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    })
      .then((response) => {
        responseState = response.ok
        return response.json()
      })
      .then((json) => {
        if (responseState) {
          dispatch(sendFaxSuccess(json))
        } else {
          dispatch(sendFaxFailure(json))
        }
      })
      .catch((err) => {
        dispatch(sendFaxFailure(err))
      })
  }
}
