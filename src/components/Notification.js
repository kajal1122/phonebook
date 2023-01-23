import React from "react";
import '../index.css';
export default function Notification(props){
    const {notification, succMsg} = props;

    if(notification === null){
        return(
           null
        )
    }
    return(
        <>
            {succMsg === 'true' ? <div className="succMsg">{notification}</div> : <div className="errorMsg">{notification}</div>}
        </>
    )

        // {succMsg === "true" ? 
        // <div className="errorMsg">
        //    {notification}
        // </div> :
        // <div className="succMsg">
        //     {notification}
        // </div>
        // }
    
}