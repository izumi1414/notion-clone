import type React from 'react';
import { noteRepository } from '../../modules/notes/note.repository';
import { useNoteStore } from '../../modules/notes/notes.state';
import NoteItem from './NoteItem';
import type { Note } from '../../modules/notes/note.entity';
import { useState } from 'react';

interface Props {
  layer?: number;
  parentId?: number;
}

export default function NoteList({layer = 0, parentId}: Props) {
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();
  const [expanded, setExpanded] = useState<Map<number, boolean>>(new Map());

  const createChild = async (e: React.MouseEvent, parentId: number) => {
    e.preventDefault();
    const newNote = await noteRepository.create({ parentId });
    console.log(newNote);
    noteStore.set([newNote]);
    setExpanded((prev) => {
      const newExpanded = new Map(prev);
      newExpanded.set(parentId, true);
      return newExpanded;
    })
  }

  const fetchChildren = async (e: React.MouseEvent, note: Note) => {
    e.preventDefault();
    const children = await noteRepository.find({ parentId: note.id });
    if (children === null) return;
    console.log(children);
    noteStore.set(children);
    setExpanded((prev) => {
      const newExpanded = new Map(prev);
      newExpanded.set(note.id, !prev.get(note.id));
      return newExpanded;
    })
  }

  return (
    <>
      {notes
        .filter((note) => note.parentId == parentId)
        .map((note) => (
          <div key={note.id}>
          <NoteItem
            note={note}
            onCreate={(e) => createChild(e, note.id)}
            onExpand={(e) => fetchChildren(e, note)}
            layer={layer}
            expanded={expanded.get(note.id)}/>
          {expanded.get(note.id) && (
            <NoteList layer={layer + 1} parentId={note.id}/>
          )}
          </div>
      ))}
    </>
  );
}
