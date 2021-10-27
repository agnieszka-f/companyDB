const Department = require('../department.model.js');
const {expect} = require('chai');
const mongoose = require('mongoose');

describe('Department', () => {

    it('should throw an error if no "name" arg', () => {
      const dept = new Department({});

      dept.validate( err => {
        expect(err.errors.name).to.exist;
      });
    });

    it('should throw an error if "name" is not a string', () => {
      const cases = [[], {}];  
      for(let name of cases ){
        const dept = new Department({name});

        dept.validate( err => {
          expect(err.errors.name).to.exist;
        });
      } 
    });

    it('should throw an error if "name" length is < 5 or > 20', () => {
      const cases = ['abc', 'abcfg Aabc fgabc fgabcf'];  
      for(let name of cases ){
        const dept = new Department({name});

        dept.validate( err => {
          expect(err.errors.name).to.exist;
        });
      } 
    });
    
    it('should not throw an error if "name" is ok', () => {
      const cases = ['Ala ma kota', 'Kot ma Ale'];  
      for(let name of cases ){
        const dept = new Department({name});

        dept.validate( err => {
          expect(err).to.equal(null);
        });
      } 
    });

    afterEach(() => {
      mongoose.models = {};
    });
  });