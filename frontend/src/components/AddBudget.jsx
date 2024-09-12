import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import axios from 'axios'


const AddBudget = () => {
  const [budget, setBudget] = useState("");

  const handleChange = (e) => {
    setBudget(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios.post('http://localhost:3000/api/budget/create', { budget }) // Send budget as an object
      .then(res => {
        console.log(res);
        notifyOnSuccess(); // Call success notification
      })
      .catch(err => {
        console.log(err);
        notifyOnFailure(); // Call failure notification
      });
    
  }
  

  const notifyOnSuccess = () => toast.success('Budget successfully added!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce, // Ensure Bounce is defined
});

const notifyOnFailure = () => toast.error('Fail to add budget', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce, // Ensure Bounce is defined
});



  return (
    <>
      <div className="shadow p-3 mb-5 bg-body rounded">
        <h5 className="fw-bold">Add Budget</h5>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
            <FontAwesomeIcon icon={faCalendarAlt} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Budget"
              aria-label="Budget"
              aria-describedby="basic-addon1"
              value={budget}
              onChange={handleChange} // Update budget state on change
            />
          </div>

          <button type="submit" className="btn btn-sm btn-primary w-100 fw-bold">
            Add Budget
          </button>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default AddBudget;
