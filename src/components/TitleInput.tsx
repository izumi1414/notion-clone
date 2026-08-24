import type { Note } from "../modules/notes/note.entity";
import { useState } from "react";

interface Props {
  initialData: Note
}

export default function TitleInput({initialData}: Props) {
  const [value, setValue] = useState(initialData.title ?? '無題');
  return (
    <div className='title-input-container'>
      <textarea className='title-input' value={value} onChange={() => {}} />
    </div>
  );
}
