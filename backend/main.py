import uvicorn
import os
import subprocess
import json
import copy

from fastapi import FastAPI, File, UploadFile
import fastapi.security as Security
from fastapi import HTTPException

from sqlalchemy.orm.exc import UnmappedInstanceError
from fastapi.middleware.cors import CORSMiddleware
from model import txt_db

from model.database import DBSession
from model import models
from model.txt_db import txt_to_database
from schemas import MidiInput, DescInput

app = FastAPI()

origins = [
    "http://localhost:3000"  # front-end's domain name
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

UPLOAD_DIR = './uploaded_files'
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@app.get("/")
def read_files():
    db = DBSession()
    try:
        notes = db.query(models.Midi).all()
    finally:
        db.close()
    return notes

@app.get("/desc/")
def get_descriptions(filename: str):
    db = DBSession()
    try:
        get_midi = db.query(models.Midi).filter(models.Midi.title == filename).first()
    finally:
        db.close()
    return {"id": get_midi.id, "desc": get_midi.desc}

@app.post("/")
## Adding new midi input to database
def add_note(midi: MidiInput):
    db = DBSession()
    try:
        if len(midi.title) == 0 and len(midi.midi_body) == 0:
            raise HTTPException(
                status_code=400, detail={
                    "status": "Error 400 - Bad Request",
                    "msg": "Both 'title' and 'midi_body' are empty. These are optional attributes but at least one must be provided."
                })
        new_file = models.Midi(
            title=midi.title, midi_body=midi.midi_body
        )
        db.add(new_file)
        db.commit()
        db.refresh(new_file)
    finally:
        db.close()
    return new_file

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as buffer:
        buffer.write(await file.read())
    subprocess.call(['bash','./start.sh'])  # file_location
    desc_info = txt_to_database()

    db = DBSession()
    try:
        midi = db.query(models.Midi).filter(models.Midi.title == file.filename).first()
        fn, ext = os.path.splitext(file.filename)
        midi.init = os.path.join(fn+'_init', ext)
        midi.desc = desc_info
        db.commit()
        db.refresh(midi)
    finally:
        db.close()
    return midi.init

@app.put("/update/{row_id}/", response_model=MidiInput)
def update_midi(row_id: int, descIn: MidiInput):
    if descIn.desc['bar'] == 'default':
        raise HTTPException(status_code=400, detail={
            "status": "Error 400 - Bad Request",
            "msg": "The note's `title` and `note_body` can't be both empty"
        })
    db = DBSession()
    try:
        midi = db.query(models.Midi).filter(models.Midi.id==row_id).first()
        update = copy.deepcopy(midi.desc)
        update['Bar_{}'.format(descIn.desc['bar'])]['Instrument'] = descIn.desc['instr']
        update['Bar_{}'.format(descIn.desc['bar'])]['Rhythm Intensity'] = descIn.desc['rhythm']
        update['Bar_{}'.format(descIn.desc['bar'])]['Mean Velocity'] = [descIn.desc['m_vel']]
        update['Bar_{}'.format(descIn.desc['bar'])]['Mean Duration'] = descIn.desc['m_dur']
        midi.desc = update
        db.commit()
        db.refresh(midi)
    finally:
        db.close()
    return midi

@app.delete("/")
def delete_midi(midi_id: int):
    db = DBSession()
    try:
        midi = db.query(models.Midi).filter(models.Midi.id == midi_id).first()
        db.delete(midi)
        db.commit()
    except UnmappedInstanceError:
        raise HTTPException(status_code=400, detail={
            "status": "Error 400 - Bad Request",
            "msg": f"Note with `id`: `{midi_id}` doesn't exist."
        })
    finally:
        db.close()
    return {
        "status": "200",
        "msg": "Note deleted successfully"
    }
