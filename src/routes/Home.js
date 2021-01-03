import React, { useEffect, useState } from "react";
import Joweet from "../components/Joweet";
import { dbService } from "../fbInstance";

const Home = ({userObj}) => {
    const [joweet, setJoweet] = useState("");
    const [joweets, setJoweets] = useState([]);
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
        await dbService.collection("joweets").add({
            text: joweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        });
        setJoweet("");
    }
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setJoweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={joweet} onChange={onChange} type="text" placeholder="글을 적어주세요" maxLength={120} />
                <input type="file" accept="image/*" />
                <input type="submit" value="Joweet" />
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