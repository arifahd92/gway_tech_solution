const express = require ('express');
const {
  addStudent,
  getAllStudent,
  getStudentDetail,
  editStudent,
  deleteStudent,
} = require ('../controller/student');

const router = express.Router ();
router.get ('/get-students', getAllStudent);
router.post ('/add-student', addStudent);
router.get ('/student-detail/:studentId', getStudentDetail);
router.put ('/edit-student/:studentId', editStudent);
router.delete ('/delete-student/:studentId', deleteStudent);
module.exports = router;
