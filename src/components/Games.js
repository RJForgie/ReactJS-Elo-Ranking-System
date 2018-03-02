import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

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
    const { onSetGames } = this.props;

    db.onceGetGames().then(snapshot =>
      onSetGames(snapshot.val())
    );
  }

  render() {
    const { games } = this.props;

    return (
      <div>
        <h1>Games</h1>
        <AddGameForm />
        {console.log(games)}
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
        <Table.HeaderCell>Rando</Table.HeaderCell>
        <Table.HeaderCell>Result</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {Object.keys(games).map(key =>
        <Table.Row key={key}>
        <Table.Cell>{games[key].rando}</Table.Cell>
        <Table.Cell>{games[key].gameresult}</Table.Cell>
        <Table.Cell>{games[key].date}</Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
    </Table>
  
  </div>

const mapStateToProps = (state) => ({
  games: state.gameState.games,
});

const mapDispatchToProps = (dispatch) => ({
  onSetGames: (games) => dispatch({ type: 'GAMES_SET', games }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Games);