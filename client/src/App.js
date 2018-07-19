import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import TicketDetails from './components/TicketDetails';
import LoginPage from './components/LoginPage'
// import SignUpPage from './components/SignUpPage'



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <Router>
            <div>
              <Route exact path="/events" component={EventList} />
              <Route exact path="/events/:id" component={EventDetails} />
              <Route exact path="/" render={ () => <Redirect to="/events" /> } />
              <Route exact path="/ticket/:id" component={TicketDetails} />
              <Route exact path="/login" component={LoginPage} />
              {/* <Route exact path="/signup" component={SignUpPage} /> */}
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
