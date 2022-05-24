import { Route, Routes } from "react-router-dom";
import Account from "./components/Account";
import Home from "./components/Home";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { AuthContextProvider } from "./context/AuthContext";
import "./assets/css/main-theme.css";
import GamePages from "./components/GamePages";
import Footer from "./components/Footer";
import RPSPage from "./components/RPSpage";
import Playground from "./Playground";
import GameDetail from "./components/GameDetail/GameDetail";
import LandingPage from "./components/LandingPage/LandingPage";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/updateprofile' element={<UpdateProfile />} />
          <Route path='/games' element={<GamePages />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/account/:id'
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path='/playground' element={<Playground />} />
          <Route
            path='/rps'
            element={
              <ProtectedRoute>
                <RPSPage />
              </ProtectedRoute>
            }
          />
          <Route path='/game-detail' element={<GameDetail />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
