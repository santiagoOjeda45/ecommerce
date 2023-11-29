const request = require('supertest');
const app = require('../app');
require('../models');

let id;
let token;

beforeAll(async () => {
    const user = {
        email: 'test@gmail.com',
        password: 'test1234'
    };
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token; 
});

test("GET /cart debe traer todos los productos del carro", async () => {
    const res = await request(app).get('/cart').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /cart debe añadir un producto al carro", async () => {
    const cart = {
        quantity: 2
    };
    const res = await request(app).post('/cart').send(cart).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(cart.quantity);
});

test("PUT /cart/:id debe actualizar un producto de carro", async () => {
    const cart = {
        quantity: 3
    };
    const res = await request(app).put(`/cart/${id}`).send(cart).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(cart.quantity);
});

test("DELETE /cart/:id debe eliminar un producto del carro", async () => {
    const res = await request(app).delete(`/cart/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});