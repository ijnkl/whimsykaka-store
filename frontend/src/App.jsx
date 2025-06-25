import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage"
import ForgotPasswordPage from "./pages/ForgotPassword"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="auth" element={<AuthPage/>} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          
          {/* 其他路由 */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;