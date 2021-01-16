import React, { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid"
import Joweet from "../components/Joweet";
import { dbService, storageService } from "../fbInstance";

const Home = ({userObj}) => {
    const [joweet, setJoweet] = useState("");
    const [joweets, setJoweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    useEffect(() => {
        dbService.collection("joweets").onSnapshot(snapshot => {
            const joweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setJoweets(joweetArray);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const joweetObj = {
            text: joweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        await dbService.collection("joweets").add(joweetObj);
        setJoweet("");
        setAttachment("");
    }
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setJoweet(value);
    }
    const onFileChange = (event) => {
        const {target: {files},} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget : {result},} = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment = () => {
        setAttachment(null);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={joweet} onChange={onChange} type="text" placeholder="글을 적어주세요" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Joweet" />
                {attachment && 
                <div>
                    <img src={attachment} width="50px" height="50px" alt="" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>}
            </form>
            <div>
                {joweets.map((joweet) => (
                    <Joweet key={joweet.id} joweetObj={joweet} isOwner={joweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}

export default Home;