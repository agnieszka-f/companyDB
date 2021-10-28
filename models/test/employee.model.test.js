const Employee = require('../employee.model.js');
const {expect} = require('chai');
const mongoose = require('mongoose');

describe('Employee', () => {

    it('should throw an error if no "firstName" arg', () => {
       
        const emp = new Employee({firstName: null, lastName: 'Doe', department: 'IT'});
          emp.validate( err => {
            expect(err.errors.firstName).to.exist;
          });
      });

    it('should throw an error if no "lastName" arg', () => {
       
        const emp = new Employee({firstName:'John', lastName: null, department: 'IT'});
          emp.validate( err => {
            expect(err.errors.lastName).to.exist;
          });
    });

    it('should throw an error if no "department" arg', () => {
       
        const emp = new Employee({firstName:'John', lastName: 'Doe', department: null});
          emp.validate( err => {
            expect(err.errors.department).to.exist;
          });
    });
    
    it('should throw an error if "firstName" is not a string', () => {
      const cases = [{firstName:[], lastName: 'Doe', department: 'IT'}, {firstName:{}, lastName: 'Doe', department: 'IT'}];  
      
      for(let employee of cases ){
        const emp = new Employee(employee);

        emp.validate( err => {
          expect(err.errors.firstName).to.exist;
        });
      } 
    });
    
    it('should throw an error if "lastName" is not a string', () => {
        const cases = [{firstName:'John', lastName: [], department: 'IT'}, {firstName:'John', lastName: {}, department: 'IT'}];  

        for(let employee of cases ){
            const emp = new Employee(employee);
    
            emp.validate( err => {
              expect(err.errors.lastName).to.exist;
            });
          }  
      });

      it('should throw an error if "department" is not a string', () => {
        const cases = [{firstName:'John', lastName: 'Doe', department: []}, {firstName:'John', lastName: 'Doe', department: {}}]; 

        for(let employee of cases ){
            const emp = new Employee(employee);
    
            emp.validate( err => {
              expect(err.errors.department).to.exist;
            });
          }  
      });

    it('should not throw an error if "firstName", "lastName" and "department" is ok', () => {
        const cases = [{firstName:'John', lastName: 'Doe', department: 'IT'}, {firstName:'Amanda', lastName: 'Doe', department: 'Testing'}];  

        for(let employee of cases ){
            const emp = new Employee(employee);
    
            emp.validate( err => {
              expect(err).to.equal(null);
            });
          }
    });

    afterEach(() => {
      mongoose.models = {};
    });
  });