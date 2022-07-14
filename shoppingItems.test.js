process.env.NODE_ENV='test'

const app = require('./app')
const request = require('supertest')

const DB = require('./fakeDb')

let item = {name: "clothes", price: 888}

beforeEach(() => {
    DB.push(item)
});
  
afterEach(() => {
    DB.length = 0
});

describe('test get', ()=>{
    test('get', async ()=>{
        const res = await request(app).get('/items')
        
        // console.log(res.body.shoppingListDb)
        expect(res.statusCode).toBe(200)
        expect(res.body.shoppingListDb).toEqual(DB)
    })
})

describe("GET /items/:name", () => {
    test("Get item by name", async () => {
      const res = await request(app).get(`/items/${item.name}`);
      expect(res.statusCode).toBe(200)
      console.log(res.body)
      expect(res.body).toEqual({ item: {name: "clothes", price: 888} })
    })
    test("Responds with 404 for invalid item", async () => {
      const res = await request(app).get(`/cats/criss`);
      expect(res.statusCode).toBe(404)
    })
  })


describe('test post', ()=>{
    test('tesing post', async ()=>{
        const res = await request(app).post('/items').send({name: "clothes", price: 888})
        console.log(res.statusCode)
        expect(res.statusCode).toBe(200)
        // toEqual must match whats is being returned by the post route...return res.json({added: req.body})
        expect(res.body).toEqual({added: {name: "clothes", price: 888}});
        expect(res.body.added.name).toEqual("clothes");
        expect(res.body.added).toHaveProperty("price");
        
    })

    test("Responds with 400 if name is missing", async () => {
        const res = await request(app).post("/items").send({});
        expect(res.statusCode).toBe(400);
      })
})


describe("/PATCH /items/:name", () => {
    test("Updating item", async () => {
      const res = await request(app).patch(`/items/${item.name}`).send({ name: "chesse", price:333 });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ item: { name: "chesse", price:333 } });
    })
  })


describe("/DELETE ", () => {
test("Deleting item", async () => {
    const res = await request(app).delete(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' })
})
})