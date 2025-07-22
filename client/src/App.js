import { useState, useContext } from "react";
import SubmitTicketPage from "./pages/SubmitTicketPage";
import AuthProvider, {AuthContext} from "./contexts/AuthContexts";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [activeTab, setActiveTab] = useState("open");
  const { user } = useContext(AuthContext);

  return (
  <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/submit" element={<SubmitTicketPage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* tabs  for authenticated users*/}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
            />
        </Routes>
      </div>
    </Router>
  );
}


export default App;