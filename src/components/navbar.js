/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { UserContext } from "../App";
import { Card } from 'react-bootstrap';

function NavBar() {

    const [isLogin, setLogin] = useState(false)
    const ctx = React.useContext(UserContext);
    const history = useHistory()
    const confirmLogin = () => {
        setLogin(JSON.parse(localStorage.getItem("isLogin") || "false"));
    }

    useEffect(() => {
        console.log("login...")
        confirmLogin()
    });

    const handleClickLogout = (e) => {
        
        e.preventDefault();
        localStorage.removeItem("isLogin");
        console.log("logged in user in LOGOUT HANDLE: " + ctx.loggedInUser);
        confirmLogin()
        history.push('/');
    }

    // Get the logged in user name for the nav bar.
    const userId = localStorage.getItem("isLogin");    
    ctx.loggedInUser = ctx.users.find((user) => user.id.toString() === userId);
    let userFirstName = ctx.loggedInUser?.firstName ?? ''; 

    return (
        <div > 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div>
                    <a className="navbar-brand" href="#">Drummond Bank</a>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        { 
                            !isLogin ? <>
                            <li className="nav-item">
                                <a className="nav-link" href="#/createaccount/" activeClassName="nav-link--active"
                                data-toggle="tooltip" data-placement="top" title="Earn $100 just for opening an account!"
                                >Create Account</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/login/" activeClassName="nav-link--active"
                                data-toggle="tooltip" data-placement="top" title="Login to an existing account"
                                >Login </a>
                            </li>
                            </> : <>
                            <li className="nav-item">
                                <a className="nav-link" href="#/deposit/" activeClassName="nav-link--active"
                                data-toggle="tooltip" data-placement="top" title="Make an account deposit"
                                >Deposit</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/withdraw/" activeClassName="nav-link--active"
                                data-toggle="tooltip" data-placement="top" title="Make an account withdrawal"
                                >Withdraw</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/accountevents/" activeClassName="nav-link--active"
                                data-toggle="tooltip" data-placement="top" title="Review account activity"
                                >Account Events</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/"
                                data-toggle="tooltip" data-placement="top" title="Logout"
                                onClick={handleClickLogout}
                                >Logout</a>
                            </li>
                           </>
                        }
                    </ul>
                </div>
                <div>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>
                                <h6>Welcome {userFirstName}</h6>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </nav>
        </div>
    );
}
export default NavBar;
