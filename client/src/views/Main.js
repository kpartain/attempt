import React from 'react';
import { Router } from '@reach/router';
import { Link } from '@reach/router';

import NewForm from '../components/NewForm';
import ListOfObjects from '../components/ListOfObjects';
import SingleObject from '../components/SingleObject';
import EditForm from '../components/EditForm';

const Main = () => {
  return (
    <div>
        <h1>MAIN PAGE</h1>
        <nav>
            <p><Link to = "/">[main page] Main Page</Link></p>
            <p><Link to = "/new">[main page] New Something Form</Link></p>
        </nav>
        
      <Router>
        <NewForm path = "/new" />
        <EditForm path= "/:_id/edit" />
        <SingleObject path= "/:_id" />
        <ListOfObjects path = "/"/>
      </Router>
    </div>
  )
}

export default Main;