import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import AddGameForm from './AddGameForm';
import { onceGetUser } from '../firebase/db';

class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: null,
      users: null
    };
  }

  componentDidMount() {
    const { onSetGames } = this.props;

    db.onceGetGames().then(snapshot =>
      onSetGames(snapshot.val())
    );

    const { onSetUsers } = this.props;
  
    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );
  }

  render() {
    const { games } = this.props;
    const { users } = this.props;

    return (
      <div>
        <h1>Games</h1>
        <AddGameForm />
        {/* {console.log(users.ceSt9mwrNJTy6hkvYYg4FoX8rck2)} */}
        { !!games && <GameList games={games} /> }
      </div>
    );
  }
}

const GameList = ({ games, users }) =>


  <div>
    <h2>List of Games</h2>

    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Winner</Table.HeaderCell>
        <Table.HeaderCell>Loser</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {Object.keys(games).map(key =>
      //var user = findUserByKey(games[key].winnerID)
        <Table.Row key={key}>
        <Table.Cell>{games[key].winnerID}</Table.Cell>
        <Table.Cell>{games[key].loserID}</Table.Cell>
        <Table.Cell>{games[key].date}</Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
    </Table>
    {findUserByKey("ceSt9mwrNJTy6hkvYYg4FoX8rck2")}
    
  
  </div>

function findUserByKey (key){
  db.onceGetUser(key).then(snapshot =>
  getUsername(snapshot.val()))
};

function getUsername(user){
  console.log(user)
}

const mapStateToProps = (state) => ({
  games: state.gameState.games,
  users: state.userState.users
});

const mapDispatchToProps = (dispatch) => ({
  onSetGames: (games) => dispatch({ type: 'GAMES_SET', games }),
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(Games);