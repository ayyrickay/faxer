import React, {Component} from 'react'
import { connect } from 'react-redux'
import {sendFax, syncFax} from '../../actions/FaxForm'
import PropTypes from 'prop-types'
import styles from './FaxForm.css'
import {FaxStates} from './FaxStates'

export class FaxForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recipient: {
        value: '',
        isValid: null
      },
      resource:  {
        value: '',
        isValid: null
      }
    }
  }

  componentDidMount () {
    this.props.syncFax()
  }

  typeHandler (event) {
    if (event.which === 13) {
      this.submitForm(this.validateForm())
    }
  }

  submitForm () {
    if (this.state.resource.isValid && this.state.recipient.isValid) {
      this.props.sendFax(this.recipient.value.replace(/\D/g, ''), this.resource.value)
    }
  }

  validateForm () {
    this.setState({
      resource: {
        isValid: this.resource.checkValidity()
      },
      recipient: {
        isValid: this.recipient.checkValidity()
      }
    })
  }

  render () {
    const faxForm = this.props.faxForm

    return (
      <div className={styles.mainForm}>
        {faxForm.status && (
          <div className={styles[FaxStates[faxForm.status].style]}>
            <p>{FaxStates[faxForm.status].displayText}</p>
            {faxForm.ErrorMessage && (
              <p> {`${faxForm.ErrorMessage} (Code: ${faxForm.ErrorCode})`}</p>
            )}
            {this.props.faxForm.sending && (
              <p className={styles.progressText}>{`Sending fax to ${this.props.faxForm.to}`}</p>
            )}
          </div>
        )}
        {this.props.faxForm.message && (
          <p className={styles.failText}>{this.props.faxForm.message}</p>
        )}
        <input
          type='tel'
          ref={(recipient) => {this.recipient = recipient}}
          placeholder='e.g., (415) 660-8810'
          onKeyUp={this.typeHandler.bind(this)}
          required
        />
        <input
          type='url'
          ref={(resource) => {this.resource = resource}}
          placeholder='a valid pdf url (e.g., "hello.com/doc.pdf")'
          onKeyUp={this.typeHandler.bind(this)}
          required
        />
        <span className={styles.button} onClick={this.submitForm.bind(this)}>
          {this.props.faxForm.sending ? 'Sending...' : 'Send Fax'}
        </span>
      </div>
    )
  }
}

FaxForm.propTypes = {
  sendFax: PropTypes.func.isRequired,
  faxForm: PropTypes.object,
  syncFax: PropTypes.func
}

const mapStateToProps = ({faxForm}) => ({faxForm})

const mapDispatchToProps = (dispatch) => ({
  sendFax: (recipient, resource) => {
    dispatch(sendFax(recipient, resource))
  },
  syncFax: () => dispatch(syncFax())
})

export default connect(mapStateToProps, mapDispatchToProps)(FaxForm)
