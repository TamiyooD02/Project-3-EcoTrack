// this component handles creating a new goal and editing an existing one
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './GoalForm.css';

function GoalForm({ selectedGoal, onSave }) {
  // one state variable for each form field
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [targetUnit, setTargetUnit] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('active');
  const [note, setNote] = useState('');

  // when selectedGoal changes it means the user clicked edit
  useEffect(
    function () {
      if (selectedGoal) {
        setTitle(selectedGoal.title);
        setCategory(selectedGoal.category);
        setTargetValue(selectedGoal.targetValue);
        setTargetUnit(selectedGoal.targetUnit);
        setDeadline(selectedGoal.deadline);
        setStatus(selectedGoal.status);
        setNote(selectedGoal.note);
      } else {
        // if no goal is selected clear the form
        setTitle('');
        setCategory('');
        setTargetValue('');
        setTargetUnit('');
        setDeadline('');
        setStatus('active');
        setNote('');
      }
    },
    [selectedGoal],
  );

  // this function runs when the user clicks the save button
  function handleSubmit(e) {
    // prevent the page from refreshing when the form is submitted
    e.preventDefault();

    // put all the form field values into one object
    const goalData = {
      title: title,
      category: category,
      targetValue: targetValue,
      targetUnit: targetUnit,
      deadline: deadline,
      status: status,
      note: note,
    };

    // if selectedGoal has an id it means an existing goal is being edited
    // if not, create a new one
    if (selectedGoal) {
      // send a PUT request to update the existing goal
      fetch('/api/goals/' + selectedGoal._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function () {
          // tell the parent component to save
          onSave();
        });
    } else {
      // send a POST request to create a new goal
      fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function () {
          // tell the parent component to save
          onSave();
        });
    }
  }

  return (
    <div className="goal-form">
      <h2>{selectedGoal ? 'Edit Goal' : 'Create New Goal'}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            placeholder="e.g. Reduce meat consumption by 20%"
            value={title}
            onChange={function (e) {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div>
          <label>Category: </label>
          <input
            type="text"
            placeholder="e.g. transport, diet, energy"
            value={category}
            onChange={function (e) {
              setCategory(e.target.value);
            }}
          />
        </div>

        <div>
          <label>Target Value: </label>
          <input
            type="number"
            placeholder="e.g. 20"
            value={targetValue}
            onChange={function (e) {
              setTargetValue(e.target.value);
            }}
          />
        </div>

        <div>
          <label>Target Unit: </label>
          <input
            type="text"
            placeholder="e.g. %, miles, servings"
            value={targetUnit}
            onChange={function (e) {
              setTargetUnit(e.target.value);
            }}
          />
        </div>

        <div>
          <label>Deadline: </label>
          <input
            type="date"
            value={deadline}
            onChange={function (e) {
              setDeadline(e.target.value);
            }}
          />
        </div>

        <div>
          <label>Status: </label>
          <select
            value={status}
            onChange={function (e) {
              setStatus(e.target.value);
            }}
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label>Note: </label>
          <input
            type="text"
            placeholder="e.g. monthly target"
            value={note}
            onChange={function (e) {
              setNote(e.target.value);
            }}
          />
        </div>

        <button type="submit">
          {selectedGoal ? 'Update Goal' : 'Save Goal'}
        </button>

        {selectedGoal && (
          <button type="button" onClick={onSave}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

// define what props this component expects
GoalForm.propTypes = {
  selectedGoal: PropTypes.object,
  onSave: PropTypes.func,
};

export default GoalForm;
