import { Note } from './note.entity';
import api from '../../lib/api';

export const noteRepository = {
  async create(params: { title?: string; parentId?: number }): Promise<Note> {
    const result = await api.post('/notes', {
      title: params.title,
      parentId: params.parentId
    })
    return new Note(result.data);
  }
}
