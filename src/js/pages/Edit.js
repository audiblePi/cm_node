import React from "react";
import { connect } from "react-redux";
import { Link, browserHistory, hashHistory } from "react-router";
import { bindActionCreators } from 'redux'

import * as Actions from "../store/actions"

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

var _id;

const formStyle = {
	padding: "0 .5rem"
};

const buttonStyle1 = {
	float: "left",
	marginTop: "1rem"
};

const buttonStyle2 = {
	float: "right",
	marginTop: "1rem"
};

class Edit extends React.Component {
	constructor(props) {
	    super(props);
	   
	  	_id = this.props.params.id;

	    this.state = {
	      	title: "Edit",
	      	id: this.props.params.id,
	      	contact_id: "",
	      	contact_first_name: "",
	      	contact_last_name: "",
	      	contact_email: "",
	      	contact_phone: "",
	      	contact_birthdate: null
	    };
	}

	componentWillMount(){
 		if ( _id == "add") {
 			this.setState({ title: "Add"});
 			this.setState({ contact_id: this.props.contacts.length});
 		}
 		this.loadContact();
	}

	loadContact(){
		//could  fetch via api, but using redux
		var contact = this.props.contacts.filter(function(currentValue,index,arr){
			return currentValue.id == _id;
		})[0]; 

		if ( contact != undefined ){
			this.state.contact_id = contact.id;
			this.state.contact_first_name = contact.first_name;
			this.state.contact_last_name = contact.last_name;
			this.state.contact_email = contact.email;
			this.state.contact_phone = contact.phone;
			this.state.contact_birthdate = new Date(contact.birthdate);
		}
	}

	handleChange(data, event) {
	    var newState = {};
	    newState[data] = event.target.value;
	    this.setState(newState);
	}

	handleChangeDate = (event, date) => {
	    this.setState({
	      contact_birthdate: date,
	    });
	};

	formatDate(date){
	  	return  (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
	}

	handleSubmit(event) {
		event.preventDefault();
	    var newContact = {
	   		id: this.state.contact_id,
	   		first_name: this.state.contact_first_name,
	   		last_name: this.state.contact_last_name,
	   		email: this.state.contact_email,
	   		phone: this.state.contact_phone,
	   		birthdate: this.formatDate(this.state.contact_birthdate),
	   	};

	   	//validate

	   	if ( _id == "add") 
 			this.props.dispatch( Actions.addContact(newContact) );
 		else
		    this.props.dispatch( Actions.editContact(_id, newContact) );

	    browserHistory.push('/'); //redirect or succes notify
	}

  	render() { 
	    return (
	      <div>
	      	<AppBar
	          title={<span>{this.state.title}</span>}
	          iconElementLeft={<IconButton containerElement={<Link to="/"/>}><NavigationClose/></IconButton>}/>
	          <form onSubmit={this.handleSubmit.bind(this)} style={formStyle}>
	      		<TextField fullWidth={true} floatingLabelFixed={true} floatingLabelText="First Name" defaultValue={this.state.contact_first_name} onChange={this.handleChange.bind(this, 'contact_first_name')}/>
		    	<TextField fullWidth={true} floatingLabelFixed={true} floatingLabelText="Last Name" defaultValue={this.state.contact_last_name} onChange={this.handleChange.bind(this, 'contact_last_name')}/>
		    	<TextField fullWidth={true} floatingLabelFixed={true} floatingLabelText="Email" defaultValue={this.state.contact_email} onChange={this.handleChange.bind(this, 'contact_email')}/>
		    	<TextField fullWidth={true} floatingLabelFixed={true} floatingLabelText="Phone" defaultValue={this.state.contact_phone} onChange={this.handleChange.bind(this, 'contact_phone')}/>
		    	<DatePicker fullWidth={true} floatingLabelFixed={true} floatingLabelText="Birthdate" formatDate={this.formatDate} value={this.state.contact_birthdate} onChange={this.handleChangeDate.bind(this)}/>
		    	<RaisedButton style={buttonStyle1} label="Cancel" containerElement={<Link to="/"/>}/>
		    	<RaisedButton style={buttonStyle2} primary={true} label="Save" type="submit"/>
		    </form>
	      </div>
   		);
 	}
}

function mapStateToProps(state){
  return {
  	contacts: state.contacts    
  }
}

function mapDispatchToProps(dispatch){

}

export default connect(mapStateToProps)(Edit);
