const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {

    try {
      const fakeDB = new MongoMemoryServer();
  
      const uri = await fakeDB.getConnectionString();
  
      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    } catch(err) {
      console.log(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {

      try {
        const testOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'Management' });
        await testOne.save();

        const testTwo = new Employee({ firstName: 'Amelie', lastName: 'Tool', department: 'IT' });
        await testTwo.save();
      
      } catch(err) {
        console.log(err);
      }
    });

    it('should return all the data with "find" method', async () => {
      try {
        const employees = await Employee.find();
        const expectedLength = 2;
        expect(employees.length).to.be.equal(expectedLength);
      } catch(err) {
        console.log(err);
      }     
    });

    it('should return proper doc by various params with "findOne" method', async () => {
      try {
        const testOne = await Employee.findOne({ firstName: 'John' });
        const testTwo = await Employee.findOne({ lastName: 'Tool' });
        const testThree = await Employee.findOne({ department: 'IT' });

        const expectedName = 'John';
        const expectedSurname = 'Tool';
        const expectedDep = 'IT';

        expect(testOne.firstName).to.be.equal(expectedName);
        expect(testTwo.lastName).to.be.equal(expectedSurname);
        expect(testThree.department).to.be.equal(expectedDep);

      } catch(err) {
        console.log(err);
      }
    });

    after(async () => {

      try {
        await Employee.deleteMany();

      } catch(err) {
        console.log(err);
      }
    });
  });

  describe('Creating data', () => {

    it('should insert new doc with "insertOne" method', async () => {

      try {
        const newEmployee = new Employee({ firstName: 'Sven', lastName: 'Hentrus', department: 'IT' });
        await newEmployee.save();

        expect(newEmployee.isNew).to.be.false;

      } catch(err) {
        console.log(err);
      }
    });

    after(async () => {

      try {
        await Employee.deleteMany();

      } catch(err) {
        console.log(err);
      }
      
    });
  });

  describe('Updating data', () => {

    beforeEach(async () => {

      try {
        const newEmpOne = new Employee({ firstName: 'Phil', lastName: 'Throwson', department: 'Management' });
        await newEmpOne.save();

        const newEmpTwo = new Employee({ firstName: 'Matt', lastName: 'Erikson', department: 'Future' });
        await newEmpTwo.save();

      } catch(err) {
        console.log(err);
      }

    });

    afterEach(async () => {

      try {
        await Employee.deleteMany();

      } catch(err) {
        console.log(err);
      }
      
    });

    it('should properly update one doc with "updateOne" method', async () => {

      try {
        await Employee.updateOne({ firstName: 'Phil' }, { $set: { firstName: 'Jerry' } });
        const employee = await Employee.findOne({ firstName: 'Jerry' });

        expect(employee).to.not.be.null;

      } catch(err) {
        console.log(err);
      }
      
    });

    it('should properly update one doc with "save" method', async () => {

      try {
        const employee = await Employee.findOne({ firstName: 'Phil' });
        employee.firstName = 'Jerry';
        await employee.save();

        const updatedEmp = await Employee.findOne({ firstName: 'Jerry' });
        expect(updatedEmp).to.not.be.null;

      } catch(err) {
        console.log(err);
      }
      
    });

    it('should properly update many docs with "updateMany" method', async () => {

      try {
        await Employee.updateMany({}, { $set: { firstName: 'Lilly' } });
        const employees = await Employee.find();

        expect(employees[0].firstName).to.be.equal('Lilly');
        expect(employees[1].firstName).to.be.equal('Lilly');
      } catch(err) {
        console.log(err);
      }
      
    });
  });

  describe('Removing data', () => {

    beforeEach(async () => {

      try {
        const newEmpOne = new Employee({ firstName: 'Phil', lastName: 'Throwson', department: 'Management' });
        await newEmpOne.save();

        const newEmpTwo = new Employee({ firstName: 'Matt', lastName: 'Erkson', department: 'Future' });
        await newEmpTwo.save();

      } catch(err) {
        console.log(err);
      }

    });

    afterEach(async () => {

      try {
        await Employee.deleteMany();

      } catch(err) {
        console.log(err);
      }
      
    });

    it('should properly remove one doc with "deleteOne" method', async () => {

      try {
        await Employee.deleteOne({ firstName: 'Phil' });
        const removedEmp = await Employee.findOne({ firstName: 'Phil' });

        expect(removedEmp).to.be.null;

      } catch(err) {
        console.log(err);
      }
      
    });

    it('should properly remove one doc with "remove" method', async () => {

      try {
        const employee = await Employee.findOne({ firstName: 'Phil' });
        await employee.remove();
        const removedEmp = await Employee.findOne({ firstName: 'Phil' });

        expect(removedEmp).to.be.null;

      } catch(err) {
        console.log(err);
      }
      
    });

    it('should properly remove many docs with "deleteMany" method', async () => {
      try {
        await Employee.deleteMany();
        const employees = await Employee.find();
        expect(employees.length).to.be.equal(0);
      } catch(err) {
        console.log(err);
      }      
    });
  });

  after(() => {
    mongoose.models = {};
  });
});