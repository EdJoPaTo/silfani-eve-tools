export class CharacterStats {
  type: string;
  id: number;
  shipsLost: number;
  pointsLost: number;
  iskLost: number;
  shipsDestroyed: number;
  pointsDestroyed: number;
  iskDestroyed: number;
  // TODO: groups
  // TODO: months
  sequence: number;
  info: {
    allianceID: number;
    corporationID: number;
    factionID: number
    id: number;
    killID: number;
    name: string;
    type: string;
  };
}
