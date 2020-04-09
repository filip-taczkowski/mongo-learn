const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if any arg is missing', () => {
    const employee0 = new Employee({});
    const employee1 = new Employee({ firstName: 'John', department: 'IT' });
    const employee2 = new Employee({ firstName: 'John', lastName: 'Doe' });
    const employee3 = new Employee({ lastName: 'Doe', department: 'IT' });

    const cases = [employee0, employee1, employee2, employee3];
    for (let employee of cases) {
      employee.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if any arg is not a string', () => {
    const employee1 = new Employee({
      firstName: 'John',
      lastName: [],
      department: 'IT'
    });
    const employee2 = new Employee({
      firstName: 'John',
      lastName: 'Doe',
      department: []
    });
    const employee3 = new Employee({
      firstName: {},
      lastName: 'Doe',
      department: 'IT'
    });

    const cases = [employee1, employee2, employee3];
    for (let employee of cases) {
      employee.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should not throw an error if data is correct', () => {
    const employee1 = new Employee({
      firstName: 'John',
      lastName: 'Doe',
      department: 'IT'
    });
    employee1.validate(err => {
      expect(err).to.not.exist;
    });
  });

  after(() => {
    mongoose.models = {};
  });
});