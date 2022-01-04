const { status } = require('express/lib/response');

const chai = require('chai'),
 expect = chai.expect,
 chaiHttp = require('chai-http')
 server = require('../');

chai.use(chaiHttp);

describe('Test get User API', () => {
  it('get User', (done) => {
    chai.request(server)
    .get('/getAllUser')
    .end((err,response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.all.keys('data'); // like status key 
      done();
    })
  })
});

