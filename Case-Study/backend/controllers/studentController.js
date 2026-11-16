const Student = require('../models/Student');

/**
 * @desc    Get all students (with optional search and filter)
 * @route   GET /api/students
 * @access  Public
 */
const getAllStudents = async (req, res, next) => {
  try {
    const { search, department, status } = req.query;
    const filter = {};

    // Search by student name or roll number (case-insensitive regex)
    if (search) {
      const q = search.trim();
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { rollNumber: { $regex: q, $options: 'i' } }
      ];
    }

    // Filter by Department
    if (department && department !== 'All') {
      filter.department = department;
    }

    // Filter by Status
    if (status && status !== 'All') {
      filter.status = status;
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single student by ID
 * @route   GET /api/students/:id
 * @access  Public
 */
const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${req.params.id} not found.`
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a new student
 * @route   POST /api/students
 * @access  Public
 */
const createStudent = async (req, res, next) => {
  try {
    const { name, rollNumber, email, department, year, phone, status } = req.body;

    // Validate required fields
    if (!name || !rollNumber || !email || !department || !year || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, rollNumber, email, department, year, phone.'
      });
    }

    const formattedRoll = rollNumber.trim().toUpperCase();

    // Check for duplicate roll number
    const existing = await Student.findOne({ rollNumber: formattedRoll });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `A student with roll number "${formattedRoll}" already exists.`
      });
    }

    const newStudent = await Student.create({
      name: name.trim(),
      rollNumber: formattedRoll,
      email: email.trim().toLowerCase(),
      department,
      year,
      phone: phone.trim(),
      status: status || 'Active'
    });

    res.status(201).json({
      success: true,
      message: 'Student added successfully!',
      data: newStudent
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing student
 * @route   PUT /api/students/:id
 * @access  Public
 */
const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${req.params.id} not found.`
      });
    }

    // Check roll number uniqueness if changed
    if (req.body.rollNumber) {
      const formattedRoll = req.body.rollNumber.trim().toUpperCase();
      if (formattedRoll !== student.rollNumber) {
        const existing = await Student.findOne({ rollNumber: formattedRoll });
        if (existing) {
          return res.status(409).json({
            success: false,
            message: `Roll number "${formattedRoll}" is already assigned to another student.`
          });
        }
        req.body.rollNumber = formattedRoll;
      }
    }

    if (req.body.name) req.body.name = req.body.name.trim();
    if (req.body.email) req.body.email = req.body.email.trim().toLowerCase();
    if (req.body.phone) req.body.phone = req.body.phone.trim();

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Student updated successfully!',
      data: updatedStudent
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a student
 * @route   DELETE /api/students/:id
 * @access  Public
 */
const deleteStudent = async (req, res, next) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${req.params.id} not found.`
      });
    }

    res.status(200).json({
      success: true,
      message: `Student "${deletedStudent.name}" deleted successfully!`,
      data: deletedStudent
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
