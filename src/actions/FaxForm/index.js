import config from 'config'
import SyncClient from 'twilio-sync'
import {SEND_FAX_REQUEST, SEND_FAX_SUCCESS, SEND_FAX_FAILURE, UPDATE_FAX_STATUS, WEB_SOCKET_CREATED_SUCCESS} from '../../constants/ActionTypes'

export const sendFaxRequest = () => {
  return {
    type: SEND_FAX_REQUEST,
    sending: true
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
    sending: false,
    fax
  }
}

export const updateFaxStatus = (status) => {
  return {
    type: UPDATE_FAX_STATUS,
    sending: false,
    status
  }
}

export const sendFax = (recipient, resource) => {
  let responseState = null
  return dispatch => {
    dispatch(sendFaxRequest())
    fetch(`https://finicky-lettuce-4404.twil.io/send-fax?to=${encodeURIComponent('+' + recipient)}&from=${encodeURIComponent(config.twilioNumber)}&mediaUrl=${resource}`, {
      method: 'POST',
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
export const webSocketCreatedSuccess = () => {
  return {
    type: WEB_SOCKET_CREATED_SUCCESS,
  }
}

export const syncFax = () => {
  return dispatch => {
    fetch('https://finicky-lettuce-4404.twil.io/sync-token')
      .then((response) => {
        return response.text()
      }).then((data) => {
        dispatch(webSocketCreatedSuccess())
        const json = JSON.parse(data)
        const twilioSync = new SyncClient(json.token)
        twilioSync.document('fax_status').then((doc) => {
          doc.set({
            status: null
          })

          doc.on('updated', (data) => {
            dispatch(updateFaxStatus(data))
          })
        })
      }).catch((err) => {
        console.error(err) // eslint-disable-line
      })
  }
}
