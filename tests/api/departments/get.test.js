const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/departments', () => {

  before(async () => {

    try {
      const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
      await testDepOne.save();

      const testDepTwo = new Department({ _id: '5d9f1159f81ce8d1ef2bee48', name: 'Department #2' });
      await testDepTwo.save();  
    } catch (err) {
      console.log(err);
    }
    
  });

  after(async () => {

    try {
      await Department.deleteMany();
    } catch (err) {
      console.log(err);
    }
    
  });

  it('/ should return all departments', async () => {

    try {
      const res = await request(server).get('/api/departments');

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.equal(2);  
    } catch (err) {
      console.log(err);
    }

    
  });

  it('/:id should return one department by :id', async () => {

    try {
      const res = await request(server).get('/api/departments/5d9f1140f10a81216cfd4408');

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.not.be.null;    
    } catch (err) {
      console.log(err);
    }
  
  });

  it('/random should return one random department', async () => {

    try {
      const res = await request(server).get('/api/departments/random');

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.not.be.null;  
    } catch (err) {
      console.log(err);
    }
    
  });

});