// main app component
import { useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import ActivityList from './components/ActivityList/ActivityList';
import ActivityForm from './components/ActivityForm/ActivityForm';
import GoalList from './components/GoalList/GoalList';
import GoalForm from './components/GoalForm/GoalForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './index.css';

//component decides what to show based on if user is logged in
function AppContent() {
  //keeps track of activity user clicked 'edit' on
  const [selectedActivity, setSelectedActivity] = useState(null);

  // number increases every time user saves or delete
  //ActivityList watches this number and re-fetches when it changes
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  //keeps track of goal user clicked 'edit' on
  const [selectedGoal, setSelectedGoal] = useState(null);

  //GoalList watches this number and re-fetches when it changes
  const [goalRefreshTrigger, setGoalRefreshTrigger] = useState(0);

  //track what page to show
  const [currentPage, setCurrentPage] = useState('login');

  //track which view is active: 'activities' or 'goals'
  const [currentView, setCurrentView] = useState('activities');

  //get current user and setUser from context
  const { user, setUser } = useUser();

  //when user clicks edit on an activity, save it to state
  function handleEdit(activity) {
    setSelectedActivity(activity);
  }

  //when form saves, clear selected activity
  function handleSave() {
    setSelectedActivity(null);
    setRefreshTrigger(refreshTrigger + 1);
  }

  //when user clicks edit on a goal, save it to state
  function handleGoalEdit(goal) {
    setSelectedGoal(goal);
  }

  //when goal form saves, clear selected goal
  function handleGoalSave() {
    setSelectedGoal(null);
    setGoalRefreshTrigger(goalRefreshTrigger + 1);
  }

  // when the user clicks logout clear the user from context
  function handleLogout() {
    fetch('/api/auth/logout')
      .then(function (response) {
        return response.json();
      })
      .then(function () {
        setUser(null);
        setCurrentPage('login');
      });
  }

  // if user is not logged in show login or register page
  if (!user) {
    if (currentPage === 'register') {
      return (
        <RegisterPage
          onRegisterSuccess={function () {
            setCurrentPage('login');
          }}
        />
      );
    }
    return (
      <LoginPage
        onLoginSuccess={function (page) {
          if (page === 'register') {
            setCurrentPage('register');
          } else {
            setCurrentPage('app');
          }
        }}
      />
    );
  }

  return (
    <div>
      <header className="app-header">
        <h1>EcoTrack</h1>

        <nav className="navbar">
          <button
            onClick={function () {
              setCurrentView('activities');
            }}
            className={currentView === 'activities' ? 'navbar-btn active' : 'navbar-btn'}
            disabled={currentView === 'activities'}
            aria-current={currentView === 'activities' ? 'page' : undefined}
          >
            Log Activities
          </button>
          <button
            onClick={function () {
              setCurrentView('goals');
            }}
            className={currentView === 'goals' ? 'navbar-btn active' : 'navbar-btn'}
            disabled={currentView === 'goals'}
            aria-current={currentView === 'goals' ? 'page' : undefined}
          >
            Create Goals
          </button>
          <span className="welcome-text">Welcome, {user.name}!</span>
          <button className="navbar-btn" onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main className="app-content">
        {currentView === 'activities' && (
          <div className="view-container">
            <ActivityForm
              selectedActivity={selectedActivity}
              onSave={handleSave}
            />
            <ActivityList onEdit={handleEdit} refreshTrigger={refreshTrigger} />
          </div>
        )}

        {currentView === 'goals' && (
          <div className="view-container">
            <GoalForm selectedGoal={selectedGoal} onSave={handleGoalSave} />
            <GoalList
              onEdit={handleGoalEdit}
              refreshTrigger={goalRefreshTrigger}
            />
          </div>
        )}
      </main>
    </div>
  );
}

// wrap the whole app in UserProvider
function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
