import './App.css';
import "./Components/SIDEBAR/Sidebar.css";
import Ville from './Components/VILLE/Ville'
import Zone from './Components/ZONE/Zone'
import Serie from './Components/SERIE/Serie'
import Specialite from './Components/SPECIALITE/Specialite'
import Restaurant from './Components/RESTAURANT/Restaurant'
import Sidebar from './Components/SIDEBAR/Sidebar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <Router>
    <Sidebar >
    <Routes>
        <Route path="/" element={<Ville />} />
        <Route path="/zone" element={<Zone />} />  
        <Route path="/serie" element={<Serie/>} /> 
        <Route path="/specialite" element={<Specialite/>} />
        <Route path="/restaurant" element={<Restaurant/>} />
    </Routes>
  </Sidebar>
  </Router>
  )
}

export default App;
