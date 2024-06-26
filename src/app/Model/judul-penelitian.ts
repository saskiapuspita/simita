import { Peminatan } from "./peminatan";
import { User } from "./user";

export interface JudulPenelitian {
  id: number;
  namaJudulPenelitian: string;
  lokasiPenelitian: string;
  idDosenPembimbing: number;
  idPeminatan: Pick<Peminatan, 'id'>;
  user: Pick<User, 'id'>;
  created: Date;
}
