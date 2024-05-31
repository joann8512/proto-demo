from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Midi(Base):

    __tablename__ = "midi"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    midi_body = Column(JSON)

    def __repr__(self):
        return f'Midi(id={self.id}, title={self.title}, midi_body={self.midi_body})'