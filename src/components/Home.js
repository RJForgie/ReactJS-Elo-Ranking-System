import React, { Component } from 'react';
import { Table, Label } from 'semantic-ui-react'

import withAuthorization from './withAuthorization';
import { db } from '../firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Username</Table.HeaderCell>
        <Table.HeaderCell>Rating</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {Object.keys(users).map(key =>
        <Table.Row>
        <Table.Cell key={key}>{users[key].username}</Table.Cell>
        <Table.Cell key={key}>{users[key].rating}</Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
    </Table>
  


  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);