import json
from pydantic import BaseModel

class MidiInput(BaseModel):
    id: int
    title: str = ''
    midi_body: str = ''
    init: str = ''
    desc: dict = {}

    class Config:
        orm_mode = True
