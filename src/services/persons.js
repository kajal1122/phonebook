import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';
const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data);
    
}


const create = (newPersonObject) =>{
    const request = axios.post(baseUrl, newPersonObject)
    return request.then(response => response.data);
}

const update = (id, updatedNumber) =>{
    const request = axios.put(`${baseUrl}/${id}`, updatedNumber);
    return request.then(response => response.data);
}

const deletePerson = (id) =>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => console.log(response.data));
}

export default {getAll, create, update, deletePerson};