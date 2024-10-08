const request = require('supertest');
const app = require('../index'); // Adjust if your app is exported differently
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect('mongodb://localhost:27017/f1_reaction_timer_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('User Registration and Login', () => {
  const userData = {
    email: 'testuser@example.com',
    password: 'password123',
    role: 1,
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send(userData);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(userData.email);
  });

  it('should not register a user with existing email', async () => {
    const res = await request(app)
      .post('/api/register')
      .send(userData);
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Email already in use');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: userData.email,
        password: userData.password,
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(userData.email);
  });

  it('should not login with incorrect password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: userData.email,
        password: 'wrongpassword',
      });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Invalid credentials');
  });
});