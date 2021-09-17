import React from 'react';
import axios from 'axios';

const DeleteButton = props => {
  const { somethingID, deletionResponse } = props;

  const deleteSomething =(e) => {
    axios.delete("http://localhost:8000/api/somethings/" + somethingID)
      .then(res => deletionResponse(somethingID));
  }

  return (
    <button onClick={deleteSomething} className="btn btn-danger w-25">Delete</button>
  )
}

export default DeleteButton;
