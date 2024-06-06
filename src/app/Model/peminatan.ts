import { User } from '../model/user';

export interface Peminatan {
  id: Pick<Peminatan, 'id'>;
  nama: number;
  user: Pick<User, 'id'>;
  created: Date;
}
