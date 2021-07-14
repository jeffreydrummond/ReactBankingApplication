import React from 'react';
import { UserContext } from '../App';
import Card from './card';



function Deposit() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [transactionAmount, setTransactionAmount] = React.useState(0);
    const [disableButton, setDisableButton] = React.useState(true);
    const ctx = React.useContext(UserContext);
    const [isShowingAlert, setShowingAlert] = React.useState(false);


        // keep track of the balance so it does'nt go negative
        console.log("Deposit page:  " + JSON.stringify(ctx.loggedInUser) + "is logged in");
        
        ctx.users = JSON.parse(localStorage.getItem("users") || "[]");
        const userId = localStorage.getItem("isLogin");
        ctx.loggedInUser = ctx.users.find((user) => user.id.toString() === userId);
        let loggedInUserBalance = ctx.loggedInUser?.balance ?? 0; 
         

    function validate(field, label) {
        if (!field) {
            setStatus("Error: Deposit amount cannot be empty");
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        if (transactionAmount <= 0) {
            setStatus("Error: Deposit amount must be a positive number");
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        
        clearForm();
        return true;
    }

    function clearForm() {
        setTransactionAmount('');
        setShow(true);
    }

    React.useEffect(() => {
        (transactionAmount > 0) ? setDisableButton(false) : setDisableButton(true) }, 
            [transactionAmount])

    function handleDeposit() {

        if (!validate(transactionAmount, 'transactionAmount')) return;
        ctx.handleTransaction('Deposit', transactionAmount);

        setStatus('Deposit of $' + transactionAmount + ' successfully completed!');
        setTimeout(() => setStatus(''), 2000);
    }

    return (

<div>
        <Card bgcolor="success"
            header="Make a Deposit"
            status={status}
            body={(

                <div>
                    <label>Balance: ${loggedInUserBalance}</label><br />
                Deposit amount<br />
                    <input type="number" className="form-control" id="deposit" min="1"
                        placeholder="Enter deposit amount" value={transactionAmount}
                        onChange={e => setTransactionAmount(e.currentTarget.value)} /><br />
                    <button type="submit" className="btn btn-light" disabled={disableButton}
                        onClick={() => {handleDeposit()}}>Deposit</button>
                </div>

            )
            }
        />
        </div>
    )
}
export default Deposit;

