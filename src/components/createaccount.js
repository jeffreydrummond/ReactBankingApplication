import React from 'react';
import { UserContext } from '../App';
import Card from './card';

function CreateAccount() {

    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);
    const [disableButton, setDisableButton] = React.useState(true);

    function validateInputFields(field, label) {
        if (!field) {
            setStatus("Error: " + label + ' must be populated');
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        if (label === 'Password' && field.length < 8) {
            setStatus("Error: " + label + ' must be >= 8 characters');
            setTimeout(() => setStatus(''), 3000);
            return false
          }

        return true;
    }

    function handleCreate() {
        console.log(firstName, lastName, email, password);

        if (!validateInputFields(firstName, 'First Name')) return;
        if (!validateInputFields(lastName, 'Last Name')) return;
        if (!validateInputFields(email, 'Email')) return;
        if (!validateInputFields(password, 'Password')) return;

        const temp_users = JSON.parse(localStorage.getItem("users") || "[]")
        temp_users.push({ id: (temp_users.length + 1), firstName, lastName, email, password, balance: 100, events: []})
        localStorage.setItem("users", JSON.stringify(temp_users))
        ctx.users = temp_users

        setShow(false);

    }
    function clearForm() {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setShow(true);
    }

    React.useEffect(() => {
        ((firstName.length > 0) && (lastName.length > 0) &&  
            (email.length > 0) && (password.length > 0))
          ? setDisableButton(false) : setDisableButton(true)
      }, [firstName, lastName, email, password])

    return (

        <Card bgcolor="primary"
            header="Create Account"
            status={status}
            body={show ? (
                <>
                   First Name<br />
                        <input type="input" className="form-control" id="txtFirstName" 
                            placeholder="Enter first name" value={firstName} 
                            onChange={e => setFirstName(e.currentTarget.value)} /><br />
                    Last Name<br />
                        <input type="input" className="form-control" id="txtLastName"
                            placeholder="Enter last name" value={lastName}
                            onChange={e => setLastName(e.currentTarget.value)} /><br />
                    Email<br />
                        <input type="input" className="form-control" id="txtEmail"
                            placeholder="Enter email" value={email}
                            onChange={e => setEmail(e.currentTarget.value)} /><br />
                    Password<br />
                        <input type="password" className="form-control" id="txtPassword"
                            placeholder="Enter password" value={password}
                            onChange={e => setPassword(e.currentTarget.value)} /><br />
                            <div>8 characters or more</div><br />
                    <button type="submit" className="btn btn-light" id="btnCreateAccount"
                        disabled={disableButton} onClick={handleCreate}>Create Account</button>
                </>

            ) : (

                <>
                    <h5>Success</h5>
                    <button type="submit" className="btn btn-light" id="btnAddAnotherAccount"
                        onClick={clearForm}>Add another account</button>


                </>
            )
            }
        />
    )
}
export default CreateAccount;

