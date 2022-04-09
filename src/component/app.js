import { createContext, useEffect, useState } from "react"
import {
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    arrayUnion,
    arrayRemove,
    setDoc
} from 'firebase/firestore'

import { db } from "./firebase_config";

export default function App() {

    let uniqueIdgenerator= ()=>{
        var navigator_info = window.navigator;
        var screen_info = window.screen;
        var uid = navigator_info.mimeTypes.length;
        uid += navigator_info.userAgent.replace(/\D+/g, '');
        uid += navigator_info.plugins.length;
        uid += screen_info.height || '';
        uid += screen_info.width || '';
        uid += screen_info.pixelDepth || '';
        return uid
    } 

    let uniqueId = uniqueIdgenerator();


        



    const [task, setTask] = useState();
    const [taskList, setTaskList] = useState([]);


    const taskdoc = doc(db, 'tasks', uniqueId)
  

    const fetchtask = async () => {
        const qdata = await getDoc(taskdoc);
        try{
            setTaskList(qdata.data()['tasklist'])
        }
        catch(e){
            await setDoc(taskdoc, {tasklist:[]})
            setTaskList([])
        }
        
    }

    const addTastFB = async () => {

        if (task !== "") {
            await updateDoc(taskdoc, { tasklist: arrayUnion(task) });
            setTask('')

            fetchtask()
        }


        document.getElementById("taskinput").focus()


    }

    const removeTaskFB = async (e) => {


        let delValue = e.target.getAttribute('data-value')
        await updateDoc(taskdoc, { tasklist: arrayRemove(delValue) });

        fetchtask();



    }




    const setCurrentTask = (e) => {
        let currentValue = e.target.value;
        setTask(currentValue)
    }




    useEffect(() => {
        



        fetchtask()
    }, [])

    const crossTask = (e) => {
        if(e.target === e.currentTarget){
            let txtDec = e.currentTarget.firstChild.style;
            txtDec.textDecoration = (txtDec.textDecoration=="line-through") ? "none" :"line-through";
        }
        
        
    }
 
    return (
        <div className="app">

            <h1 className="heading">TODO LIST</h1>
            <div className="input-box">
                <input id='taskinput' value={task} type={"text"} autoComplete={"off"} onKeyDownCapture={(e)=>{
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        document.getElementById("add-btn").click();}}
                      } onChange={(e) => setCurrentTask(e)}></input>
                <button className="add-btn" id="add-btn" onClick={addTastFB}>+</button>
            </div>
            <div className="list">
                {taskList.map((listItem, key) => {
                    return <div className="listitem" key={key} onClick={(e)=>{crossTask(e)} }><div className="task" >{listItem}</div><button className="delete-btn" data-value={listItem} onClick={(e) => removeTaskFB(e)}>X</button></div>
                })}
            </div>

        </div>
    )
}