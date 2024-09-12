import React, { useState, useEffect } from "react";
import { useParams, useNavigate  } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faCircleUp} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const UpdateExpense = () => {

  const {id} = useParams();
  const [title, setTitle] = useState("");  // Initial value can be empty string
  const [amount, setAmount] = useState(""); // Initialize as an empty string

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseResponse = await axios.get('http://localhost:3000/api/expense/byId/'+id);
        console.log(expenseResponse.data.expense);
    
        setTitle(expenseResponse.data.expense.title); 
        setAmount(expenseResponse.data.expense.amount); 

      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    };
    
    fetchData();
  }, []);


  const handleUpdate = (e) => {
    e.preventDefault();
  
    const expenseData = {
      title,
      amount: Number(amount), // Ensure amount is a number before sending
    };
  
    axios.put(`http://localhost:3000/api/expense/update/`+id, expenseData)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <>
      <div className="container mt-5 shadow p-3 mb-5 bg-body rounded">
        <h5 className="fw-bold mb-3">Update Expense</h5>
        <form onSubmit={handleUpdate}>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
            <FontAwesomeIcon icon={faWallet} />
            </span>
            <input
          type="text"
          className="form-control"
          aria-label="Title"
          aria-describedby="basic-addon1"
          name="title"
          value={title}
          onChange= {e => setTitle(e.target.value)}
        />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
            <FontAwesomeIcon icon={faCircleUp} />
            </span>
            <input
          type="text"
          className="form-control"
          aria-label="Amount"
          aria-describedby="basic-addon1"
          name="amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

          </div>
          <button type="submit" className="btn btn-sm btn-primary w-100 fw-bold">
            Update Expense
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateExpense;
