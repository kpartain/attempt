import React from 'react';
import { Router } from '@reach/router';
import { Link } from '@reach/router';

import NewForm from '../components/NewForm';
import ListOfObjects from '../components/ListOfObjects';
import SingleObject from '../components/SingleObject';

const Main = () => {
  return (
    <div>
        <h1>MAIN PAGE</h1>
        <nav className="d-flex">
            <p><Link to = "/pirates">Home</Link> | </p>
            <p><Link to = "/pirate/new">New Pirate</Link></p>
        </nav>
        
      <Router>
        <NewForm path="/pirate/new" />
        <SingleObject path="/pirate/:id" />
        <ListOfObjects path="/pirates"/>
      </Router>
    </div>
  )
}

export default Main;