import React, {useState} from "react";
import "./landing.css"

export const NavigationLoggedIn = (props) => {


  const dropdownHandler = (panel) =>{
    props.setPanelName(panel)
    props.setDropdown("")
  }
  
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
            Welcome! {sessionStorage.getItem("userName")}
          </a>{" "}
    
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <div 
              onClick={()=>dropdownHandler("overview")}
              className="page-scroll">
                Overview
              </div>
            </li>
            <li>
            <div onClick={() => props.setDropdown(prev => prev === "referral" ? "" : "referral")} >
  Referral/Shout Out
</div>
              <div style={{display: props.isDropdownOpen === "referral"?"block":"none"}} class="feature-menu-dropdown">
  <div 
  onClick={()=>dropdownHandler("createPunishment")}
  className="item">New Referral/Shout Outs</div>
  <div 
  onClick={()=>dropdownHandler("punishment")}
  className="item">Existing Referral/Shout Outs</div>
</div>
              
            </li>
            <li>
              <div 
               onClick={()=>dropdownHandler("student")}
              >
              My Students
              </div>
            </li>
            <li>
              <div 
              onClick={()=>{
                props.setPanelName("levelThree")
              }}
              >
              My Tasks
              </div>
            </li>
           
            <li>
              <button className="login-btn"
              onClick={()=>props.setLogin()}>
                Logout
              </button>
            </li>
          
          </ul>
        </div>
      </div>
    </nav>
  );
};