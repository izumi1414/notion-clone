import type React from 'react';
import { noteRepository } from '../../modules/notes/note.repository';
import { useNoteStore } from '../../modules/notes/notes.state';
import NoteItem from './NoteItem';
import type { Note } from '../../modules/notes/note.entity';

interface Props {
  layer?: number;
  parentId?: number;
}

export default function NoteList({layer = 0, parentId}: Props) {
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();

  const createChild = async (e: React.MouseEvent, parentId: number) => {
    e.preventDefault();
    const newNote = await noteRepository.create({ parentId });
    console.log(newNote);
    noteStore.set([newNote]);
  }

  const fetchChildren = async (e: React.MouseEvent, note: Note) => {
    e.preventDefault();
    const children = await noteRepository.find({ parentId: note.id });
    if (children === null) return;
    console.log(children);
    noteStore.set(children);
  }

  return (
    <>
      {notes.filter((note) => note.id === parentId).map((note) => (
        <div key={note.id}>
        <NoteItem
          note={note}
          onCreate={(e) => createChild(e, note.id)}
          onExpand={(e) => fetchChildren(e, note)} />
        <NoteList layer={layer + 1} parentId={note.id}/>
        </div>
      ))}
    </>
  );
}
