import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbInstance";

export default ({userObj}) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    const getMyJoweets = async () => {
        const joweets = await dbService.collection("joweets").where("creatorId", "==", userObj.uid).orderBy("createdAt").get();
        console.log(joweets.docs.map(doc => doc.data()));
    };
    useEffect(() => {
        getMyJoweets();
    }, []);
    return (
    <>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
    )
}
