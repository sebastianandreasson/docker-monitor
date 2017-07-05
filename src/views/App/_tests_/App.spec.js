import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme'
import React from 'react'
import { App } from '../App'

chai.use(chaiEnzyme())

describe('App', () => {
  let component

  beforeEach(() => {
    component = shallow(
      <App>
        <div>test</div>
      </App>
    )
  })

  it('should render', () => {
    expect(component.type()).to.eql('div')
  })

  it('should render a Header', () => {
    expect(component.find('Connect(withRouter(HeaderContainer))')).to.exist
  })

  it('should render children', () => {
    expect(component.children().at(1)).to.have.text('test')
  })
})
