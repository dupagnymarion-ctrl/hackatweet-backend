const request = require('supertest');
const app = require('./app');

// POST users/signup enregistre nouvel user
it('/POST users/signup', async () => {

    const res = await request(app).post('/users/signup').send({username:'Test',password:'Azerty12'});
    console.log(res.body)
    expect(res.body.result).toBe(true);
    expect(res.body.token.length).toEqual(32);

});

// POST users/signin connexion utilisateur ok
it('/POST users/signin', async () => {

    const res = await request(app).post('/users/signin').send({username:'Test',password:'Azerty12'});

    expect(res.body.result).toBe(true);
    expect(res.body.token.length).toEqual(32);

});

// POST signin avec les mauvaises infos
it('/POST users/signin with bad infos', async () => {

    let res = await request(app).post('/users/signin').send({username:'Test2',password:'Azerty12'});
    expect(res.body.result).toBe(false);

    res = await request(app).post('/users/signin').send({username:'Test',password:'Azert'});
    expect(res.body.result).toBe(false);

    res = await request(app).post('/users/signin').send({username:'Test'});
    expect(res.body.result).toBe(false);

});
