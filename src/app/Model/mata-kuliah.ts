import { User } from '../model/user';
import { Peminatan } from '../model/peminatan';

export interface MataKuliah {
  id: Pick<MataKuliah, 'id'>;
  nama: string;
  sks: string;
  minat: Pick<Peminatan, 'id'>;
  user: Pick<User, 'id'>;
  created: Date;
}
