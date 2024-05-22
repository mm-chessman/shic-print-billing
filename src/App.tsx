import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <AdminPanel />
      </div>
    </Router>
  );
};

export default App;
