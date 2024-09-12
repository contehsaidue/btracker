import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faCircleUp} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import axios from 'axios';

const AddExpense = () => {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(""); // New state variable for amount


  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    if (name === "title") {
      setTitle(value);
    } else if (name === "amount") {
      setAmount(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const expense = { title, amount }; // Create expense object with title and amount
    axios.post('http://localhost:3000/api/expense/create', expense) // Send budget as an object
      .then(res => {
        console.log(res);
        notifyOnSuccess(); // Call success notification

        setTitle(''); // Clear all input state upon submission
        setAmount('');

        //     // Fetch data again after successful submission
        // const response = axios.get('http://localhost:3000/api/expense/all');
        // setExpenses(response.data.expense); 
    
      })
      .catch(err => {
        console.log(err);
        notifyOnFailure(); // Call failure notification
      });
  }

  const notifyOnSuccess = () => toast.success('Expense successfully Added!', {
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

const notifyOnFailure = () => toast.error('Fail to add expense', {
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
        <h5 className="fw-bold">Add Expense</h5>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
            <FontAwesomeIcon icon={ faWallet} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              aria-label="Title"
              aria-describedby="basic-addon1"
              name="title" // Added name attribute
              value={title} // Use title state variable
              onChange={handleChange} // Update title state on change
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
            <FontAwesomeIcon icon={faCircleUp} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Amount"
              aria-label="Amount"
              aria-describedby="basic-addon1"
              name="amount" // Added name attribute
              value={amount} // Use amount state variable
              onChange={handleChange} // Update amount state on change
            />
          </div>

          <button type="submit" className="btn btn-sm btn-primary w-100 fw-bold">
            Add Expense
          </button>
          <ToastContainer />
        </form>
      </div>
    </>
  );
};

export default AddExpense;
