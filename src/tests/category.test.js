const request = require('supertest');
const app = require('../app');

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

test("GET /categories debe traer todas las categories", async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /categories debe de crear una nueva categoria", async () => {
    const category = {
        name: 'fruits'
    };
    const res = await request(app).post('/categories').send(category).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(category.name);
});

test("DELETE /categories/:id debe eliminar una categoria", async () => {
    const res = await request(app).delete(`/categories/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});