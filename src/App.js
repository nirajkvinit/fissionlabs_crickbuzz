import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Page404 from './components/layout/Page404';
import Home from './components/home/Home';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <span>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route component={Page404} />
            </Switch>
          </span>
        </Router>
      </Provider>
    );
  }
}

export default App;
