export interface Team {
  id: number;
  area: Area;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  founded: number;
  clubColors: string;
  venue: string;
  squad: Squad[];
  lastUpdated: Date;
}

export interface Area {
  id: number;
  name: string;
}

export interface Squad {
  id: number;
  name: string;
  position: Position | null;
  dateOfBirth: Date;
  countryOfBirth: string;
  nationality: string;
  role: Role;
}

export enum Position {
  Attacker = 'Attacker',
  Defender = 'Defender',
  Goalkeeper = 'Goalkeeper',
  Midfielder = 'Midfielder',
}

export enum Role {
  Coach = 'COACH',
  Player = 'PLAYER',
}
