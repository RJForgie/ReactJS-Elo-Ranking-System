import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react'
import withAuthorization from './withAuthorization';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { db } from '../firebase';

const INITIAL_STATE = {
    date: '',
    result: '',
    error: null,
  };

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

class AddGameForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }
  
    onSubmit = (event) => {
      const {
        date,
        result,
      } = this.state;
  
          
            db.doCreateGame(date, result)
            .then(() => {
              this.setState(() => ({ ...INITIAL_STATE }));
            })
            .catch(error => {
              this.setState(byPropKey('error', error));
            });

  
  
    }
  
    render() {
      const {
        date,
        result,
        error,
      } = this.state;
  
      return (
        <form onSubmit={this.onSubmit}>
          <Input
            value={date}
            onChange={event => this.setState(byPropKey('date', event.target.value))}
            type="text"
            placeholder="Date"
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
