// tests/userController.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index'); // Remplacez par le chemin vers votre fichier de configuration d'application
const User = require('../src/models/User');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Controller', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: 'test@example.com', password: 'password123', role: 1 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });

  it('should not register a user with an existing email', async () => {
    await request(app)
      .post('/api/register')
      .send({ email: 'test@example.com', password: 'password123', role: 1 });

    const res = await request(app)
      .post('/api/register')
      .send({ email: 'test@example.com', password: 'password456', role: 0 });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Email already in use');
  });

  it('should login an existing user', async () => {
    await request(app)
      .post('/api/register')
      .send({ email: 'test@example.com', password: 'password123', role: 1 });

    const res = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Logged in successfully');
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });

  it('should not login with incorrect credentials', async () => {
    await request(app)
      .post('/api/register')
      .send({ email: 'test@example.com', password: 'password123', role: 1 });

    const res = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});
