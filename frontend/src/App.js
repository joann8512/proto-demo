//@flow
import React, { useState, useEffect, createContext } from 'react';
import axios from "axios";
import Preloader from "./components/Pre";
import EventSystemProvider from './utils/EventSystem';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Home from './Home/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const PlayerUpdateFunctionContext = createContext(null);

function App() {
  const [load, upadateLoad] = useState(true);
  const [midi, setMidi] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const getMidi = async () => {
      const API_URL = "http://localhost:8000";
      const { data } = await axios.get(`${API_URL}/demo`);
      setMidi(data);
    };
    getMidi();
  }, []);

  return (
    <Router>
      <PlayerUpdateFunctionContext.Provider value={setMidi}>
      <Preloader load={load} />
        <div className="App" id={load ? "no-scroll" : "scroll"}>
          <EventSystemProvider>
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            {/*<Home />*/}
            <Footer />
          </EventSystemProvider>
        </div>
      </PlayerUpdateFunctionContext.Provider>
    </Router>
  );
}

export default App;
