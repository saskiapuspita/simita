import { MataKuliah } from './mata-kuliah';
import { Peminatan } from './peminatan';
import { User } from './user';

export interface NilaiPeminatanMahasiswa {
  id: Pick<NilaiPeminatanMahasiswa, 'id'>;
  idPeminatan: Pick<Peminatan, 'id'>;
  urutanMinat: number;
  namaPeminatan: string;
  namaMatkul: string;
  idMatkul1: Pick<MataKuliah, 'id'>;
  nilaiMatkul1: string;
  idMatkul2: Pick<MataKuliah, 'id'>;
  nilaiMatkul2: string;
  idMatkul3: Pick<MataKuliah, 'id'>;
  nilaiMatkul3: string;
  idMatkul4: Pick<MataKuliah, 'id'>;
  nilaiMatkul4: string;
  idMatkul5: Pick<MataKuliah, 'id'>;
  nilaiMatkul5: string;
  isFinalSubmit: boolean;
  user: Pick<User, 'id'>;
  created: Date;
}
