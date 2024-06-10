import { MataKuliah } from './mata-kuliah';
import { Peminatan } from './peminatan';
import { User } from './user';

export interface NilaiPeminatanMahasiswa {
  id: Pick<NilaiPeminatanMahasiswa, 'id'>;
  idPeminatan: Pick<Peminatan, 'id'>;
  urutanMinat: number;
  namaPeminatan: string;
  idMatkul: Pick<MataKuliah, 'id'>;
  namaMatkul: string;
  nilai: string;
  user: Pick<User, 'id'>;
  created: Date;
}
