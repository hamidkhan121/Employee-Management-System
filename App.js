import React from 'react';
import { Data } from "./EmployData";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    setData(Data);
  }, []);

  const handleEdit = (id) => {
    const dt = data.find(item => item.id === id);
    if (dt) {
      setId(id);
      setFirstName(dt.firstName);
      setLastName(dt.lastName);
      setAge(dt.age);
      setUpdate(true);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const dt = data.filter(item => item.id !== id);
      setData(dt);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    let error = '';
    if (firstName === '') error += `First name is required. `;
    if (lastName === '') error += `Last name is required. `;
    if (age <= 0) error += `Age is required. `;

    if (error === '') {
      alert("Record Saved");
      const dt = [...data];

      if (update) {
        // Update existing data
        const updatedData = dt.map(item =>
          item.id === id ? { ...item, firstName, lastName, age } : item
        );
        setData(updatedData);
      } else {
        // Add new data
        const newObject = {
          id: dt.length > 0 ? dt[dt.length - 1].id + 1 : 1,
          firstName,
          lastName,
          age,
        };
        dt.push(newObject);
        setData(dt);
      }
      
      handleClear(); // Clear form after save
    } else {
      alert(`Error: ${error}`);
    }
  };

  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setAge('');
    setUpdate(false);
    setId(null); // Reset the ID when clearing
  };

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: "center", marginTop: "15px", marginBottom: "20px" }}></div>

      <label> First name
        <input type='text' placeholder='Enter First name'
          onChange={(e) => setFirstName(e.target.value)} value={firstName} />
      </label>

      <label> Last name
        <input type='text' placeholder='Enter your Last name'
          onChange={(e) => setLastName(e.target.value)} value={lastName} />
      </label>

      <label> Age
        <input type='text' placeholder='Enter your age'
          onChange={(e) => setAge(e.target.value)} value={age} />
      </label>

      {/* Buttons */}
      <button className="btn btn-danger" onClick={handleSave}>{update ? 'Update' : 'Save'}</button>
      <button className="btn btn-danger" onClick={handleClear}>Clear</button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>
                  &nbsp;
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default App;
