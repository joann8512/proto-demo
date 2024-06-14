import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import FileDropzone from './fileDropzone';
import styles from './style.css';
import Midi from '../../data/midi';
import { validURL } from '../../utils/tools';
import { changeMidi, changeMusicXml } from './action';
import { PlayerUpdateFunctionContext } from "../../App";

export const FILE_FORMATS = {
	musicXml: 'MusicXML',
	midi: 'Midi'
};
export const FILE_EXTENSIONS = ['.mxl', '.musicxml', '.mid'];

//export const setUpload = useContext(PlayerUpdateFunctionContext);

type MusicInputProps = {
	dispatch: (a: *) => *
}

type MusicInputState = {
	midiJson: string,
	inputType: string,
	inputUrl: string,
	fileName: string,
	midiData: string,
	isFileSubmit: Boolean,
}

class MusicInput extends React.Component<MusicInputProps, MusicInputState> {
	state: MusicInputState = {
		midiJson: '',
		inputType: FILE_FORMATS.musicXml,
		inputUrl: '',
		fileName: '',
		midiData: '',
		isFileSubmit: false,
	}

	midi: Midi = null;

	componentDidMount() {
	}

	onLoadMidi = (inputContent: string | ArrayBuffer) => {
		this.setState({
			...this.state,
			midiJson: JSON.stringify(this.midi, undefined, 2),
			file: inputContent
		});

		this.props.dispatch(changeMidi(this.midi));
	}

	onChangeInputType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const inputType = e.target.value;
		this.setState({
			...this.state,
			inputType: inputType,
		});
	}

	onInputUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
		const url = e.target.value;
		const valid = url && validURL(url);
		console.log('on input')
		
		this.setState({
			...this.state,
			inputUrl: url,
			midiJson: valid ? "Parsing music file..." : '',
		});

		if (!valid) {
			this.props.dispatch(changeMidi(null));
			this.props.dispatch(changeMusicXml(null));
			return;
		}

		this.midi = new Midi();
		if (this.state.inputType === FILE_FORMATS.midi) {
			this.midi.loadMidi(url).then(this.onLoadMidi);
			this.props.dispatch(changeMusicXml(null));
		} else {
			this.midi.loadMusicXml(url).then(this.onLoadMidi);
			this.props.dispatch(changeMusicXml(url));
		}
	}

	onDropFile = (fileName: string, fileContent: ArrayBuffer) => {
		this.setState({
			...this.state,
			fileName: fileName,
			midiJson: "Parsing music file...",
			file: this.fileContent
		});
		this.midi = new Midi();
		if (fileName.endsWith(".mid")) {
			this.midi.loadMidi(fileContent).then(this.onLoadMidi).then(this.handleSubmit);
			this.props.dispatch(changeMusicXml(null));
		} else {
			const strContent = String.fromCharCode.apply(null, new Uint8Array(fileContent));
			this.midi.loadMusicXml(strContent).then(this.onLoadMidi);
			this.props.dispatch(changeMusicXml(strContent));
		}
	}

	handleSubmit = async (event) => {
		//event.preventDefault();
		this.setState({
			...this.state,
			isFileSubmit: true,
		});
		const blob = new Blob([this.fileContent], { type: 'audio/midi' });
      	const file = new File([blob], this.state.fileName, { type: 'audio/midi' });
		const formData = new FormData();
    	formData.append('file', file);

		const API_URL = "http://localhost:8000";
		const { data } = await axios.post(`${API_URL}/`, {
			title: this.state.fileName,
			midi_body: this.state.midiJson,
		});
		const headers={'Content-Type': file.type};
		const new_file = await axios.post(`${API_URL}/uploadfile/`, formData, headers);
		console.log('new_table: ', new_file.data)
		const update_file = fetch(`/from_back/Honestly/Honestly_Piano_12.midi`).then(response => {
			console.log(response.url)
			this.midi = new Midi();
			this.midi.loadMidi(response.url).then(this.onLoadMidi);
		});
		console.log(update_file instanceof File)
		
		this.setState({
			...this.state,
			fileName: "",
			midiJson: "",
			isFileSubmit: false,
		});
		console.log('ending: ', this.state)
	}

	render() {
		return (
			<PlayerUpdateFunctionContext.Consumer>
			{(context) => (
			<div>
				<form className="url-form">
					<select className="url-type-select" 
									value={this.state.inputType}
									onChange={this.onChangeInputType}>
						{
							Object.keys(FILE_FORMATS).map(key => (
								<option key={key} value={FILE_FORMATS[key]}>{FILE_FORMATS[key]}</option>
							))
						}
					</select>
					<input className="url-input"
								type="text" 
								placeholder="input music file's url here..."
								value={this.state.inputUrl}
								onChange={this.onInputUrl} />
				</form>
				<div className="dropBox">
					<form onSubmit={(event) => this.handleSubmit(this.onDropFile)} className="dropzone">
						<FileDropzone fileFilters={FILE_EXTENSIONS} onDropFile={this.onDropFile}/>
					</form>   
				</div>            
				
				{/*<textarea className="midi-json-area" 
							placeholder="json output..." 
							value={this.state.midiJson} 
							readOnly />*/}
			</div>
			)}
			</PlayerUpdateFunctionContext.Consumer>
		);
	}
}

export default connect()(MusicInput);