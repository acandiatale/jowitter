import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbInstance";
import { useState } from "react/cjs/react.development";

export default ({userObj}) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
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
    const onChange = (event) => {
        const  {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
    }
    return (
    <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
            <input type="submit" value="Update Profile"/>
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
    )
}
