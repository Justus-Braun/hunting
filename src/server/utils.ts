import { GetPlayer } from "@overextended/ox_core/server";
import { License, Weapon } from "./types";

export const hasLicenses = (playerId: number, requiredLicenses: License[]) => {
    const player = GetPlayer(playerId);

    if (!player) {
        return false;
    }

    for (const license of requiredLicenses) {
        const playerLicense = player.getLicense(license);

        if (!playerLicense) {
            return false;
        }

        if (playerLicense.suspended) {
            return false;
        }
    }

    return true;
}

export const hasWeapons = (playerId: number, requiredWeapons: Weapon[]) => {
    for (const weapon of requiredWeapons) {
        const playerWeapon = exports.ox_inventory.Search(playerId, 'count', weapon);
        if (playerWeapon === 0) {
            return false;
        }
    }

    return true;
}