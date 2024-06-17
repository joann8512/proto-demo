import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';
import axios from "axios";
import styles from './style.css';
import { PlayerUpdateFunctionContext } from "../../App";


export const BAR = {
    0: '(Default)', 1:'1', 2:'2', 3:'3', 4:'4', 5:'5', 6:'6', 7:'7', 8:'8'
};

export const POLYDENSE = {
    0: '(Default)', 1:'1', 2:'2', 3:'3', 4:'4', 5:'5', 6:'6', 7:'7', 8:'8'
};
export const RHYTHM = {
    0: '(Default)', 0:'0', 1:'1', 2:'2', 3:'3', 4:'4', 5:'5', 6:'6', 7:'7', 8:'8'
};
export const INSTR = {
    default:'(Default)', piano:'Bright Acoustic Piano', violin:'Violin', guitar:'Guitar', bass:'Bass', drum:'Drum'
};
export const M_VEL = {
    0:'(Default)', 16:'16', 32:'32', 48: '48', 64:'64', 80:'80', 96:'96', 112:'112', 128:'128'
};
export const M_DUR = {
    0:'(Default)', 16:'16', 32:'32', 48: '48', 64:'64', 80:'80', 96:'96', 112:'112', 128:'128'
};

type MusicInputState = {
    bar: int,
    poly: int,
    rhythm: int,
    instr: string,
    m_vel: int,
    m_dur: int,
    id: int
}

class Editor extends React.Component<MusicInputState> {
    state: MusicInputState = {
        bar: 0,
        poly: 0,
        rhythm: 0,
        instr: 'default',
        m_vel: 0,
        m_dur: 0,
        save: false,
        id: 0
    }
    
    handleSubmit = async (event) => {
        const API_URL = "http://localhost:8000";
		const result  = await axios.get(`${API_URL}/desc/`, {
			params: {
                filename: "4.mid"
            }
		}).catch(error => {
            if (error.response.status === 422) {
                console.error('Unprocessable Entity: ', error.response.data);
            }
        });
        this.setState({...this.state, id: result.data["id"]});
        var data = result.data["desc"]
        console.log('Current Bar: ', data[`Bar_${this.state.bar}`])
        const bar_data = data[`Bar_${this.state.bar}`]
        this.setState({
            ...this.state,
            instr: bar_data['Instrument'][0],
            rhythm: bar_data['Rhythm Intensity'][0],
            m_vel: bar_data['Mean Velocity'][0],
            m_dur: bar_data['Mean Duration'][0]
        });
        console.log('Loaded info bar: ', this.state)
    }

    handleUpdate = async (event) => {
        console.log('update: ',this.state.instr)
        const API_URL = "http://localhost:8000";
        console.log('bar: ', typeof(this.state.bar))
		await axios.put(`${API_URL}/update/${this.state.id}`, 
                {
                id: this.state.id,
                title: "4.mid",
                desc: {bar: this.state.bar,
                    instr: this.state.instr,
                    rhythm: this.state.rhythm,
                    m_vel: this.state.m_vel,
                    m_dur: this.state.m_dur}}
        ) //data error: not dict
		.catch(error => {
            if (error.response.status === 422) {
                console.error('Unprocessable Entity: ', error.response.data);
            }
        });
        this.setState({
            ...this.state,
            bar: 0,
            instr: 'default',
            rhythm: 0,
            m_vel: 0,
            m_dur: 0
        });
        console.log('Reset: ', this.state)
    }

    onChangeBar = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const bar = e.target.value;  //bar number selected
        this.setState({
            ...this.state,
            bar: bar,
        });
        this.handleSubmit()  //???
        console.log('onChangeBar: ', this.state)
    }

    onChangeInstr = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const instr = e.target.value;
        this.setState({
        ...this.state,
        instr: instr,
        });
        console.log('onChangeInstr: ', this.state)
    }

    onChangePoly = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const poly = e.target.value;
        this.setState({
        ...this.state,
        poly: poly,
        });
        console.log('onChangePoly: ', this.state)
    }

    onChangeRhyt = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const rhythm = e.target.value;
        this.setState({
        ...this.state,
        rhythm: rhythm,
        });
        console.log('onChangeRhyt: ', this.state)
    }

    onChangeVel = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const m_vel = e.target.value;
        this.setState({
        ...this.state,
        m_vel: m_vel,
        });
        console.log('onChangeVel: ', this.state)
    }

    onChangeDur = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const m_dur = e.target.value;
        this.setState({
        ...this.state,
        m_dur: m_dur,
        });
        console.log('onChangeDur: ', this.state)
    }

    

    render() {
        console.log('Editor: ', this.state)
        //const { open } = this.state;
        return(
            <PlayerUpdateFunctionContext.Consumer>
			{(context) => (
            <div className="panel">
                <div className="editor-container">
                    <div className="pallette-text">
                        <p>Editor Pallette</p>
                    </div>

                    <div className="dropdown">
                        <p>Bar: </p>
                        <select onChange={this.onChangeBar}
                            className="select-section" 
                            value={this.state.bar}>
                            {
                                Object.keys(BAR).map(key => (
                                    <option key={key} value={BAR[key]}>{BAR[key]}</option>
                                ))
                            }
                        </select>
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
                        <button className="regenerate-btn" 
                                onClick={(event) => this.handleUpdate()}>Save</button>
                    </div>
                    <div>
                        <button className="regenerate-btn">ReGenerate</button>
                    </div>
                    <div>
                        <button className="regenerate-btn">ReInstrument</button>
                    </div>
                </div>  
            </div>
            )}
			</PlayerUpdateFunctionContext.Consumer>
        )
    }
}

export default connect()(Editor);