const Product = require('../product.model.js');
const {expect} = require('chai');
const mongoose = require('mongoose');

describe('Product', () => {

    it('should throw an error if no "name" arg', () => {
      const prod = new Product({client:'test'});

      prod.validate( err => {
        expect(err.errors.name).to.exist;
      });
    });

    it('should throw an error if no "client" arg', () => {
        const prod = new Product({name:'test'});
  
        prod.validate( err => {
          expect(err.errors.client).to.exist;
        });
      });

    it('should throw an error if "name" is not a string', () => {
      const cases = [{name:[], client: 'test'},{name:{}, client: 'test'}];  
      for(let product of cases ){
        const prod = new Product(product);

        prod.validate( err => {
          expect(err.errors.name).to.exist;
        });
      } 
    });

    it('should throw an error if "client" is not a string', () => {
        const cases = [{name:'test', client: []},{name:'test', client: {}}];  
        for(let product of cases ){
          const prod = new Product(product);
  
          prod.validate( err => {
            expect(err.errors.client).to.exist;
          });
        } 
      });
    
    it('should not throw an error if "name" and "client" is ok', () => {
      const cases = [{name:'New Wave Festival', client:'John Doe'},{name:'ImRich Banking official website', client:'Amanda Doe'}];  
      for(let product of cases ){
        const dept = new Product(product);

        dept.validate( err => {
          expect(err).to.equal(null);
        });
      } 
    });

    afterEach(() => {
      mongoose.models = {};
    });
  });