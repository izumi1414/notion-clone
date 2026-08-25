import { atom, useAtom } from 'jotai';
import { Note } from './note.entity';

const notesAtom = atom<Note[]>([]);

export const useNoteStore = () => {
  const [notes, setNotes] = useAtom(notesAtom);
  const getAll = () => notes;
  const getOne = (id: number) => notes.find((note) => note.id === id);
  const set = (newNotes: Note[]) => {
    setNotes((oldNotes) => {
      const combineNotes = [...oldNotes, ...newNotes];
      const uniqueNotes: { [key: number]: Note } = {};

      for (const note of combineNotes) {
        uniqueNotes[note.id] = note;
      }

      return Object.values(uniqueNotes);
    })
  }
  const deleteNote  = (id: number) => {
    const findchildren = (parentId : number): number[] => {
      const childrenIds = notes
        .filter((note) => note.parentId === parentId)
        .map((child) => child.id);
      return childrenIds.concat(
        ...childrenIds.map((childId) => findchildren(childId))
      )
    }
    const childrenIds = findchildren(id);
    setNotes((oldNotes) => 
      oldNotes.filter((note) => ![...childrenIds, id].includes(note.id))
    )
  }
  const clear = () => setNotes([]);
  return { getAll, getOne, set, delete: deleteNote, clear }
}
