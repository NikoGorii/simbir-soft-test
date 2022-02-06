export type Filters = Record<string, string>;

export interface Area {
  id: number;
  name: string;
}

export interface Competition {
  id: number;
  area: Area;
  name: string;
  code: string;
  plan: string;
  lastUpdated: Date;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
}

export interface Odds {
  msg: string;
}

export interface FullTime {
  homeTeam: number;
  awayTeam: number;
}

export interface HalfTime {
  homeTeam: number;
  awayTeam: number;
}

export interface ExtraTime {
  homeTeam?: number;
  awayTeam?: number;
}

export interface Penalties {
  homeTeam?: number;
  awayTeam?: number;
}

export interface Score {
  winner: string;
  duration: string;
  fullTime: FullTime;
  halfTime: HalfTime;
  extraTime: ExtraTime;
  penalties: Penalties;
}

export interface HomeTeam {
  id: number;
  name: string;
}

export interface AwayTeam {
  id: number;
  name: string;
}

export interface Referee {
  id: number;
  name: string;
  role: string;
  nationality: string;
}

export interface Match {
  id: number;
  season: Season;
  utcDate: Date;
  status: string;
  matchday?: number;
  stage: string;
  group: string;
  lastUpdated: Date;
  odds: Odds;
  score: Score;
  homeTeam: HomeTeam;
  awayTeam: AwayTeam;
  referees: Referee[];
}

export interface TeamMatches {
  count: number;
  filters: Filters;
  competition: Competition;
  matches: Match[];
}
