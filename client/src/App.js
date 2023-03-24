import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import DashboardPage from './views/DashboardPage';
import CreateStorePage from './views/CreateStorePage';
import UpdateStorePage from './views/UpdateStorePage';
import DetailsPage from './views/DetailsPage';


function App() {
  return (
    <div className='container mt-5'>
      <h1> Store Finder</h1>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/store/add" element={<CreateStorePage />} />
        <Route path="/store/edit/:id" element={<UpdateStorePage />} />
        <Route path="/store/:id" element={<DetailsPage />} />
      </Routes>

    </div>
  );
}

export default App;
