import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentList from "../child.js/StudentList";
import Form from "../child.js/Form";

export default function Parent() {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(-1);
  const [editIndex, setEditIndex] = useState(-1);
  const [buttonCaption, setButtonCaption] = useState("add");
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    marks: "",
  });
  const handleInputChange = (e) => {
    const name = e.target.name;
    setFormData({ ...formData, [name]: e.target.value });
  };
  useEffect(() => {
    const getStudents = async () => {
      try {
        console.log("get Student called");
        const response = await axios.get("http://localhost:4000/get-students");
        const data = response.data;
        console.log(data);
        setStudents(data);
      } catch (error) {
        console.log(error);
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert(error.message);
        }
      }
    };
    getStudents();
  }, []);
  //delete a student
  const handleDelete = async (id, index) => {
    console.log({ id, index });
    try {
      const response = await axios.delete(
        `http://localhost:4000/delete-student/${id}`
      );
      const updated = students.filter((item, ind) => ind != index);
      setStudents(updated);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert(error.mrssage);
      }
    }
  };
  //submit the form
  const submitHandeler = async (e) => {
    e.preventDefault();

    try {
      if (editId == -1) {
        //add data
        const response = await axios.post(
          "http://localhost:4000/add-student",
          formData
        );
        console.log("response data");
        console.log(response.data);
        const data = response.data;
        const updated = [...students, data];
        console.log("updated data");
        console.log(updated);
        setStudents(updated);

        setFormData({
          name: "",
          class: "",
          marks: "",
        });
      } else {
        // update data
        const response = await axios.put(
          `http://localhost:4000/edit-student/${editId}`,
          formData
        );
        const newData = { ...formData, id: editId };
        const updated = students;
        updated.splice(editIndex, 1, newData);
        console.log(updated);
        setStudents(updated);
        setEditId(-1);
        setEditIndex(-1);
        setButtonCaption("add");
        setFormData({ name: "", class: "", marks: "" });
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response);
        alert(error.response.data.error);
      } else {
        alert(error.message);
      }
    }
  };

  // uddate ui*******************
  const updateUi = ({ id, index }) => {
    console.log({ id, index });
    setFormData(students[index]);
    setEditIndex(index);
    setEditId(id);
    setButtonCaption("udate");
  };
  return (
    <div>
      <Form
        submitHandeler={submitHandeler}
        handleInputChange={handleInputChange}
        formData={formData}
        setFormData={setFormData}
        buttonCaption={buttonCaption}
      />
      <StudentList
        students={students}
        handleDelete={handleDelete}
        updateUi={updateUi}
      />
    </div>
  );
}
