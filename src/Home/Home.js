import React from "react";
import { Container, Row, Col } from "react-bootstrap";
//import homeLogo from "../../Assets/home-main.svg";
import Particle from "../components/Particle";
import Type from "./Type";
import Midiplayer from '../features/midiplayer';
import Rythmboard from '../features/rythm';
import Keyboard from '../features/keyboard'
import Piano from '../features/piano';
import MusicSheet from '../features/musicSheet';
import MusicInput from '../features/musicInput';
import Editor from '../features/editor';

function Home() {
  return (
    <section>
        <h1 className="project-heading">
          Hi There!{" "}
          <span className="wave" role="img" aria-labelledby="wave">
            👋🏻
          </span>
        </h1>
        <Type />
        <MusicInput />
        {/*<Rythmboard />
        <Keyboard />
        <MusicSheet />*/}
        <Midiplayer />
        <Editor />
        <Particle /> {/*always at last*/}
        
    </section>
  );
}

export default Home;
