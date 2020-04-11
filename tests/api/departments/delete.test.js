const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {

  before(async () => {

    try {
      const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
      await testDepOne.save();  
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

  it('/:id should delete data by :id ', async () => {

    try {
      const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
      const removedDep = await Department.findOne({ _id: '5d9f1140f10a81216cfd4408' });

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(removedDep).to.be.null;  
    } catch (err) {
      console.log(err);
    }
    
  });

});