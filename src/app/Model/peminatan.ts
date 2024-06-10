import { User } from '../model/user';

export interface Peminatan {
  id: Pick<Peminatan, 'id'>;
  nama: string;
  user: Pick<User, 'id'>;
  created: Date;
}
