import config from 'config'
import {SEND_FAX_REQUEST, SEND_FAX_SUCCESS, SEND_FAX_FAILURE} from '../../constants/ActionTypes'

export const sendFaxRequest = () => {
  return {
    type: SEND_FAX_REQUEST
  }
}

export const sendFaxSuccess = (fax) => {
  return {
    type: SEND_FAX_SUCCESS,
    fax
  }
}

export const sendFaxFailure = (fax) => {
  return {
    type: SEND_FAX_FAILURE,
    fax
  }
}

export const sendFax = (recipient, resource) => {
  // const client = require('twilio')(config.twilioSid, config.twilioAuth)
  // const faxDetails = {
  //   to: recipient,
  //   from: config.TwilioNumber,
  //   [config.twilio]
  //   mediaUrl: resource
  // }
  console.log('Sending Fax')
  return dispatch => {
    dispatch(sendFaxRequest)
    fetch('https://fax.twilio.com/v1/Faxes', {
      body: `To=${encodeURIComponent('+' + recipient)}&From=${encodeURIComponent(config.twilioNumber)}&MediaUrl=${resource}`,
      headers: {
        'Authorization': `Basic ${window.btoa(`${config.twilioSid}:${config.twilioAuth}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          dispatch(sendFaxFailure(response.json()))
        }
      })
      .then(json => {
        dispatch(sendFaxSuccess(json))
      })
      .catch((err) => {
        dispatch(sendFaxFailure(err))
      })
    // return client.fax.v1.faxes.create(faxDetails)
    //   .then((response) => response.json())
    //   .then(json => {
    //     dispatch(sendFaxSuccess(json))
    //   })
    //   .catch((err) => {
    //     dispatch(sendFaxFailure(err))
    //   })
  }
}
