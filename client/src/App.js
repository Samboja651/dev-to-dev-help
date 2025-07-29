import SubmitTicketPage from "./pages/SubmitTicketPage";
import AuthProvider, { AuthContext } from "./contexts/AuthContexts";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import { useContext } from 'react';

function HomeRoute() {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <LandingPage />;
}

function App() {
  // const [activeTab, setActiveTab] = useState("open");
  // const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/submit" element={<SubmitTicketPage />}></Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              
              {/* tabs  for authenticated users*/}
              {/* <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
                /> */}
            </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;