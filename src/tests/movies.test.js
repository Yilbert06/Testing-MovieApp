const supertest = require("supertest")
const app = require("../app");
const Genre = require("../models/Genre");
const Director = require("../models/Director");
const Actor = require("../models/Actor");
require('../models')

const URL = '/api/v1/movies'
let movieId;


test("GET -> URL should return status code 200",async()=>{
    const res = await supertest(app).get(URL)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(0)
})

test("POST -> URL should return", async()=>{
    const movie={
        name:"fuga",
        image:"foto1",
        synopsis:" lorem4",
        releaseYear:"2010",
    }
    const res = await supertest(app)
    .post(`${URL}`)
    .send(movie)

    movieId= res.body.id

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(movie.name)
})

test("GET ONE -> '/api/v1/movies/:id' should return status code 200",async()=>{
    const res = await supertest(app).get(`/api/v1/movies/${movieId}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe("fuga")
})


test("PUT -> URL/:id should return code 200 and res.body.firstname === actor.firsName", async()=>{
    const movie ={
        name: "Up"
    }
    const res = await supertest(app)
    .put(`/api/v1/movies/${movieId}`)
    .send(movie)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movie.name)
})

test("POST -> URL should return", async()=>{
    const actorBody={
        firstName:"denzel",
        lastName:"washinton",
        nationality:"american",
        image:"https://es.wikipedia.org/wiki/Archivo:Denzel_Washington_2018.jpg",
        birthday:"2021/10/10"
    }

    const actor = await Actor.create(actorBody)

    const res = await supertest(app)
    .post(`${URL}/${movieId}/actors`)
    .send([actor.id])

    console.log(res.body);

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await actor.destroy()
})

test("POST -> URL should return", async()=>{
    const directorBody={
    firstName: "Steven",
    lastName: "Spielberg",
    nationality: "american",
    image:"data:image/jpeg;base64,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",
    birthday: "1946/12/12",
    }

    const director = await Director.create(directorBody)

    const res = await supertest(app)
    .post(`${URL}/${movieId}/directors`)
    .send([director.id])

    console.log(res.body);

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await director.destroy()
})

test("POST -> URL should return", async()=>{
    const genreBody={
        name:"terror"
    }

    const genre = await Genre.create(genreBody)

    const res = await supertest(app)
    .post(`${URL}/${movieId}/genres`)
    .send([genre.id])

    console.log(res.body);

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await genre.destroy()
})


test("DELETE -> URL/id should return status code 204", async()=>{
    const res = await supertest(app)
    .delete(`${URL}/${movieId}`)

    expect(res.status).toBe(204)
})




