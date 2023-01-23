import React from "react";

export default function Filter(props){
    
    const {filterInput , filterChangeHandeler} = props
    return(
        <>
            <div>filter shown with <input value={filterInput} onChange={filterChangeHandeler } /></div>

        </>
    )
}