import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react'
import withAuthorization from './withAuthorization';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { db } from '../firebase';

const INITIAL_STATE = {
    winner: null,
    loser: null,
    rando: '',
    result: '',
    error: null,
  };

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

  var today = new Date();
  var dd = ("0" + (today.getDate())).slice(-2);
  var mm = ("0" + (today.getMonth() +　1)).slice(-2);
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd ;

class AddGameForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
      const { onSetUsers } = this.props;
  
      db.onceGetUsers().then(snapshot =>
        onSetUsers(snapshot.val())
      );
    }
  
    onSubmit = (event) => {
      const {
        winner,
        loser,
        rando,
        result,
      } = this.state;
      
      db.doCreateGame(winner, loser, rando, result, today)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
          this.setState(byPropKey('error', error));
      });
    }
  
    render() {
      const {
        winner,
        loser,
        rando,
        result,
        error,
      } = this.state;

      const {users} = this.props;
  
      return (

        <form onSubmit={this.onSubmit}>
          <select
          onChange={event => this.setState(byPropKey('winner', event.target.value))}
          >
          {Object.keys(users).map(key =>
            <option key={key} value={winner}>{users[key].username}</option>
          )}
          </select>

          <select
          onChange={event => this.setState(byPropKey('loser', event.target.value))}
          >
          {Object.keys(users).map(key =>
            <option key={key} value={loser}>{users[key].username}</option>
          )}
          </select>
         
          <Input
            value={rando}
            onChange={event => this.setState(byPropKey('rando', event.target.value))}
            type="text"
            placeholder="Rando"
          />
          <Input
            value={result}
            onChange={event => this.setState(byPropKey('result', event.target.value))}
            type="text"
            placeholder="Result"
          />
          <Button type="submit">
            Save
          </Button>
  
          { error && <p>{error.message}</p> }
  
        </form>
      );
    }
  }

 

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    users: state.userState.users,
  });

  const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
  });
  
  const authCondition = (authUser) => !!authUser;
  
  export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
  )(AddGameForm);
