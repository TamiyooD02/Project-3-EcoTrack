// main app component
import { useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import ActivityList from './components/ActivityList/ActivityList';
import ActivityForm from './components/ActivityForm/ActivityForm';
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

  //track what page to show
  const [currentPage, setCurrentPage] = useState('login');

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
      <h1>EcoTrack</h1>

      <div className="navbar">
        <button>Log Activities</button>
        <button>Create Goals</button>
        <span className="welcome-text">
          Welcome, {user.name}!
        </span>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <ActivityForm selectedActivity={selectedActivity} onSave={handleSave} />
        <ActivityList onEdit={handleEdit} refreshTrigger={refreshTrigger} />
      </div>
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
