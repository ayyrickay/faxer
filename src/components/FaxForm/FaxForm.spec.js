import React from 'react'
import { FaxForm } from './FaxForm.js'
import test from 'tape'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

const wrapper = shallow(<FaxForm faxForm={{}} sendFax={() => {}} />)

test('<FaxForm /> renders', (assert) => {
  assert.ok(wrapper, 'shallow renders successfully')

  assert.end()
})

test('<FaxForm /> initiates with proper internal state', (assert) => {
  assert.deepEqual(wrapper.state().recipient, {value: '', isValid: null}, 'has an empty validation object')
  assert.deepEqual(wrapper.state().resource, {value: '', isValid: null}, 'has an empty validation object')
  assert.end()
})

test('<FaxForm /> contains two inputs', (assert) => {
  assert.equal(wrapper.find('input').length, 2, 'it contains two inputs')

  assert.end()
})

test('<FaxForm /> contains a submit span', (assert) => {
  assert.equal(wrapper.find('span').length, 1, 'it contains one span')

  assert.end()
})
