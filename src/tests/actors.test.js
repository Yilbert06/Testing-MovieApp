const supertest = require('supertest')
const app = require('../app')

const URL='/api/v1/actors'
let actorId;

test("GET -> '/api/v1/actors' should return a 200 status", async() =>{
    const res = await supertest(app).get(URL)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(0)
})

test("POST -> URL should return a 201 status", async()=> {
    const actor = {
        firstName:"denzel",
        lastName:"washinton",
        nationality:"american",
        image:"https://es.wikipedia.org/wiki/Archivo:Denzel_Washington_2018.jpg",
        birthday:"2021/10/10"
    }
    const res = await supertest(app)
    .post(URL)
    .send(actor)

    actorId=res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(actor.firstName)
})

test("GET ONE -> '/api/v1/actors/:id' should return status code 200",async()=>{
    const res = await supertest(app).get(`/api/v1/actors/${actorId}`)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("denzel")
})

test("PUT -> URL/:id should return code 200 and res.body.firstname === actor.firsName", async()=>{
    const actor ={
        firstName: "will"
    }
    const res = await supertest(app)
    .put(`/api/v1/actors/${actorId}`)
    .send(actor)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(actor.firstName)
})

test("DELETE -> URL/:id should return code 204",async()=>{
    const res= await  supertest(app)
    .delete(`/api/v1/actors/${actorId}`)

    expect(res.status).toBe(204)
})