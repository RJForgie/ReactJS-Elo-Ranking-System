import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react'
import withAuthorization from './withAuthorization';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { db } from '../firebase';

const INITIAL_STATE = {
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
  
    onSubmit = (event) => {
      const {
        rando,
        result,
      } = this.state;
      
      db.doCreateGame(rando, result, today)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
          this.setState(byPropKey('error', error));
      });
    }
  
    render() {
      const {
        rando,
        result,
        error,
      } = this.state;
  
      return (
        <form onSubmit={this.onSubmit}>
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
  });
  
  const authCondition = (authUser) => !!authUser;
  
  export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
  )(AddGameForm);
