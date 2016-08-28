import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'detailedinfo'
})
export class DetailedinfoPipe implements PipeTransform {

  data = {
    amarr: { name: 'Amarr Empire', alli: 500003 },
    ammatar: { name: 'Ammatar Mandate', alli: 500007 },
    angels: { name: 'Angel Cartel', alli: 500011 },
    blood: { name: 'Blood Raider Covenant', alli: 500012 },
    caldari: { name: 'Caldari State', alli: 500001 },
    concord: { name: 'CONCORD/ DED', alli: 500006 },
    courier: { name: 'Courier', item: 1317 },
    eom: { name: 'Equilibrium of Mankind' },
    gallente: { name: 'Gallente Federation', alli: 500004 },
    gasHar: { name: 'Gas Cloud Harvester', item: 25266 },
    gurista: { name: 'Guristas Pirates', alli: 500010 },
    iceHar: { name: 'Ice Harvester', item: 37450 },
    khanid: { name: 'Khanid Kingdom', alli: 500008 },
    mercs: { name: 'Mercenaries' },
    miningLa: { name: 'Mining Laser', item: 483 },
    minmatar: { name: 'Minmatar Republic', alli: 500002 },
    mordu: { name: "Mordu's Legion", alli: 500018 },
    rogueDrones: { name: 'Rogue Drones', item: 23527 },
    sansha: { name: "Sansha's Nation", alli: 500019 },
    serpentis: { name: 'Serpentis', alli: 500020 },
    thukker: { name: 'Thukker Tribe', alli: 500015 }
  };


  transform(value: any, args?: any): any {
    return this.data[value];
  }

}
