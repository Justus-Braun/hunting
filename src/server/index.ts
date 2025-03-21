import { hasLicenses, hasWeapons } from './utils';
import { HuntingMission, AktiveMission } from './types';
import { cache, triggerClientCallback } from '@overextended/ox_lib/server';

const GetVehicleNetworkType = exports.ox_core.GetVehicleNetworkType;

const AktiveMissions: AktiveMission[] = [];

const startMission = async (mission: HuntingMission) => {
	if (!hasLicenses(mission.playerId, mission.requiredLicenses)) {
		return;
	}

	if (!hasWeapons(mission.playerId, mission.requiredWeapons)) {
		return;
	}

	const vehicleEntityId = CreateVehicleServerSetter(
		mission.vehicle.model,
		GetVehicleNetworkType(mission.vehicle.model),
		mission.vehicle.position.x,
		mission.vehicle.position.y,
		mission.vehicle.position.z,
		mission.vehicle.position.w
	);

	const aktiveMission: AktiveMission = {
		mission,
		vehicle: vehicleEntityId,
		animals: [],
	};

	AktiveMissions.push(aktiveMission);

	const gotIntoVehicle = await triggerClientCallback(`${cache.ressource}:getInVehicle`, mission.playerId, vehicleEntityId);

	if (!gotIntoVehicle) {
		return;
	}

	const getToArea = await triggerClientCallback(`${cache.ressource}:driveToArea`, mission.playerId, mission.spawnArea.points);

	if (!getToArea) {
		return;
	}

	// Spawn Animals

	const killAnimals = await triggerClientCallback(`${cache.ressource}:killAnimals`, mission.playerId, mission.animals);

	if (!killAnimals) {
		return;
	}

	// Load Animals

	// Deliver Animals
};
