import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const ShowBudgetTrackerInfo = ({ totalBudget = 0, totalExpenses = 0 }) => {
  const budgetLeft = totalBudget - totalExpenses;

  const formatNumber = (num) => {
    return num.toLocaleString('sl-SL', {
      style: 'currency',
      currency: 'SLL',
    });
  };

  return (
    <div className="container mx-auto">
      <div className="row">
        <div className="col-md-4"> 
        <div className="btn-group">
                      <a href="{expense._id} " className="btn btn-sm btn-success active">
                        <FontAwesomeIcon icon={faEdit} />
                      </a>
                      <a className="btn btn-sm  btn-dark fw-bold">
                      Total Budget: {formatNumber(totalBudget)}
                      </a>
                    </div>
        </div>
        <div className="col-md-4">
          <p className="btn btn-sm  btn-success fw-bold">Total Expenses: {formatNumber(totalExpenses)}</p>
        </div>
        <div className="col-md-4">
          <p className={`btn btn-sm btn-success fw-bold ${budgetLeft < 0 ? 'text-danger' : ''}`}>
            Budget Left: {formatNumber(budgetLeft)}
          </p>
        </div>
      </div>
    </div>
  );
};

ShowBudgetTrackerInfo.propTypes = {
  totalBudget: PropTypes.number,
  totalExpenses: PropTypes.number,
};

export default ShowBudgetTrackerInfo;
