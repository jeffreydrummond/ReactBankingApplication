import React from 'react';
import { UserContext } from '../App';
import Card from './card';

const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial"
  };
  
const Header = () => {
    return (
      <div className="card-header">
        <div className="row">
          <div className="col">
            Date
          </div>
          <div className="col">
            Type
          </div>
          <div className="col">
            Amount
          </div>
          <div className="col">
            Balance
          </div>
          <div className="col">
            User
          </div>
        </div>
    </div>
    );
  };

function AccountEvents() {

    const ctx = React.useContext(UserContext);
    const { Fragment } = React;


    ctx.users = JSON.parse(localStorage.getItem("users") || "[]");
    const userId = localStorage.getItem("isLogin");
    ctx.loggedInUser = ctx.users.find((user) => user.id.toString() === userId);

    console.log("Events page:  " + JSON.stringify(ctx.loggedInUser) + "is logged in");

    return(
      <div>
        <Card bgcolor="info" className="text-center"
            header="Account Events"
            body={(
              <Fragment>
              <Header></Header>
              {ctx.loggedInUser?.events?.map((item, index) =>(
                <div className="container">
                  <div className="table-wrapper">
                    <div className="row">
                      <div className="col">
                        {item.date}
                      </div>
                      <div className="col">
                        {item.type}
                      </div>
                      <div className="col">
                        {item.amount}
                      </div>
                      <div className="col">
                        {item.balance}
                      </div>
                      <div className="col">
                        {item.user}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </Fragment>
            )
            }
        />
        </div>

    );

}
export default AccountEvents;