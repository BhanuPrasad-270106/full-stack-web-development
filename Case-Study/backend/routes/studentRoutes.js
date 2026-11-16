const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

/**
 * Route definitions for /api/students
 */

// @route   GET /api/students       - Get all students
// @route   POST /api/students      - Add a new student
router.route('/')
  .get(getAllStudents)
  .post(createStudent);

// @route   GET /api/students/:id    - Get a single student by ID
// @route   PUT /api/students/:id    - Update a student by ID
// @route   DELETE /api/students/:id - Delete a student by ID
router.route('/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;
