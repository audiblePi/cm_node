import * as actions from '../js/store/actions'

const contact = {
	'id':'0',
	'first_name':'Bob',
	'last_name':'James',
	'email':'me@this.com',
	'phone':'123-456-7890',
	'birthdate':'01/01/1111'
}

describe('actions', () => {
  it('should create an action to add a contact', () => {
    const expectedAction = {
      type: actions.ADD_CONTACT,
      newContact: contact
    }
    expect(actions.addContact(contact)).toEqual(expectedAction)
  })
  it('should create an action to edit a contact', () => {
    const id = 0;
    const expectedAction = {
      	type: actions.EDIT_CONTACT,
      	id: id,
		contact: contact
    }
    expect(actions.editContact(id, contact)).toEqual(expectedAction)
  })
  it('should create an action to delete a contact', () => {
    const id = 0;
    const expectedAction = {
      	type: actions.DELETE_CONTACT,
      	id: id
    }
    expect(actions.deleteContact(id, contact)).toEqual(expectedAction)
  })
  it('should create an action once fetch is done', () => {
    const id = 0;
    const status = 200;
    const expectedAction = {
      	type: actions.FETCH_DONE,
		fetching: false,
		data: contact
    }
    expect(actions.fetchDone(status, contact)).toEqual(expectedAction)
  })
  it('should create an action once fetch has failed', () => {
    const id = 0;
    const error = "Internal server error";
    const expectedAction = {
      	type: actions.FETCH_FAILED,
		fetching: false,
    }
    expect(actions.fetchFailed(error)).toEqual(expectedAction)
  })
})