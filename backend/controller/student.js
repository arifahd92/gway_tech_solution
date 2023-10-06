const Student = require ('../modal/student');

//m-get=>/get-students
const getAllStudent = async (req, res) => {
  console.log ('get allstudent controller');
  try {
    const students = await Student.findAll ();
    res.status (200).json (students);
  } catch (error) {
    res.status (500).json ({error: error.message});
  }
};
//m-get=>/student-detail/:studentId
const getStudentDetail = async (req, res) => {
  console.log ('getStudentDetail controller');
  try {
    const id = req.params.studentId;
    const student = await Student.findByPk (id);
    if (!student) {
      return res.status (404).json ({error: 'Student not found'});
    }
    res.send (student);
  } catch (error) {
    res.status (500).json ({error: error.message});
  }
};
//m-post=>/add-student
const addStudent = async (req, res) => {
  console.log ('add student controller');
  console.log (req.body);
  try {
    const existingStudent = await Student.findOne ({
      where: {
        name: req.body.name,
      },
    });

    if (existingStudent) {
      return res
        .status (400)
        .json ({error: 'Student with the same name already exists'});
    }
    const student = await Student.create (req.body);
    res.status (201).json (student);
  } catch (error) {
    res.status (400).json ({error: error.message});
  }
};
//m-put=>/edit-student/:studentId
const editStudent = async (req, res) => {
  console.log ('edit detail controller');
  try {
    const id = req.params.studentId;
    const student = await Student.findByPk (id);
    if (!student) {
      return res.status (404).json ({error: 'Student not found'});
    }
    await student.update (req.body);
    res.status (200).json (student);
  } catch (error) {
    res.status (400).json ({error: error.message});
  }
};
//m-delete=>/delete-student:studentId
const deleteStudent = async (req, res) => {
  try {
    const id = req.params.studentId;
    const student = await Student.findByPk (id);
    if (!student) {
      return res.status (404).json ({error: 'Student not found'});
    }
    await student.destroy ();
    res.status (204).send ();
  } catch (error) {
    res.status (500).json ({error: error.message});
  }
};
module.exports = {
  addStudent,
  editStudent,
  getStudentDetail,
  getAllStudent,
  deleteStudent,
};
