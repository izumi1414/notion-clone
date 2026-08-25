import SideBar from './components/SideBar';
import SearchModal from './components/SearchModal';
import './styles/layout.css';
import { Navigate, Outlet } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from './modules/auth/current-user.state';
import { useNoteStore } from './modules/notes/notes.state';
import { useEffect, useState } from 'react';
import { noteRepository } from './modules/notes/note.repository';

export default function Layout() {
  const currentUser = useAtomValue(currentUserAtom);
  const [isLoading, setIsLoading] = useState(false);
  const noteStore = useNoteStore();
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [])

  const fetchNotes = async () => {
    setIsLoading(true);
    const notes = await noteRepository.find();
    console.log(notes);
    noteStore.set(notes);
    setIsLoading(false);
  }

  if (!currentUser) return <Navigate to="/signin" replace />
  return (
    <div className='layout-container'>
      {!isLoading && <SideBar onSearchButtonClick={() => setIsShowModal(true)}/>}
      <main className='layout-main'>
        <Outlet />
      </main>
      <SearchModal isOpen={isShowModal} onClose={() => setIsShowModal(false)}/>
    </div>
  );
}
