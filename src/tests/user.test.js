const request = require('supertest');
const app = require('../app');

let id;
let token;

test("POST /users debe crear un nuevo usuario", async () => {
    const user = {
        firstName: "Paul",
        lastName: "Smith",
        email: "paulSmth@gmail.com",
        password: "paul123",
        phone: "987654321"
    }
    const res = await request(app).post('/users').send(user);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
});

test('POST /users/login', async () => {
    const body = {
        email: "paulSmth@gmail.com",
        password: "paul123",
    };
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('POST /users/login debe retornar credenciales incorrectas', async () => {
    const body = {
        email: 'incorrect@gmail.com',
        password: 'incorrect1234',
    };
    const res = await request(app).post('/users/login').send(body);
    expect(res.status).toBe(401);
});

test("GET /users debe traer los usuarios", async () => { 
    const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200); 
    expect(res.body).toBeInstanceOf(Array); 
});

test("PUT /users/:id debe actualizar un usuario existente", async () => {
    const user = {
        firstName: "Aron"
    };
    const res = await request(app).put(`/users/${id}`).send(user).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
});

test("DELETE /users/:id debe eliminar un usuario", async () => {
    const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});

