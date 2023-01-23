const { response } = require('express');
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

let person = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    const maxId = person.length > 0
      ? Math.max(...person.map(n => n.id))
      : 0
    return maxId + 1
  }

app.get('/api/persons', (request, response )=>{
   response.json(person);
})

app.get('/api/persons/info', (request, response) =>{
  const msg = `<p>Phonebook has info for ${person.length} people</p>`;
  const dateTime = new Date(); 
  response.write(msg);
  response.write(`${dateTime}`)
  response.end();


})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const requestedPerson = person.find(n => n.id === id);
    if(requestedPerson){
        
        response.json(requestedPerson)
    }else{
        response.status(404).end()
    }
    

})

app.delete('/api/persons/:id', (request, response) =>{
    const id = Number(request.params.id);
    person = person.filter(n => n.id !== id);
    response.status(204).end()
})

app.post('/api/persons', (request, response) =>{
    const content = request.body
    const name = content.name ;
    const number =content.number;
    const id = generateId();
    if((name !== undefined) && (number !== undefined) && (person.find(n => n.name === name)) === undefined  ){
        const newPerson = {
            "id":id,
            "name": name,
            "number":number
            
        }
        
        person = person.concat(newPerson);
        response.json(newPerson)
    }else{
        if(name === undefined){
            response.send('name is missing');
        }
        else if(number === undefined){
            response.send('number is missing')
        }else{
            response.send('error : name must be unique')
        }
    }
    
})

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log('Server started at port 3001')
})