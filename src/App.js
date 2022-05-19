import { useState } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';

function App() {

  // state to check if user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Role will be set after login is successful
  const [role, setRole] = useState("")

  // loginHandler need to be sent to Login component 
  // to set isLoggedIn and the role when the login is successful
  // In large applications we must use redux, where child component will set the store 
  // and this component will subscribe to that store and re-renders incase of any changes
  const loginHandler = (role) => {
    setIsLoggedIn(true)
    setRole(role)
  }

  // if the user is not logged in render Login otherwsie render EmployeeList 
  // this can be handled by routing instead of one or other by conditions
  return (
    <div className="App">
      <h1>Employee Management System</h1>
      {!isLoggedIn ?
        <Login onLogin={loginHandler} /> :
        <EmployeeList role={role} />
      }
    </div>
  );
}

export default App;
