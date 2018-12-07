import * as React from 'react';

import { Redirect, Route, RouteComponentProps, withRouter } from 'react-router-dom';

import { Layout } from './components/Layout';

import { Home } from './components/Home';

import { FetchData } from './components/FetchData';

import { Counter } from './components/Counter';

import { IAuthContext, withAuth } from './auth/AuthContext';

import { compose } from 'recompose';


class App extends React.Component<RouteComponentProps & IAuthContext, any> {
  public render() {
    return (
      <Layout>
        <Route exact={true} path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' render={this.fetchdataRender} />
      </Layout>
    );
  }

  private fetchdataRender = (props: RouteComponentProps) => this.props.authContext.isSignedIn ? <FetchData {...props} /> : <Redirect to={'/'} />;
};

export default compose(
  withAuth,
  withRouter,
)(App);
