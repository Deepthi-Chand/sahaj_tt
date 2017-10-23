import React, { PropTypes } from 'react';

import { Link } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';
import UserDropdownMenu from '../UserDropdownMenu/UserDropdownMenu';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { loginRequest, logoutRequest } from '../../reducers/auth/auth-actions';
import { links } from '../../shared/links';


// debug.enable('app:*');

// const log = debug('app:main-header');

class MainHeader extends React.Component {
  static propTypes : {
    dispatch: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    // bind <this> to the event method
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  // @autobind
  onLogin() {
    this.props.dispatch(loginRequest());
  }

  // @autobind
  onLogout() {
    this.props.dispatch(logoutRequest());
  }

  willReceiveProps(props) {
    
  }

  render() {
    return (
      <Navbar staticTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
            SahaJ TT tourno
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>

            {this.props.isAuthenticated && this.props.user ?
              <UserDropdownMenu user={this.props.user} logout={this.onLogout} />
              :
              <li role="presentation">
                <a onClick={this.onLogin}> login </a>
              </li>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user,
  language: state.language,
});

export default connect(mapStateToProps)(MainHeader);
