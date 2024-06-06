import { Peminatan } from './peminatan';
import { User } from './user';

export interface PeminatanMahasiswa {
  id: Pick<PeminatanMahasiswa, 'id'>;
  ipk: number;
  pilihanPeminatan: Pick<Peminatan, 'id'>;
  user: Pick<User, 'id'>;
  created: Date;
}
