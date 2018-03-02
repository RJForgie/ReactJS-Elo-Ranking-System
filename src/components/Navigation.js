import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () =>
  <Menu>
    <Menu.Item as={Link} to={routes.LANDING}>Landing</Menu.Item>
    <Menu.Item as={Link} to={routes.HOME}>Home</Menu.Item>
    <Menu.Item as={Link} to={routes.ACCOUNT}>Account</Menu.Item>
    <Menu.Item as={Link} to={routes.GAMES}>Games</Menu.Item>
    <Menu.Item><SignOutButton /></Menu.Item>
  </Menu>

const NavigationNonAuth = () =>
  <Menu>
    <Menu.Item as={Link} to={routes.LANDING}>Landing</Menu.Item>
    <Menu.Item as={Link} to={routes.SIGN_IN}>Sign In</Menu.Item>
  </Menu>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);