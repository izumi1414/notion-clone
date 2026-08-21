export class Note {
  id!: number;
  userId!: string;
  title?: string;
  content?: string | null;
  parentId?: number | null;
  createdAt!: Date;

  constructor(data: Note) {
    Object.assign(this, data);
    this.createdAt = new Date(data.createdAt);
  }
}
