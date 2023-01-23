import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';
import './index.css';
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber , setNewNumber] = useState('');
  const [ filterInput , setFilterInput] = useState('');
  const [notification, SetNotification] = useState(null);
  const [succMsg , showSuccMsg] = useState(null);

  const hook = () => {
    
    personService.getAll()
      .then(response => {
        setPersons(response)
      })
  }
  
  useEffect(hook, [])

  const inputChangeHandeler = (e)=>{
    setNewName(e.target.value);
   

  }
  const formsubmithandeler = (e)=>{
    e.preventDefault();
    var newNameObject = {
      name : newName,
      number : newNumber
    }
    var newPersonList = [...persons];
    var found = newPersonList.find(person => person.name === newName);
    if(found === undefined){
      personService.create(newNameObject)
      .then(response => {setPersons(persons.concat(response))
        showSuccMsg('true')
        SetNotification(`${response.name} is succesfully added to phonebook ! `)
         setTimeout(()=>{
            SetNotification(null);
            showSuccMsg(null);
         }, 5000)
      
      
      })
      
      
      

    }
    else{
      //alert(` ${newName} is already added to phonebook `);
      //console.log(found.id);
      if (window.confirm(`${newNameObject.name} is already added to phonebook, replace the old number with new one ?`)) {
        personService.update(found.id, newNameObject)
      .then( response => { setPersons(persons.map(person => person.id !== found.id ? person : response ))})
      .catch(error  => {
         showSuccMsg('false')
         SetNotification(`${newName} was already removed from server `)
         setTimeout(()=>{
            showSuccMsg(null)
            SetNotification(null);
         }, 5000)
         //alert(`${newName} is already deleted from server `)
      }) 
        setPersons(persons.filter(person => person.id !== found.id)) 
      }
      
    }
    
    setNewName('');
    setNewNumber('');


  }
  const numberChangeHandeler = (e)=>{
    setNewNumber(e.target.value);
  }
  
  const filterChangeHandeler = (e)=>{
    setFilterInput(e.target.value);
    
  }

  const deletePerson = (id, name) =>{
    if (window.confirm(`Delete ${name}`)) {
      personService.deletePerson(id)
    .then(response => {setPersons(persons.filter(person => person.id !== id))
          showSuccMsg('true');
          SetNotification(`${name} is succesfully deleted from server `)
          setTimeout(()=>{
              showSuccMsg(null);
              SetNotification(null)
          }, 5000)
    
    })
      
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} succMsg={succMsg}/>
      <Filter filterInput={filterInput} filterChangeHandeler={filterChangeHandeler}/>
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} inputChangeHandeler={inputChangeHandeler} numberChangeHandeler={numberChangeHandeler} formsubmithandeler={formsubmithandeler}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterInput={filterInput} deletePerson={deletePerson}/>
    </div>
  )
}

export default App