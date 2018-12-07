import * as React from 'react';

import { Link } from 'react-router-dom';

import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

import { IAuthContext, withAuth } from '../auth/AuthContext';

import './NavMenu.css';

import { compose } from 'recompose';

class NavMenu extends React.Component<IAuthContext, any> {

  private username: React.RefObject<HTMLInputElement>;

  constructor(props: IAuthContext) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.username = React.createRef();
  }

  public render() {
    const authContext = this.props.authContext;

    return (
      <Navbar inverse={true} fixedTop={true} fluid={true} collapseOnSelect={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>ReactCore</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>

          {authContext.isSignedIn 
            ? <p>You are logged in.</p> 
           
            : <form className="form-inline" onSubmit={this.handleSubmit}>
                <input className="form-control" type="text" ref={this.username} placeholder="Username" />
                <button className="btn btn-sm" type="submit">Sign in</button>
              </form>
          }

          <Nav>
            <LinkContainer to={'/'} exact={true}>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/counter'}>
              <NavItem>
                <Glyphicon glyph='education' /> Counter
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/fetchdata'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Fetch data
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState({ errors: null, initialLoad: false });

    const username = this.username.current;

    if (username !== null) {
      this.props.authContext.login(username.value).then(response => {
        // if (!response.is_error) {
        //   this.props.history.push(RoutePaths.Root);
        // } else {
        //   if (response.error_content !== undefined) {
        //     this.setState({ error: response.error_content.error_description });
        //     // should display error as snackbar instead
        //   }
        // }
      });
    }
  }
};

export default compose(
  withAuth
)(NavMenu);