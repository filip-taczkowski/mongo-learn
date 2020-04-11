const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/departments', () => {

  after(async () => {

    try {
      await Department.deleteMany();  
    } catch (err) {
      console.log(err);
    }
    
  });

  it('/ should insert new doc to db and return success', async () => {

    try {
      const res = await request(server).post('/api/departments').send({ name: 'Department 1' });
      const newDep = await Department.findOne({ name: 'Department 1' });

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(newDep).to.not.be.null;  
    } catch (err) {
      console.log(err);
    }
    
  });

});