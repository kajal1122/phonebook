import React from "react";

export default function PersonForm(props){
    const {newName,newNumber,inputChangeHandeler,numberChangeHandeler,formsubmithandeler}= props;
    return(
    <>
        <form onSubmit={formsubmithandeler}>
            <div>
            name: <input value={newName} onChange={inputChangeHandeler} />
            </div>
            <div>number: <input value={newNumber} onChange={numberChangeHandeler}/></div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    </>
   )
};