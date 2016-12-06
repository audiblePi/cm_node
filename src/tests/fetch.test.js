import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../js/store/actions'
import nock from 'nock'
import expect from 'expect' // You can use any testing library

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const contacts = [
  {
    'id':'0',
    'first_name':'Bob',
    'last_name':'James',
    'email':'me@this.com',
    'phone':'123-456-7890',
    'birthdate':'01/01/1111'
  },
  {
    'id':'1',
    'first_name':'Bob',
    'last_name':'Jones',
    'email':'me@this.com',
    'phone':'123-456-7890',
    'birthdate':'01/01/1111'
  }
]

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_DONE when fetching contacts has been done', () => {
    nock('http://localhost:3000')
      .get('/contacts')
      .reply(200, { body: contacts })

    const expectedActions = [
      { type: actions.FETCH_DONE, body: contacts }
    ]
    const store = mockStore(contacts)

    return store.dispatch(actions.fetchContacts()).then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
  it('creates FETCH_FAILED when fetching has failed', () => {
    nock('http://localhost:3000')
      .get('/contacts')
      .reply(400, "Network Error");

    const expectedActions = [
      { type: actions.FETCH_FAILED, fetching: false }
    ]
    const store = mockStore(contacts)

    return store.dispatch(actions.fetchContacts()).then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})