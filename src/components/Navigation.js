import React from "react";
import {Link} from "react-router-dom";

const Navigation = ({userObj}) => {
    let displayName = "";
    if(userObj.displayName === null || userObj.displayName === ""){
        displayName = userObj.email;
        displayName = displayName.slice(0, displayName.indexOf("@"));
    }
    return(
    <>
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">{(userObj.displayName === null) ? displayName : userObj.displayName}</Link>
            </li>
        </ul>
    </nav>
    </>
    )};
export default Navigation;