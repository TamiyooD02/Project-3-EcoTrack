//this component shows a list of all logged activities database
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ActivityList.css';

function ActivityList({ onEdit, refreshTrigger }) {
  // activities is the list from the database
  //starts as an empty array until the fetch is done
  const [activities, setActivities] = useState([]);

  // tracks what category users want to filter by
  //all wull show everything
  const [filterCategory, setFilterCategory] = useState('all');

  //fetch activities when the component first loads
  useEffect(
    function () {
      // fetch the activities from backend server
      fetch('/api/activities')
        .then(function (response) {
          // convert the response to json
          return response.json();
        })
        .then(function (data) {
          //sort activities by date
          const sorted = data.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          });
          setActivities(sorted);
        });
    },
    [refreshTrigger],
  );

  // this function runs when user clicks the delete button on an activity
  function handleDelete(id) {
    // show a browser confirm dialog before delete
    const confirmed = window.confirm('Are you sure you want to delete this activity?');
    // if the user clicked Cancel, stop here and don't delete
    if (!confirmed) return;

    // send a DELETE request to the backend with the activity id
    fetch('/api/activities/' + id, {
      method: 'DELETE',
    })
      .then(function (response) {
        // convert the response to json
        return response.json();
      })
      .then(function () {
        // after deleting, fetch the list again so the deleted item disappears
        fetch('/api/activities')
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            //sort again after deleting
            const sorted = data.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            });
            // update activities list with the new data
            setActivities(sorted);
          });
      });
  }

  // filter the activities based on the selected category
  // if filterCategory is 'all', show everything
  // otherwise only show activities that match the selected category
  const filteredActivities = activities.filter(function (activity) {
    if (filterCategory === 'all') return true;
    return activity.category === filterCategory;
  });

  return (
    <div className="activity-list">
      <h2>Activity History</h2>

      <div className="filter-bar">
        <label htmlFor="category-filter">Filter by category: </label>
        <select
          id="category-filter"
          value={filterCategory}
          onChange={function (e) { setFilterCategory(e.target.value); }}
        >
          <option value="all">All</option>
          <option value="transport">Transport</option>
          <option value="diet">Diet</option>
          <option value="energy">Energy</option>
        </select>
      </div>
      
      <ul>
        {filteredActivities.map(function (activity) {
          return (
            // each list item needs a unique key so react can keep track of it
            <li key={activity._id}>
              <span>{activity.date}</span>
              <span>{activity.type}</span>
              <span>{activity.category}</span>
              <span>
                {activity.value} {activity.unit}
              </span>
              <span>{activity.note}</span>

              <button
                onClick={function () {
                  onEdit(activity);
                }}
                aria-label={'Edit activity: ' + activity.type}
              >
                Edit
              </button>

              <button
                onClick={function () {
                  handleDelete(activity._id);
                }}
                aria-label={'Delete activity: ' + activity.type}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      {filteredActivities.length === 0 && (
        <p className="no-results">No activities found for this category.</p>
      )}
    </div>
  );
}

// define what props this component expects to receive
ActivityList.propTypes = {
  onEdit: PropTypes.func,
  refreshTrigger: PropTypes.number,
};

export default ActivityList;
