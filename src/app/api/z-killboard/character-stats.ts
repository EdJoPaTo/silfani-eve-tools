function percentage(destroyed, lost) {
  if (destroyed + lost > 0) {
    return destroyed / (destroyed + lost);
  } else {
    return 0;
  }
}

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

  constructor(json: any) {
    this.type = json.type;
    this.id = json.id;
    this.shipsLost = json.shipsLost || 0;
    this.pointsLost = json.pointsLost || 0;
    this.iskLost = json.iskLost || 0;
    this.shipsDestroyed = json.shipsDestroyed || 0;
    this.pointsDestroyed = json.pointsDestroyed || 0;
    this.iskDestroyed = json.iskDestroyed || 0;
    // TODO: groups
    // TODO: months
    this.sequence = json.sequence;

    this.info = {
      allianceID: json.info.allianceID || 0,
      corporationID: json.info.corporationID || 0,
      factionID: json.info.factionID || 0,
      id: json.info.id,
      killID: json.info.killID,
      name: json.info.name,
      type: json.info.type
    };
  }
}
