import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Type from "../Home/Type";
import Particle from "../Particle";
import MidiPlay from "../MidiPlayer/MidiPlayer";
import EventSystemProvider from '../utils/EventSystem';

function Demo() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Hi There!{" "}
          <span className="wave" role="img" aria-labelledby="wave">
            👋🏻
          </span>
        </h1>
        <div style={{ textAlign: "center" }}>
          <Type />
          <MidiPlay />
        </div>
        <p style={{ color: "white" }}>
          something something something something something...
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <p style={{ color: "white" }}>
            demo or something goes here...
          </p>
          
        </Row>
      </Container>
    </Container>
  );
}

export default Demo;
