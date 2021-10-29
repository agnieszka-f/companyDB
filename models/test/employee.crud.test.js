const Employee = require('../employee.model.js');
const {expect} = require('chai');
const mongoose = require('mongoose');

describe('Employee', () => {

    before(async () => {

        try {
          await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
          console.error(err);
        }});


        describe('Reading data', () => {

            before(async () => {
                const emp1 = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT'});
                await emp1.save();

                const emp2 = new Employee({ firstName: 'Amanda', lastName: 'Biden', department: 'IT'});
                await emp2.save();
            });

            it('should return all the data with "find" method', async () => {
                const employees = await Employee.find();
                expect(employees.length).to.equal(2);
            });

            it('should return a proper document by "name" with "findOne" method', async () => {
                const findEmoployee = await Employee.findOne({firstName: 'John'});
                expect(findEmoployee).to.not.be.null;
                expect(findEmoployee.lastName).to.equal('Doe');
              });
            
            after(async () => {
                await Employee.deleteMany();
            });
          });
    
          describe('Creating data', () => {

            it('should insert new document with "insertOne" method', async () => {
                it('should insert new document with "insertOne" method', async () => {

                   const employee1 = new Employee({ firstName: 'Ewa', lastName: 'Kolec', department: 'Marketing'});
                   await employee1.save();
                   expect(employee1.isNew).to.be.false;

                   const employee2 = new Employee({ firstName: 'Iwona', lastName: 'Bąk', department: 'Marketing'});
                   await employee2.save();
                   expect(employee2.isNew).to.be.false;

                   const employees = await Employee.find();
                   expect(employees.length).to.equal(2);
                });
            });
            
            after(async () => {
                await Employee.deleteMany();
            });
          });

          describe('Updating data', () => {

            beforeEach(async () => {
                const emp1 = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT'});
                await emp1.save();

                const emp2 = new Employee({ firstName: 'Amanda', lastName: 'Biden', department: 'IT'});
                await emp2.save();
            });

            it('should properly update one document with "updateOne" method', async () => {
                await Employee.updateOne({ $and:[{firstName: 'John'}, {lastName: 'Doe'} ] }, { $set: {department: 'Testing' } });
                const updateEmp = await Employee.findOne({ $and:[{firstName: 'John'}, {lastName: 'Doe'} ] });

                expect(updateEmp).to.not.be.null;
                expect(updateEmp.department).to.be.equal('Testing');
            });
          
            it('should properly update one document with "save" method', async () => {
               const emp = await Employee.findOne({ $and:[{firstName: 'Amanda'}, {lastName: 'Biden'}] });
               emp.department = 'Marketing';
               await emp.save();

               const updatedEmp = await Employee.findOne({$and:[{firstName: 'Amanda'}, {lastName: 'Biden'}]});

               expect(updatedEmp.department).to.be.equal('Marketing');
            });
          
            it('should properly update multiple documents with "updateMany" method', async () => {
               await Employee.updateMany({ department: 'IT' }, { $set: {department: 'Information Technology' } });

               const updatedEmps = await Employee.find( {department: 'Information Technology' });

               expect(updatedEmps.length).to.be.equal(2);
            });
          
            afterEach(async () => {
                await Employee.deleteMany();
            });

          });

          describe('Removing data', () => {

            beforeEach(async () => {
                const emp1 = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT'});
                await emp1.save();

                const emp2 = new Employee({ firstName: 'Amanda', lastName: 'Biden', department: 'IT'});
                await emp2.save();
            });
              
            it('should properly remove one document with "deleteOne" method', async () => {
               await Employee.deleteOne({$and:[{firstName: 'Amanda'}, {lastName: 'Biden'}]});

               const emp = await Employee.findOne({$and:[{firstName: 'Amanda'}, {lastName: 'Biden'}]});

               expect(emp).to.be.null;
            });
          
            it('should properly remove one document with "remove" method', async () => {
                const emp = await Employee.findOne({$and:[{firstName: 'Amanda'}, {lastName: 'Biden'}]});
                await emp.remove();

                const findEmp = await Employee.findOne({$and:[{firstName: 'Amanda'}, {lastName: 'Biden'}]});
                expect(findEmp).to.be.null;
            });
          
            it('should properly remove multiple documents with "deleteMany" method', async () => {
               await Employee.deleteMany({ department:'IT'});

               const empIT = await Employee.find({ department:'IT' });

               expect(empIT.length).to.be.equal(0);
            });
          
            afterEach(async () => {
                await Employee.deleteMany();
            });

          });

    afterEach(() => {
        mongoose.models = {};
    });

});