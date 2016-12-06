import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import * as Actions from "../store/actions"

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import FontIcon from 'material-ui/FontIcon';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const iconStyles = {
  float: "right"
};
const tableStyle = {
  padding:"0 .5rem"
}
const ArrowUpStyle = {
  position:"absolute",
  right:"0",
  top:".5rem"
}
const ArrowDownStyle = {
  position:"absolute",
  right:"0",
  bottom:".5rem"
}

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSortUp(event) {
    this.props.dispatch( Actions.sortUp(this.props.contacts) );
  }
  handleSortDown(event) {
    this.props.dispatch( Actions.sortDown(this.props.contacts) );
  }
  handleDelete(id) {
    this.props.dispatch( Actions.deleteContact(id) );
  }

  render() {
    return (
      <div>
        <AppBar
          title={<span>Contact List</span>}
          showMenuIconButton={false}
          iconElementRight={<FlatButton label="Add" containerElement={<Link to="edit/add"/>}/>}/>
        <div style={tableStyle}>
          <Table style={tableStyle}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>
                  Name
                  <ArrowUp style={ArrowUpStyle} onClick={this.handleSortUp.bind(this)}/>
                  <ArrowDown style={ArrowDownStyle} onClick={this.handleSortDown.bind(this)}/>
                </TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Phone</TableHeaderColumn>
                <TableHeaderColumn>BirthDate</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.contacts.map( (row, index) => (
                <TableRow key={index}>
                  <TableRowColumn><Link to={`edit/${row.id}`}>{row.first_name + ' ' + row.last_name}</Link></TableRowColumn>
                  <TableRowColumn>{row.email}</TableRowColumn>
                  <TableRowColumn>{row.phone}</TableRowColumn>
                  <TableRowColumn>{row.birthdate}</TableRowColumn>
                  <TableRowColumn><ActionDelete style={iconStyles} onClick={this.handleDelete.bind(this, row.id)}/></TableRowColumn>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
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

export default connect(mapStateToProps)(List);
