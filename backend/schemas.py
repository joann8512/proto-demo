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

class DescInput(BaseModel):
    id: str = ''
    title: str = ''
    bar: str = ''
    instr: str = ''
    rhythm: str = ''
    m_vel: str = ''
    m_dur: str = ''