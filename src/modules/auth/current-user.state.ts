import { atom } from 'jotai';
import { User } from '../user/user.entity';

export const currentUserAtom = atom<User>();
