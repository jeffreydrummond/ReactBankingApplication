import React from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../App';
import Card from './card';

function Login({ triggerLogin }) {
    const [status, setStatus] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);
    const history = useHistory()
    const [disableButton, setDisableButton] = React.useState(true);

    function validate(field, label) {
        if (!field) {
            setStatus("Error: " + label + ' must be populated');
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        return true;
    }
    React.useEffect(() => {
        ((email.length > 0) && (password.length > 0))
          ? setDisableButton(false) : setDisableButton(true)
      }, [email, password])

    function handleLogin() {
        if (!validate(email, 'Email')) return;
        if (!validate(password, 'Password')) return;

        let validUser = false
        ctx.users = JSON.parse(localStorage.getItem("users") || "[]")
        ctx.users.forEach((user) => {
            if(email === user.email && password === user.password) {
                validUser = true
            }
        })
        
        if(validUser) {
            
            let loggedInUser = ctx.users.find((user) => user.email === email);
            ctx.setLoggedInUser(loggedInUser);

            setTimeout(() => alert('Welcome ' + loggedInUser.firstName + '!'), 500);

            console.log("logged in user:  LOGIN HANDLE" + JSON.stringify(loggedInUser));

            localStorage.setItem("isLogin", loggedInUser.id);

            triggerLogin()
            history.push('/')
            
            // log event
            let eventDate = new Date().toISOString().slice(0, 10);
            
            function Event(date, type, amount, balance, user) { 
                return { date: date, type: type,  amount: amount, balance: balance, user: user} 
            };

            let event = new Event(eventDate, "Login", null, loggedInUser.balance, loggedInUser.lastName + ', ' + loggedInUser.firstName);
            loggedInUser.events.push(event);
        }
        else {
            setStatus("Error: Email or password is not matched");
        }
    }

    return (
        <Card bgcolor="primary"
            header="Login"
            status={status}
            body={
                <>
                    Email<br />
                        <input type="input" className="form-control" id="email"
                            placeholder="Enter email" value={email}
                            onChange={e => setEmail(e.currentTarget.value)} /><br />
                    Password<br />
                        <input type="password" className="form-control" id="password"
                            placeholder="Enter password" value={password}
                            onChange={e => setPassword(e.currentTarget.value)} /><br />
                    <button type="submit" className="btn btn-light" disabled={disableButton}
                        onClick={handleLogin}>Login</button>
                </>
            }
        />
    )
}
export default Login;

