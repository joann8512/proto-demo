import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import MidiPlayer from "../MidiPlayer/MidiPlayer";

function Home() {
  return (
    <section>
        <Particle />
        <MidiPlayer />
      <Home2 />
    </section>
  );
}

export default Home;
