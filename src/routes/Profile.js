import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbInstance";

export default ({userObj}) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    return (
    <>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
    )
}