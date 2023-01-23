import React from "react";

export default function Persons(props){
    const {persons,filterInput, deletePerson} = props
    return(
        <>
           {persons.filter(person => person.name.toLowerCase().includes(filterInput.toLowerCase())).map( (person) => <div key={person.id}>{person.name} {person.number} <button onClick={()=>deletePerson(person.id, person.name)}>delete</button></div>)}
           
        </>
    )
}