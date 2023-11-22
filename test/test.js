const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust the path based on your project structure

chai.use(chaiHttp);
const expect = chai.expect;

describe('Simple Node.js Web App', () => {
  it('should return HTML content on the root route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.headers['content-type']).to.include('text/html; charset=');
        expect(res.text).to.include('Hello, World! This is a simple Node.js web app.');
        done();
      });
  });
});
