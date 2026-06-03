const express = require('express');
const { createStudent, getAllStudents, getOneStudent, updateStudent, deleteStudent } = require('../Controllers/studentController')

const router = express.Router();

router.post('/students', createStudent);
router.get('/students', getAllStudents);
router.get('/students/:id', getOneStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

module.exports = router;



