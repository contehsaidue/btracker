import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import ShowBudgetTrackerInfo from './ShowBudgetTrackerInfo';
import Pagination from './Pagination';

import axios from 'axios';

const ViewExpenseHistory = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [initialBudget, setInitialBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // New state for current page

  useEffect(() => {

    const fetchData = async () => {
      try {
        const budgetResponse = await axios.get('http://localhost:3000/api/budget/all');
        const expenseResponse = await axios.get('http://localhost:3000/api/expense/all');

        console.log('Budget data:', budgetResponse.data.budget); // Check the budget data structure
        console.log('Expense data:', expenseResponse.data.expense); // Check the expense data structure

        // Calculate total budget from the array of budget objects
        const totalBudget = budgetResponse.data.budget.reduce((acc, budget) => acc + budget.budget, 0);
        setInitialBudget(totalBudget);
        setExpenses(expenseResponse.data.expense);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (_id, e) => {
    const deleteConfirm = window.confirm('Would you like to delete this?');
  
    if (deleteConfirm) {
      e.preventDefault(); // Prevent default form submission
  
      axios.delete(`http://localhost:3000/api/expense/delete/${_id}`)
        .then(res => {
          console.log(res);
          notifyOnSuccess(); // Call success notification

        })
        .catch(err => {
          console.log(err);
          notifyOnFailure(); // Call failure notification
        });
    }
  }


  const notifyOnSuccess = () => toast.success('Successfully Deleted!', {
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
  
  const notifyOnFailure = () => toast.error('Fail to delete Item', {
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
  

  const totalExpenses = expenses.reduce((accumulator, expense) => accumulator + expense.amount, 0);

  const ITEMS_PER_PAGE = 4; // Number of items per page

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const displayedExpenses = expenses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE); // Calculate total pages

  const formatNumber = (num) => {
    return num.toLocaleString('sl-SL', {
      style: 'currency',
      currency: 'SLL',
    });
  };


  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <>
      <div className="shadow p-3 mb-5 bg-body rounded">
        <ShowBudgetTrackerInfo totalBudget={initialBudget} totalExpenses={totalExpenses} />
        <hr className="my-4" style={{ borderTop: '2px solid #ccc' }} />

        <table className="table table-striped table-hover">
          <thead>
            <tr className='text-center'>
              <th scope="col">NO.</th>
              <th scope="col">Expense Title</th>
              <th scope="col">Amount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
          {displayedExpenses.length > 0 ? (
              displayedExpenses.map((expense, index) => (
                <tr key={expense._id} className='text-center'>
                  <th scope="row">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</th>
                  <td>{expense.title}</td>
                  <td>{expense.amount}</td>
                  <td>
                    <div className="btn-group">
                      <Link to={`/update/${expense._id}`} className="btn btn-success">
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                     <button onClick = {(e) => handleDelete(expense._id,e)} id={expense._id} className="btn btn-danger">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className='text-center'>
                <td colSpan="4" className="fw-bold fs-italic">No expenses found!</td>
              </tr>
            )}

            <tr>
              <th colSpan="1">Total</th>
              <td colSpan="3" className='bg-dark text-white fw-bold'>{formatNumber(totalExpenses)}</td> 
            </tr>
          </tbody>
          <ToastContainer />
        </table>

        {/* Pagination component with Bootstrap classes */}
        <Pagination handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>
      </div>
    </>
  );
}

export default ViewExpenseHistory;
