import Item from './Item';
import NoteList from '../NoteList';
import UserItem from './UserItem';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { useNoteStore } from '../../modules/notes/notes.state';
import { noteRepository } from '../../modules/notes/note.repository';

export default function SideBar() {
  const noteStore = useNoteStore();

  const createNote = async () => {
    try {
      const newNote = await noteRepository.create({});
      noteStore.set([newNote]);
    } catch (error) {
      console.error(error);
      alert('ノートの作成に失敗しました');
    }
  }

  return (
    <>
      <aside className='sidebar'>
        <div>
          <div>
            <UserItem />
            <Item
              label='検索'
              icon={FiSearch}
              onClick={() => {}}
            />
          </div>
          <div className='sidebar-spacer'>
            <NoteList />
            <Item label='ノートを作成' icon={FiPlus} onClick={createNote} />
          </div>
        </div>
      </aside>
      <div className='sidebar-placeholder'></div>
    </>
  );
}
