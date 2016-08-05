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
    this.shipsLost = json.shipsLost;
    this.pointsLost = json.pointsLost;
    this.iskLost = json.iskLost;
    this.shipsDestroyed = json.shipsDestroyed;
    this.pointsDestroyed = json.pointsDestroyed;
    this.iskDestroyed = json.iskDestroyed;
    // TODO: groups
    // TODO: months
    this.sequence = json.sequence;

    this.info = {
      allianceID: json.info.allianceID,
      corporationID: json.info.corporationID,
      factionID: json.info.factionID,
      id: json.info.id,
      killID: json.info.killID,
      name: json.info.name,
      type: json.info.type
    };
  }

  get shipsPercentage(): number { return percentage(this.shipsDestroyed, this.shipsLost); };
  get pointsPercentage(): number { return percentage(this.pointsDestroyed, this.pointsLost); };
  get iskPercentage(): number { return percentage(this.iskDestroyed, this.iskLost); };
}
