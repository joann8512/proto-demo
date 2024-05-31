import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import styles from './style.css';

export const POLYDENSE = {
    1:'1', 2:'2', 3:'3', 4:'4', 5:'5', 6:'6', 7:'7', 8:'8'
};
export const RHYTHM = {
    1:'1', 2:'2', 3:'3', 4:'4', 5:'5', 6:'6', 7:'7', 8:'8'
};
export const INSTR = {
    piano:'Piano', violin:'Violin', guitar:'Guitar', bass:'Bass', drum:'Drum'
};
export const M_VEL = {
    1:'1', 2:'2', 3:'3', 4:'4', 5:'5', 6:'6', 7:'7', 8:'8'
};
export const M_DUR = {
    1:'1', 2:'2', 3:'3', 4:'4', 5:'5', 6:'6', 7:'7', 8:'8'
};

type MusicInputState = {
    poly: int,
    rhythm: int,
    instr: string,
    m_vel: int,
    m_dur: int
}

class Editor extends React.Component<MusicInputState> {
    state: MusicInputState = {
        poly: 8,
        rhythm: 8,
        instr: '',
        m_vel: 8,
        m_dur: 8
    }

    onChangeInstr = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const instr = e.target.value;
        this.setState({
        ...this.state,
        instr: instr,
        });
    }

    onChangePoly = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const poly = e.target.value;
        this.setState({
        ...this.state,
        poly: poly,
        });
    }

    onChangeRhyt = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const rhythm = e.target.value;
        this.setState({
        ...this.state,
        rhythm: rhythm,
        });
    }

    onChangeVel = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const m_vel = e.target.value;
        this.setState({
        ...this.state,
        m_vel: m_vel,
        });
    }

    onChangeDur = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const m_dur = e.target.value;
        this.setState({
        ...this.state,
        m_dur: m_dur,
        });
    }

    render() {
        console.log('log')
        const { open } = this.state;
        return(
            <div className="panel">
                <div className="editor-container">
                    <div className="pallette-text">
                        <p>Editor Pallette</p>
                    </div>

                    <div className="dropdown">
                        <p>Instrumentation: </p>
                        <select className="select-section" 
                            value={this.state.instr}
                            onChange={this.onChangeInstr}>
                            {
                                Object.keys(INSTR).map(key => (
                                    <option key={key} value={INSTR[key]}>{INSTR[key]}</option>
                                ))
                            }
                        </select>
                    </div>
                    
                    <div className="dropdown">
                        <p>Polyphonic Density: </p>
                        <select className="select-section" 
                            value={this.state.poly}
                            onChange={this.onChangePoly}>
                            {
                                Object.keys(POLYDENSE).map(key => (
                                    <option key={key} value={POLYDENSE[key]}>{POLYDENSE[key]}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="dropdown">
                        <p>Rhythmic Intensity: </p>
                        <select className="select-section" 
                            value={this.state.rhythm}
                            onChange={this.onChangeRhyt}>
                            {
                                Object.keys(RHYTHM).map(key => (
                                    <option key={key} value={RHYTHM[key]}>{RHYTHM[key]}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="dropdown">
                        <p>Mean Velocity: </p>
                        <select className="select-section" 
                            value={this.state.m_vel}
                            onChange={this.onChangeVel}>
                            {
                                Object.keys(M_VEL).map(key => (
                                    <option key={key} value={M_VEL[key]}>{M_VEL[key]}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="dropdown">
                        <p>Mean Duration: </p>
                        <select className="select-section" 
                            value={this.state.m_dur}
                            onChange={this.onChangeDur}>
                            {
                                Object.keys(M_DUR).map(key => (
                                    <option key={key} value={M_DUR[key]}>{M_DUR[key]}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="regenerate-section">
                    <div className="regenerate-text">
                        <p>Now... For something new?</p>
                    </div>
                    <div>
                        <button type="button">ReGenerate</button>
                    </div>
                    <div>
                        <button type="button">ReInstrument</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Editor);