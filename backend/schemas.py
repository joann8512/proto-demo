import json
from pydantic import BaseModel

class MidiInput(BaseModel):
    title: str = ''
    midi_body: str = ''
    init: str = ''
