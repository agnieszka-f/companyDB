const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAll);

router.get('/departments/random', DepartmentController.getRandom);

router.get('/departments/:id', DepartmentController.getById);

router.post('/departments', DepartmentController.createNewDepartment);

router.put('/departments/:id', DepartmentController.updateDepartment);

router.delete('/departments/:id', DepartmentController.removeDepartment);

module.exports = router;
