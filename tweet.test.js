const request = require('supertest');
const app = require('./app');

let token = null
let tweetsCount = 0

// POST users/signin connexion utilisateur ok
it('/POST users/signin', async () => {

    const res = await request(app).post('/users/signin').send({username:'Test',password:'Azerty12'});

    expect(res.body.result).toBe(true);
    expect(res.body.token.length).toEqual(32);
    token = res.body.token

});

// Get tous les tweets 
/*it('/GET All tweets', async () => {

    const res = await request(app).post('/tweet');
    expect(res.body.result).toBe(true);
    expect(res.body.tweets.length).toBeGreaterThan(0)
    tweetsCount = res.body.tweets.length
});*/


// POST nouveau tweet 
/*it('/POST tweet/add', async () => {

    const res = await request(app).post('/tweet/add').send({token:token, message:'nouveau message'});
    expect(res.body.result).toBe(true);

});*/

// Ajout d'un tweet
/*it('/POST add tweet', async () => {

    const res = await request(app).post('/tweet');
    expect(res.body.result).toBe(true);
    expect(res.body.tweets.length).toBe(tweetsCount+1)

});*/

