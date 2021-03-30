import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

import Container from 'react-bootstrap/Container';
import Header from '../Header';
import Footer from '../Footer';
import TimeTrack from '../TimeTrack';
import About from '../About';
import Charts from '../Charts';
import Works from '../Works';
import NotFound from '../NotFound';
import InsertWork from '../InsertWork';
import ChangeWork from '../ChangeWork';

function App() {
  return (
    <Router>
      <Header />
      {/*<Container>*/}


        <main>

          <Switch>

            <Route exact path='/work/insert'>
              <InsertWork />
            </Route>
            <Route exact path='/work/change/:id'>
              <ChangeWork />
            </Route>
            <Route path='/works'>
              <Works />
            </Route>

            <Route path='/charts'>
              <Charts />
            </Route>
            <Route path='/about'>
              <About />
            </Route>
            <Route exact path='/'>
              <TimeTrack />
            </Route>
            <Route path='*'>
              <NotFound/>
            </Route>

          </Switch>

        </main>


      {/*</Container>*/}
      <Footer />
    </Router>
  );
}

export default App;
