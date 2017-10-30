import React from 'react'
import App from './App.js'
import test from 'tape'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

const wrapper = shallow(<App />)

test('<App /> renders', (assert) => {
    assert.plan(2)

    assert.ok(wrapper)
    assert.equal(wrapper.type(), 'div')

    assert.end()
})
