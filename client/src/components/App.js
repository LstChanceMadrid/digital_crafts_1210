
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import '../styles/index.css';
import Header from './Header'
import LandingPage from './main/LandingPage'
import Main from './Main'
import Footer from './Footer'
import Order from './main/Order'

class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <Main>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/coffee" component={Order} />
          </Switch>
        </Main>
        
        <Footer />
      </div>
    );
  }
}

export default App;
