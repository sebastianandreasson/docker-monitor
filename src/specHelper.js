const chai = require('chai')
const sinonChai = require('sinon-chai')
const chaiEnzyme = require('chai-enzyme')
const moment = require('moment')

global.expect = chai.expect
global.sinon = require('sinon')
global.sinonPromise = require('sinon-promise')
global.shallow = require('enzyme').shallow

moment.locale('sv')

chai.use(chaiEnzyme)
chai.use(sinonChai)
