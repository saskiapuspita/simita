import { User } from '../model/user';
import { MataKuliah } from '../model/mata-kuliah';

export interface NilaiMataKuliah {
  id: Pick<NilaiMataKuliah, 'id'>;
  nilai: string;
  mataKuliah: Pick<MataKuliah, 'id'>;
  user: Pick<User, 'id'>;
  created: Date;
}
