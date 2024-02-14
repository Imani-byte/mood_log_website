// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './components/Signup';
import Login from './components/Login';
import Support from './components/Support';
import Logout from './components/Logout';
import bipolarquiz from './components/bipolar_quiz';
import PossibleBipolar from './components/possiblebipolar';
import '/home/naisiae/Development/code/Phase_4/trial2/client/src/App.css';
import DepressiveQuiz from './components/depressive_quiz';
import Possibledepression from './components/posibledepression';
import AnxietyQuiz from './components/anxiety_quiz';
import Possibleanxiety from './components/possibleanxiety';
import Inconclusive from './components/inconclusive';

function App() {
  return (
    <Router>
      <div>
        <nav style={navStyle}>
          <ul style={ulStyle}>
            <li><Link style={linkStyle} to="/landing">Home</Link></li>
            <li><Link style={linkStyle} to="/support">Support</Link></li>
            <li><Link style={linkStyle} to="/signup">Signup</Link></li>
            <li><Link style={linkStyle} to="/login">Login</Link></li>
            <li><Link style={linkStyle} to="/logout">Logout</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route path="/landing" component={Landing} />
          <Route path="/support" component={Support} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/bipolar_quiz" component={bipolarquiz} />
          <Route path="/depressive_quiz" component={DepressiveQuiz} />
          <Route path="/possiblebipolar" component={PossibleBipolar} />
          <Route path="/possibledepression" component={Possibledepression} />
          <Route path="/anxiety_quiz" component={AnxietyQuiz} />
          <Route path="/possibleanxiety" component={Possibleanxiety} />
          <Route path="/inconclusive" component={Inconclusive} />
        </Switch>
      </div>
    </Router>
  );
}

const navStyle = {
  backgroundColor: '#333',
  padding: '10px',
};

const ulStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  justifyContent: 'flex-end',
};

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  padding: '10px',
  borderRadius: '5px',
};

export default App;
