import { Vector3 } from '@nativewrappers/fivem';
import { cache, onServerCallback, requestAnimDict } from '@overextended/ox_lib/client';

// Kill animal
// Pick up animal and on an vehicle with ramp
// Drop animal at the butcher

exports.sleepless_interact.addGlobalModel({
  id: 'hunting',
  models: [
    { model: 'a_c_boar', offset: new Vector3(0, 0, 0.0) },
    { model: 'a_c_coyote', offset: new Vector3(0, 0, 0.0) },
    { model: 'a_c_deer', offset: new Vector3(0, 0, 0.0) },
    { model: 'a_c_mtlion', offset: new Vector3(0, 0, 0.0) },
  ],
  options: [
    {
      label: 'Aufschneiden',
      items: {
        WEAPON_KNIFE: 1,
      },
      onSelect: function (data: any) {
        // Cut animation and remove the animal
      },
      canInteract: function (entity: number, distance: number, coords: Vector3, id: string) {
        return IsEntityDead(entity) && IsEntityAPed(entity);
      },
    },
    {
      label: 'Aufheben',
      onSelect: function (data: any) {
        playCarryAnim(data.entity);
      },
      canInteract: function (entity: number, distance: number, coords: Vector3, id: string) {
        return IsEntityDead(entity) && IsEntityAPed(entity);
      },
    }
  ],
  renderDistance: 10.0,
  activeDistance: 2.0,
  cooldown: 1500,
});

const playCarryAnim = (entity: number) => {
  // Play the carry animation

  requestAnimDict('combat@drag_ped@')

  const playerPed = cache.ped;


  AttachEntityToEntity(entity, playerPed, GetPedBoneIndex(playerPed, 0x2e28), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, false, 2, true);

  TaskPlayAnim(playerPed, 'combat@drag_ped@', 'injured_idle', 8.0, 1.0, -1, 1, 0, false, false, false);
}

onServerCallback(`${cache.ressource}:getInVehicle`, (vehicle: number) => {
  // Tell player to get into the vehicle

  
});