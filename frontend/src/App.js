import { useNavigate } from 'react-router-dom';
import './App.css';


function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Human Resource Management</h1>
        <button className='employee-button' onClick={() => navigate('/employees')}>Add Employees</button>
      </header>
    </div>
  );
}

export default App;
