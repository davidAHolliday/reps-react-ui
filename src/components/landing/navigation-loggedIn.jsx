import React, {useState} from "react";
import "./landing.css"

export const NavigationLoggedIn = (props) => {
  const [dropdown,setDropdown] = useState({referral:false})
  
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            Welcome! Justin
          </a>{" "}
    
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <div href="#features" className="page-scroll">
                Overview
              </div>
            </li>
            <li>
              <div onClick={()=>setDropdown((prev)=>({
                ...prev, referral:!prev.referral

              }))} href="#features" className="page-scroll">
              Referral/Shout Out
              </div>
              <div style={{display: dropdown.referral?"block":"none"}} class="feature-menu-dropdown">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>
              
            </li>
            <li>
              <div href="#features" className="page-scroll">
              My Students
              </div>
            </li>
            <li>
              <div href="#features" className="page-scroll">
              My Tasks
              </div>
            </li>
           
            <li>
              <button className="login-btn"
              onClick={()=>props.setLogin(prev=>!prev)}>
                Logout
              </button>
            </li>
          
          </ul>
        </div>
      </div>
    </nav>
  );
};