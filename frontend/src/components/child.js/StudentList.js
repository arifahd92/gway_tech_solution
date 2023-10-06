import React, { useState } from "react";

const StudentList = ({ students, handleDelete, updateUi }) => {
  return (
    <div className="container">
      <h2>Student List</h2>
      <table className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>id</th>
            <th>Name</th>
            <th>Class</th>
            <th>Marks</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 &&
            students.map((student, index) => (
              <tr key={student.id} className="text-center">
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.marks}</td>
                <td className="text-center">
                  <button
                    className="btn btn-outline-warning "
                    onClick={() => updateUi({ id: student.id, index })}
                  >
                    edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger "
                    onClick={() => handleDelete(student.id, index)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
