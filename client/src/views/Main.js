import React from 'react';
import { Router } from '@reach/router';
import { Link } from '@reach/router';

import NewForm from '../components/NewForm';
import ListOfObjects from '../components/ListOfObjects';
import SingleObject from '../components/SingleObject';

const Main = () => {
  return (
    <div className="container mt-4">
        
      <Router>
        <NewForm path="/pirate/new" />
        <SingleObject path="/pirate/:id" />
        <ListOfObjects path="/pirates"/>
      </Router>
    </div>
  )
}

export default Main;