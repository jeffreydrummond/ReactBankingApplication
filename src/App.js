import './App.css';
import React, {useEffect, useState, createContext} from 'react';
import { HashRouter } from 'react-router-dom';
import { Route } from 'react-router';
import NavBar from './components/navbar';
import Home from './components/home';
import CreateAccount from './components/createaccount';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import AccountEvents from './components/accountevents';
import Login from './components/login';
import context from 'react-bootstrap/esm/AccordionContext';

export const UserContext = createContext(null);

function Spa() {

  // A collection of users.
  const [users, setUsers] = useState([])
  const [_, setLastLogin] = useState(new Date().toISOString());
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  useEffect(() => {  
    setUsers(JSON.parse(localStorage.getItem("users") || "[]"))

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const userId = localStorage.getItem("isLogin")    
    setLoggedInUser(users.find((user) => user.id.toString() === userId))
  },[]);


  function handleTransaction(transactionType, transactionAmount) {
    
    let prevBalance = loggedInUser?.balance ?? 0;
    let newBalance = 0;

    if(transactionType === 'deposit') {
      newBalance = (Number(prevBalance) + Number(transactionAmount));
    }else if (transactionType === 'withdraw') {
      newBalance = (Number(prevBalance) - Number(transactionAmount));
    }
    
    console.log("Parent is receiving transaction amount of: " + transactionAmount);

    loggedInUser.balance = newBalance;

    // log event
    let eventDate = new Date().toISOString().slice(0, 10);
    
    function Event(date, type, amount, balance, user) { 
      return { date: date, type: type,  amount: amount, balance: balance, user: user} 
    };

    let event = new Event(eventDate, transactionType, transactionAmount, loggedInUser.balance, loggedInUser.lastName + ', ' + loggedInUser.firstName);
    loggedInUser.events.push(event);
    setLoggedInUser(loggedInUser);

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updateResults = users.map((user) => {
      if (loggedInUser.id === user.id) {
        return {
          ...user,
          balance: loggedInUser.balance,//
          events: loggedInUser.events
        }
      } else {
        return user
      }
    })
    localStorage.setItem("users", JSON.stringify(updateResults))

  }

  return (

    <HashRouter>
            <UserContext.Provider value={{
                users,
                handleTransaction,
                loggedInUser,
                setLoggedInUser,
                setUsers
            }}>
                <NavBar />
                <Route path="/" exact component={Home} />
                <Route path="/createaccount/" component={CreateAccount} />
                <Route path="/deposit/" component={Deposit} />
                <Route path="/withdraw/" component={Withdraw} />
                <Route path="/accountevents" component={AccountEvents} />
                <Route path="/login/" component={() => <Login triggerLogin={() => setLastLogin(new Date().toISOString())}/>} />
            </UserContext.Provider>
        </HashRouter>
        
  );
}

export default Spa;
