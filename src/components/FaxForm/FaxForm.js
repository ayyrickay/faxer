import React, {Component} from 'react'
import { connect } from 'react-redux'
import {sendFax} from '../../actions/FaxForm'
import PropTypes from 'prop-types'

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

  typeHandler (event) {
    if (event.which === 13) {
      this.submitForm()
    }
  }

  submitForm () {
    console.log('submitting form')
    this.validateForm()
    console.log(this.state.resource.isValid, this.state.recipient.isValid)
    if (this.state.resource.isValid && this.state.recipient.isValid) {
      this.props.sendFax(this.recipient.value, this.resource.value)
    }
  }

  validateForm () {
    console.log('before', this.state)
    this.setState({
      resource: {
        isValid: this.resource.checkValidity()
      },
      recipient: {
        isValid: this.recipient.checkValidity()
      }
    })
    console.log('after', this.state)
  }

  render () {
    return (
      <div>
        <input
          type='tel'
          ref={(recipient) => {this.recipient = recipient}}
          placeholder='4151234567'
          onKeyUp={this.typeHandler.bind(this)}
          required
        />
        <input
          type='url'
          ref={(resource) => {this.resource = resource}}
          placeholder='a valid pdf url (e.g., hello.com/doc.pdf)'
          onKeyUp={this.typeHandler.bind(this)}
          required
        />
        <span onClick={this.submitForm.bind(this)}> Send Fax </span>
      </div>
    )
  }
}

FaxForm.propTypes = {
  sendFax: PropTypes.func.isRequired,
  faxForm: PropTypes.object
}

const mapStateToProps = ({faxForm}) => ({faxForm})

const mapDispatchToProps = (dispatch) => ({
  sendFax: (recipient, resource) => {
    dispatch(sendFax(recipient, resource))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FaxForm)
