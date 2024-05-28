import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Type from "../Home/Type";
import Particle from "../Particle";
import MidiPlay from "../MidiPlayer/MidiPlayer";
import MusicInput from "../MusicInput";
//import Piano from '../MidiPlayer/Piano';
import EventSystemProvider from '../utils/EventSystem';

function Demo() {
  return (
    <Container fluid className="project-section">
      <Container>
        
        <MusicInput />
        <MidiPlay />
        {/*<Piano />*/}
        <Particle />
      </Container>
    </Container>
  );
}

export default Demo;
