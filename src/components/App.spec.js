import React from 'react'
import App from './App.js'
import test from 'tape'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

const wrapper = shallow(<App />)

test('<App /> renders', (assert) => {
  assert.ok(wrapper, 'it renders an App component')
  assert.equal(wrapper.type(), 'div', 'it is a div')

  assert.end()
})

test('<App /> contains a FaxForm component', (assert) => {
  assert.equal(wrapper.find('FaxForm').length, 1, 'it contains a FaxForm')

  assert.end()
})
