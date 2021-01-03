import React, { useState } from "react";
import { dbService } from "../fbInstance";

const Joweet = ({joweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newJoweet, setNewJoweet] = useState(joweetObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("해당 Joweet을 삭제 하시겠습니까?");
        if(ok){
            await dbService.doc(`joweets/${joweetObj.id}`).delete();
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onChange = (event) => {
        const {
            target: {value}
        } = event;
        setNewJoweet(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`joweets/${joweetObj.id}`).update({
            text: newJoweet,
        })
        setEditing(false);
    }
    return (
    <div>
        {
            editing ? (
            <>
                {isOwner && (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" onChange={onChange} placeholder="수정 글을 적어주세요." value={newJoweet} required />
                        <input type="submit" value="Update Joweet" />
                    </form>
                    <button onClick={toggleEditing}>cancel</button>
                </>
                )}
            </>
             ) : (
            <>
                <h4>{joweetObj.text}</h4>
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>Delete Joweet</button>
                        <button onClick={toggleEditing}>Edit Joweet</button>
                    </>
                )}
            </>
             )
        }
    </div>
    );
};

export default Joweet;