import * as React from 'react';

import { Route } from 'react-router';

import { Layout } from './components/Layout';

import { Home } from './components/Home';

import { FetchData } from './components/FetchData';

import { Counter } from './components/Counter';

export default class App extends React.Component<any, any> {
  public displayName = App.name

  public render() {
    return (
      <Layout>
        <Route exact={true} path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
      </Layout>
    );
  }
}
