import React from 'react';
import { UserContext } from '../App';
import Card from './card';

function Withdraw() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [transactionAmount, setTransactionAmount] = React.useState(0);
    const [disableButton, setDisableButton] = React.useState(true);


    const ctx = React.useContext(UserContext);

        // keep track of the balance so it does'nt go negative
        console.log("Withdraw page:  " + JSON.stringify(ctx.loggedInUser) + "is logged in");

        ctx.users = JSON.parse(localStorage.getItem("users") || "[]");
        const userId = localStorage.getItem("isLogin");    
        ctx.loggedInUser = ctx.users.find((user) => user.id.toString() === userId);
        let loggedInUserBalance = ctx.loggedInUser?.balance ?? 0; 

    function validate(field, label) {
        if (!field) {
            setStatus("Error: Withdrawal amount must be > 0");
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        if ((loggedInUserBalance - transactionAmount) < 0) {
            setStatus("Error: Withdrawal transaction cannot result in a negative balance");
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        if (transactionAmount <= 0) {
            setStatus("Error: Withdrawal amount must be a positive number");
            setTimeout(() => setStatus(''), 3000);
            return false
        }
        clearForm();
        return true;
    }

    React.useEffect(() => {
        (transactionAmount > 0) ? setDisableButton(false) : setDisableButton(true) }, 
            [transactionAmount])


    function handleWithdrawal() {
        if (!validate(transactionAmount, 'transactionAmount')) return;
        if ((loggedInUserBalance - transactionAmount) < 0) return;
        ctx.handleTransaction('withdraw', transactionAmount);
    }

    function clearForm() {
        setTransactionAmount('');
        setShow(true);
    }

    return (

        <Card bgcolor="warning"
            header="Make a Withdrawal"
            status={status}
            body={(
                <>
                    <label>Balance: ${loggedInUserBalance}</label><br />
                Withdrawal amount<br />
                    <input type="number" className="form-control" id="deposit" min="0" max={loggedInUserBalance}
                        placeholder="Enter withdrawal amount" value={transactionAmount}
                        // eslint-disable-next-line no-sequences
                        onChange={e => setTransactionAmount(e.currentTarget.value)} /><br />
                    <button type="submit" className="btn btn-light" disabled={disableButton}
                        onClick={handleWithdrawal}>Withdraw</button>
                </>

            )
            }
        />
    )
}
export default Withdraw;