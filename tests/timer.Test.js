// tests/timerController.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index'); // Remplacez par le chemin vers votre fichier de configuration d'application
const Timer = require('../src/models/Timer');
const User = require('../src/models/User');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  // Créez un utilisateur pour les tests
  const user = new User({ email: 'test@example.com', password: 'password123', role: 1 });
  await user.save();
});

afterEach(async () => {
  // Nettoyez la base de données après chaque test
  await Timer.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Timer Controller', () => {
  let token;
  beforeEach(async () => {
    // Simuler un JWT pour les tests
    const user = await User.findOne({ email: 'test@example.com' });
    token = user.generateToken(); // Assurez-vous que la méthode generateToken est disponible
  });

  it('Reaction time submitted successfully', async () => {
    const res = await request(app)
      .post('/api/submit-reaction-time')
      .set('Authorization', `Bearer ${token}`)
      .send({ time: 123 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Reaction time submitted successfully');
    expect(res.body.timer).toHaveProperty('time', 123);
  });

  it('should not submit a negative reaction time', async () => {
    const res = await request(app)
      .post('/api/submit-reaction-time')
      .set('Authorization', `Bearer ${token}`)
      .send({ time: -5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toHaveProperty('time', 'Reaction time must be a non-negative number');
  });

  it('should retrieve reaction times for a user', async () => {
    const timer = new Timer({ user_id: user._id, time: 150 });
    await timer.save();

    const res = await request(app)
      .get(`/api/get-reaction-times/${user._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBe(1);
    expect(res.body.timers[0]).toHaveProperty('time', 150);
  });

  it('should return 403 if user tries to access another user’s data', async () => {
    const user2 = new User({ email: 'test2@example.com', password: 'password123', role: 1 });
    await user2.save();
    const token2 = user2.generateToken();

    const res = await request(app)
      .get(`/get-reaction-times/${user2._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('message', 'Forbidden: Access is denied');
  });
});
