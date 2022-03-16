/* eslint-disable */
import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "../src/assets/css/style.css";
import Navbar from "./components/Navbar/Navbar";
import Accueil from "./pages/Accueil/Accueil";
import QSN from "./pages/QSN/QSN";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Offres from "./pages/Offres/Offres";
import FAQ from "./pages/FAQ/FAQ";
import RendezVous from "./pages/RendezVous/RendezVous";
import Assurence from "./pages/Assurence/Assurence";
import Consultations from "./pages/Consultations/Consultations";
import Contact from "./pages/Contact/Contact";
import Profile from "./pages/Profile/Profile";
import Medicament from "./pages/Medicament/Medicament";
import Call from "./pages/Call/Call";
import ToCall from "./pages/Call/ToCall";

function App() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const TokenReducer = useSelector((state) => state.TokenReducer);
  const location = useLocation();
 const [CallRender, setCallRender] = useState(true)


  useEffect(() => {
    return () => {
      dispatch({
        type: "SetSuccess",
        payload: "",
      });
   
    };
  }, [location]);

const  RefreshCall = () =>{
  setCallRender(false)
  setTimeout(() => {
    setCallRender(true)
  }, 500);
}

 
  return (
    <div className="container_app">
      <Navbar />
      <div className="route_app">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/tocall" element={<ToCall />} />
          <Route path="/call/:roomID" element={ <Call  />} />
          <Route path="/offres" element={<Offres />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/qui-sommes-nous" element={<QSN />} />
          <Route path="/rendez_vous" element={   TokenReducer ? <RendezVous /> : <Navigate to="/login" /> } />
          <Route path="/assurances" element={<Assurence />} />
          <Route path="/medicament" element={<Medicament />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={
            !TokenReducer ? <Login /> :  <Navigate to="/" />
          } />
           <Route path="/login/:user" element={
            !TokenReducer ? <Login /> :  <Navigate to="/" />
          } />
          <Route path="/register" element={
            !TokenReducer ? <Register /> :  <Navigate to="/" />
          } />

          <Route path="/compte" element={
            TokenReducer ? <Profile /> : <Navigate to="/login" />
          } />
          <Route path="/consultations" element={
            TokenReducer ? <Consultations /> : <Navigate to="/login" />
          } />
         

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      {/*       
      <Contact /> */}
      <Footer />
    </div>
  );
}

export default App;
