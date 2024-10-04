import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Function to fetch employees from the server
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8070/hrtest/');
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error('Failed to fetch employees');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch employees when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Function to handle updating an employee
  const handleUpdate = (employee) => {
    navigate('/EmployeeForm', { state: { employee } });
  };

  // Function to handle deleting an employee
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:8070/hrtest/delete/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Employee deleted successfully!');
          setEmployees(employees.filter(employee => employee._id !== id));
        } else {
          console.error('Failed to delete employee. Status:', response.status);
          alert('Failed to delete employee');
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('An error occurred while deleting the employee.');
      }
    }
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter employees based on search query
  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#333' }}>Employee List</h1>
      
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          marginBottom: '20px',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          width: '300px'
        }}
      />
      
      <button
        onClick={() => navigate('/Employees')}
        style={{
          float: 'right',
          padding: '10px 15px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Add Employee
      </button>

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Employee ID</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>First Name</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Last Name</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>DOB</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Gender</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>NIC</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Contact</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Address</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr
              key={employee._id}
              style={{
                backgroundColor: searchQuery && 
                  Object.values(employee).some((value) => 
                    String(value).toLowerCase().includes(searchQuery.toLowerCase())
                  ) ? '#ffeb3b' : 'transparent'
              }}
            >
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{employee.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{employee.firstName}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{employee.lastName}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{employee.dob}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{employee.gender}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{employee.nic}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{employee.contact}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{employee.address}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>
                <button
                  onClick={() => handleUpdate(employee)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '8px'
                  }}
                >
                  Update
                </button>
                
                <button
                  onClick={() => handleDelete(employee._id)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
