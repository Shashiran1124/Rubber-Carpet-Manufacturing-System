
import './App.css';
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();
  return (
    <div className='App'>
      <h1>Hii</h1>
      <button onClick={() => navigate('/DashReport')}>go</button>
    </div>
  );
}

export default App;
