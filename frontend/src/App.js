import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import TestComponent from './components/TestComponent';

function App() {
  return (
    <Router>
      <Route path = "/" exact component = {TestComponent}/>
      </Router>
  );
}

export default App;
