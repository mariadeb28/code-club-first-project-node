/* Query params => meusite.com/users?name=maria&age=30 // filtros
Route params => /users/2 
*/


/*const express = require('express')
const port = 30000
const app = express()

app.get('/users', (request,response) =>{
    console.log(request.query)
    const {name, age} = request.query
    return response.json({name,age})
})

app.listen(port,()=>{
    console.log(`Server started on port ${port} 💙`)
})
*/

/*const express = require('express')
const port = 30000
const app = express()

app.get('/users/:id', (request,response) =>{
    const {id} = request.params
    console.log(id)
    return response.json({id})
})

app.listen(port,()=>{
    console.log(`Server started on port ${port} 💙`)
})
*/

/*const express = require('express')
const port = 30000
const app = express()
app.use(express.json())

app.get('/users/', (request,response) =>{
    const {name, age} = request.body
    
    return response.json({name, age})
})

app.listen(port,()=>{
    console.log(`Server started on port ${port} 💙`)
})
*/

/* First project Node*/

const users =[]
const express = require('express')
const uuid = require('uuid')
const port = 30000
const app = express()
app.use(express.json())

const checkUserId = (request,response,next) =>{
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0 ){
        return response.status(404).json({mensagem: 'not found'})
    }

    request.userIndex = index
    request.userId = id
    next()

}

app.get('/users/', (request,response) =>{
    
    return response.json(users)
})

app.post('/users/', (request,response)=>{
    const {name, age} = request.body

    

    const user = {id:uuid.v4(), name,age}

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id',checkUserId, (request,response)=>{
    
    const {name,age} = request.body
    const index = request.userIndex
    const id = request.userID

    const updatedUser = {id, name, age}

    users[index] = updatedUser

    return response.json(updatedUser)

})

app.delete('/users/:id',checkUserId, (request,response)=>{
    const index = request.userIndex

    
    users.splice(index,1)

    return response.status(204).json()

})



app.listen(port,()=>{
    console.log(`Server started on port ${port} 💙`)
})


