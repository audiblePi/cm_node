import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { bindActionCreators } from 'redux';
import * as Actions from "../store/actions"


class Layout extends React.Component {
  	componentWillMount(){
    	this.props.fetchContacts();
  	}

  	render() {
    	return (
	      <div>
	        {this.props.children}
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
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);