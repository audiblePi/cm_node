import * as Actions from "./actions";
import { List, fromJS } from 'immutable';

const initialState = {
	fetching:false,
	fetched:false,
	contacts: [],
	contact: [],
	mode: ""
}

//persist current state.contacts
//should move this and have reducers resync
function _saveContacts(c){
	Actions.saveContacts(c);
}

export default function reducer ( state=initialState, action){
	switch ( action.type ){
 		case Actions.FETCH_DONE : 
 			return Object.assign( {}, state, { contacts : action.data } );
 			break;
 		case Actions.FETCH_FAILED : 
 			return state;
 			break;
 		case Actions.ADD_CONTACT :
 			var newState = Object.assign( {}, state);
 			newState.contacts.push(action.newContact);
 			_saveContacts(newState.contacts);//why is this here?
 			return newState;
 			break;
 		case Actions.EDIT_CONTACT : 
 			var index = state.contacts.findIndex ( function(e){
 				return e.id == action.id;
 			});
 			var newState = Object.assign( {}, state);
 			newState.contacts[index] = action.contact
 			_saveContacts(newState.contacts);
 			return newState;
 			break;
 		case Actions.DELETE_CONTACT : 
 			var newList = state.contacts.filter(function(currentValue,index,arr){
 			 	return currentValue.id != action.id;
 			});
 			var newState = Object.assign( {}, state, { contacts : newList } );
 			_saveContacts(newState.contacts);
 			return newState;
 			break;
 		default:
 			return state;
	}
}
