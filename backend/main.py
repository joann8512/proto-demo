import uvicorn
import os

from fastapi import FastAPI, File, UploadFile
import fastapi.security as Security
from fastapi import HTTPException

import sqlalchemy.orm as _orm
from sqlalchemy.orm.exc import UnmappedInstanceError
from fastapi.middleware.cors import CORSMiddleware

from model.database import DBSession
from model import models
from schemas import MidiInput

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
    return {"info": f"file '{file.filename}' saved at '{file_location}'"}

@app.put("/")
def update_midi(midi_id: int, updated_midi: MidiInput):
    if len(updated_midi.title) == 0 and len(updated_midi.midi_body) == 0:
        raise HTTPException(status_code=400, detail={
            "status": "Error 400 - Bad Request",
            "msg": "The note's `title` and `note_body` can't be both empty"
        })
    db = DBSession()
    try:
        midi = db.query(models.Midi).filter(models.Midi.id == midi_id).first()
        midi.title = updated_midi.title
        midi.midi_body = updated_midi.midi_body
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
