import { useParams } from 'react-router-dom';
import TitleInput from '../components/TitleInput';
import '../styles/pages/note-detail.css';
import { useEffect, useState } from 'react';
import { useNoteStore } from '../modules/notes/notes.state';
import { noteRepository } from '../modules/notes/note.repository';
import { BsFillSignDoNotEnterFill } from 'react-icons/bs';

export default function NoteDetail() {
  const params = useParams();
  const id = parseInt(params.id!);
  const [isLoading, setIsLoading] = useState(false);
  const noteStore = useNoteStore();
  const note = noteStore.getOne(id)

  useEffect(() => {
    fetchOne();
  }, [id])

  const fetchOne = async () => {
    setIsLoading(true);
    const note = await noteRepository.findOne(id);
    noteStore.set([note]);
    setIsLoading(false);
  }

  return (
    <div className="note-detail-container">
      <div className="note-detail-content">
        <TitleInput />
      </div>
    </div>
  );
}
