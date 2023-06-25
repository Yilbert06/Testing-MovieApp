const supertest = require("supertest")
const app = require("../app")

const URL ='/api/v1/genres'
let genreId;

test("GET -> URL should return status code 200",async()=>{
    const res= await supertest(app).get(URL)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(0)
})

test("POST -> URL should return status code 201", async() =>{
    const genre = {
        name:"Romance"
    }
    const res = await supertest(app)
    .post('/api/v1/genres')
    .send(genre)

    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(genre.name)
})

test("GET ONE -> URL/id should return status code 200", async() =>{
    const res = await supertest(app).get(`/api/v1/genres/${genreId}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe("Romance")
})

test("PUT -> URL/id should return status code 200", async() =>{
    const genre = {
        name:"Adventure"
    }
const res = await supertest(app)
.put(`/api/v1/genres/${genreId}`)
.send(genre)

expect(res.status).toBe(200)
expect(res.body.name).toBe("Adventure")
})

test("DELETE -> URL/id should return status code 204", async() =>{
    const res = await supertest(app)
    .delete(`/api/v1/genres/${genreId}`)

    expect(res.status).toBe(204)
})