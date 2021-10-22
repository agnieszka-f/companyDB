const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
    try{
      res.json(await Department.find());
    } catch(err){
        res.status(500).json({message: err});
    }
 };

exports.getRandom = async (req, res) => {
    try {
      const count = await Department.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Department.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

exports.getById = async (req, res) => {
    try{
      const findDepartment = await Department.findById(req.params.id);
      if(!findDepartment) res.status(404).json({message: 'Not found.....'});
      else res.json(findDepartment);
    } catch(err){
        res.status(500).json({message: err});
    }
  };

exports.createNewDepartment = async (req, res) => {
    try{
      const { name } = req.body;
      const newDepartment = new Department({name: name});
      await newDepartment.save();
      res.json({message: 'A new department has been created', newDepartment});
    } catch(err) {
      res.status(500).json({message: err});
    }
  };

exports.updateDepartment =  async (req, res) => {
    const { name } = req.body;
      
    try{
      const dep = await Department.findById(req.params.id);
      if(dep){
        await Department.updateOne({_id: req.params.id},{$set:{name: name}});
        res.json({message:'The department was updated', beforeUpdate: dep, afterUpdate: await Department.findById(req.params.id)});
       } else res.status(404).json({message: 'Not found....'});
      } catch(err){
        res.status(500).json({message: err});
     }
  };

  exports.removeDepartment = async (req, res) => {
    try{
      const dep = await Department.findById(req.params.id);
      if(dep){
        await Department.deleteOne({_id:req.params.id});
        res.json({message:'The department was removed', removedDepartment: dep});
      } else res.status(404).json({message:'Not found....'});
    } catch(err){
       res.status(500).json({message: err});
    }
  };