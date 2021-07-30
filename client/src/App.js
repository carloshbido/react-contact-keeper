import { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import './App.css';

import ContactState from './context/contact/ContactState';
import AuthState from './context/contact/AuthState';

function App() {
  return (
    <AuthState>
    <ContactState>
      <Router>
        <Fragment> 
          <Navbar /> 
          <div class="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactState>
    </AuthState>
  );
}

export default App;
