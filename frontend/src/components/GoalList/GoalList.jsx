//this component shows a list of all goals from the database
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './GoalList.css';

function GoalList({ onEdit, refreshTrigger }) {
  // goals is the list from the database
  //starts as an empty array until the fetch is done
  const [goals, setGoals] = useState([]);

  //fetch goals when the component first loads
  useEffect(
    function () {
      // fetch the goals from backend server
      fetch('/api/goals')
        .then(function (response) {
          // convert the response to json
          return response.json();
        })
        .then(function (data) {
          //sort goals by deadline (nearest first)
          const sorted = data.sort(function (a, b) {
            return new Date(a.deadline) - new Date(b.deadline);
          });
          setGoals(sorted);
        });
    },
    [refreshTrigger],
  );

  // this function runs when user clicks the delete button on a goal
  function handleDelete(id) {
    // send a DELETE request to the backend with the goal id
    fetch('/api/goals/' + id, {
      method: 'DELETE',
    })
      .then(function (response) {
        // convert the response to json
        return response.json();
      })
      .then(function () {
        // after deleting, fetch the list again so the deleted item disappears
        fetch('/api/goals')
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            //sort again after deleting
            const sorted = data.sort(function (a, b) {
              return new Date(a.deadline) - new Date(b.deadline);
            });
            // update goals list with the new data
            setGoals(sorted);
          });
      });
  }

  return (
    <div className="goal-list">
      <h2>My Goals</h2>

      <ul>
        {goals.map(function (goal) {
          return (
            // each list item needs a unique key so react can keep track of it
            <li key={goal._id}>
              <span className="goal-title">{goal.title}</span>
              <span>{goal.category}</span>
              <span>
                {goal.targetValue} {goal.targetUnit}
              </span>
              <span>{goal.deadline}</span>
              <span className={'goal-status goal-status-' + goal.status}>
                {goal.status}
              </span>
              <span>{goal.note}</span>

              <button
                onClick={function () {
                  onEdit(goal);
                }}
              >
                Edit
              </button>

              <button
                onClick={function () {
                  handleDelete(goal._id);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// define what props this component expects to receive
GoalList.propTypes = {
  onEdit: PropTypes.func,
  refreshTrigger: PropTypes.number,
};

export default GoalList;
