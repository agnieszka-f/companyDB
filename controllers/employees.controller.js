const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
    try{
      res.json(await Employee.find().populate('department'));
    } catch(err){
      res.status(500).json({message: err});
    }
  };

exports.getRandom =  async (req, res) => {
    try {
      const count = await Employee.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const emp = await Employee.findOne().skip(rand).populate('department');
      if(emp) res.json(emp);
      else res.status(404),json({message:'Not found....'});
    } catch(err) {
      res.status(500).json({message:err});
    }
  };

exports.getById = async (req, res) => {
    try{
      const emp = await Employee.findById(req.params.id).populate('department');
      if(emp) res.json(emp);
      else res.status(404).json({message:'Not found....'});
    } catch(err){
      res.status(500).json({message: err});
    }
  };

exports.createNewEmployee = async (req, res) => {
    const { firstName, lastName, department } = req.body;
    try{
      const newEmployee = new Employee({firstName:firstName, lastName:lastName, department:department});
      await newEmployee.save();
      res.json({message:'A new employee has been created', newEmployee: await Employee.findById(newEmployee._id).populate('department')});
    } catch(err) {
      res.status(500).json({message: err});
    }
  };

exports.updateEmployee = async (req, res) => {
    const { firstName, lastName, department } = req.body;
    try{
      const emp = await Employee.findById(req.params.id).populate('department');
      if(emp){
        await Employee.updateOne({_id: req.params.id}, {$set: {firstName:firstName, lastName:lastName, department:department}});
  
        res.json({message:'The employee was updated', beforeUpdate:emp, afterUpdate: await Employee.findById(req.params.id).populate('department')});
        
      } else res.status(404).json({message:'Not found....'});
    } catch(err){
      res.status(500).json({message: err});
    }
  };

exports.removeEmlopyee = async (req, res) => {
    try{
      const emp = await Employee.findById(req.params.id).populate('department');
      if(emp) {
        emp.remove();
        res.json({message:'The employee was removed', removedEmployee: emp});
      } else res.status(404).json({message:'Not found....'});
    } catch(err){
      res.status(500).json({message: err});
    }
  };