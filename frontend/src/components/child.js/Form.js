import React, {useState} from 'react';

export default function Form({
  submitHandeler,
  handleInputChange,
  formData,
  buttonCaption,
}) {
  return (
    <div className="container">
      <h2>form</h2>
      <form onSubmit={e => submitHandeler (e)}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Class:</label>
          <input
            type="number"
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            className="form-control"
            required
            min={0}
          />
        </div>
        <div className="form-group">
          <label>Marks:</label>
          <input
            type="number"
            name="marks"
            value={formData.marks}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {buttonCaption} Student
        </button>
      </form>
    </div>
  );
}
