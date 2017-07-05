import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme'
import React from 'react'
import { NotFound } from '../NotFound'

chai.use(chaiEnzyme())

describe('NotFound', () => {
  let component

  beforeEach(() => {
    component = shallow(
      <NotFound />
    )
  })

  it('should render', () => {
    expect(component.type()).to.eql('div')
  })
})
