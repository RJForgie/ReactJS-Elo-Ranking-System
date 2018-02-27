import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import AddGameForm from './AddGameForm';

class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: null,
    };
  }

  componentDidMount() {
    db.onceGetGames().then(snapshot =>
      this.setState(() => ({ games: snapshot.val() }))
    );
  }

  render() {
    const { games } = this.state;

    return (
      <div>
        <h1>Games</h1>
        {/* <AddGameForm /> */}
        { !!games && <GameList games={games} /> }
      </div>
    );
  }
}

const GameList = ({ games }) =>
  <div>
    <h2>List of Games</h2>

    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Result</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {Object.keys(games).map(key =>
        <Table.Row>
        <Table.Cell key={key}>{games[key].date}</Table.Cell>
        <Table.Cell key={key}>{games[key].result}</Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
    </Table>
  
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Games);