import React from 'react';
import ViewExpenseHistory from '../components/ViewExpenseHistory';
import AddBudget from '../components/AddBudget';
import AddExpense from '../components/AddExpense';
import UpdateExpense from '../components/UpdateExpense';

const Home = () => {
  return (
    <>
      <div className='container mx-auto p-3' style={{ fontFamily: 'Poppins, sans-serif' }}>
        <h1 className='fw-bold text-center mt-3 mb-3 py-3'>Budget Tracker System</h1>
        <div className='row'>
          <div className='col-md-3'>
            <AddBudget />
            <AddExpense />
            {/* <UpdateExpense /> */}
          </div>
          <div className='col-md-9'>
            <ViewExpenseHistory />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
