const request = require('supertest');
const app = require('../index'); // Adjust if your app is exported differently
const mongoose = require('mongoose');
const User = require('../models/User');
const Timer = require('../models/Timer');

let token;
let userId;

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect('mongodb://localhost:27017/f1_reaction_timer_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create a test user
  const user = new User({
    email: 'timeruser@example.com',
    password: 'password123',
    role: 1,
  });
  await user.save();
  userId = user._id;

  // Login to get token
  const res = await request(app)
    .post('/api/login')
    .send({
      email: 'timeruser@example.com',
      password: 'password123',
    });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Timer Endpoints', () => {
  it('should submit a reaction time', async () => {
    const res = await request(app)
      .post('/api/submit-reaction-time')
      .set('Authorization', `Bearer ${token}`)
      .send({
        time: 250,
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.timer.time).toBe(250);
  });

  it('should retrieve reaction times for the user', async () => {
    const res = await request(app)
      .get(`/api/get-reaction-times/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.count).toBeGreaterThanOrEqual(1);
    expect(res.body.timers[0]).toHaveProperty('time');
  });

  it('should not allow unauthorized access', async () => {
    const res = await request(app)
      .get(`/api/get-reaction-times/${userId}`);
    
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('Authorization token missing or malformed');
  });
});