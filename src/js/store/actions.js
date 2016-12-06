import axios from 'axios';

export const FETCH_DONE = "FETCH_DONE";
export const FETCH_FAILED = "FETCH_FAILED";
export const ADD_CONTACT = "ADD_CONTACT";
export const EDIT_CONTACT = "EDIT_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const SAVE_CONTACTS = "SAVE_CONTACTS";

export function fetchContactDone(status, data){
	return {
		type: FETCH_DONE,
		fetching: false,
		data: data
	}
}
export function fetchFailed(error){
	return {
		type: FETCH_FAILED,
		fetching: false
	}
}
export function fetchContacts(){
	return function (dispatch) {		
		var endpoint = "http://localhost:3000/contacts";
		//var endpoint = "/js/data/contacts.js";

		return axios.get(endpoint)
			.then( function (response){
				dispatch( fetchContactDone(response.status, response.data) );
			})
			.catch( function (error){
				console.log(error.message);
				console.log(error.code);
				dispatch( fetchFailed(error) );
			});
	}
}
export function addContact(newContact){
	return {
		type: ADD_CONTACT,
		newContact: newContact
	}
}
export function editContact(id, contact){
	return {
		type: EDIT_CONTACT,
		id: id,
		contact: contact
	}
}
export function deleteContact(id){
	return {
		type: DELETE_CONTACT,
		id: id
	}
}
export function saveContacts(contacts){
	axios.post("http://localhost:3000/contacts", contacts)
		.then( function (response){
			console.log(response);
		})
		.catch( function (error){
			console.log(error.message);
			console.log(error.code);
		});
}
export function sortUp(contacts){
	return function (dispatch) {	
		return axios.get("http://localhost:3000/contacts?sort=ASC")
			.then( function (response){
				console.log(response);
				dispatch( fetchContactDone(response.status, response.data) );
			})
			.catch( function (error){
				console.log(error.message);
				console.log(error.code);
				dispatch( fetchFailed(error) );
			});
	}
}
export function sortDown(contacts){
	return function (dispatch) {	
		return axios.get("http://localhost:3000/contacts?sort=DSC")
			.then( function (response){
				console.log(response);
				dispatch( fetchContactDone(response.status, response.data) );
			})
			.catch( function (error){
				console.log(error.message);
				console.log(error.code);
				dispatch( fetchFailed(error) );
			});
	}
}