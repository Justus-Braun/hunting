import { Vector3, Vector4 } from "@nativewrappers/fivem";

export type Weapon = 'weapon_knife' | 'weapon_musket';
export type License = 'hunting' | 'weapon' | 'none';
export type MissonType = 'hunt' | 'deliver';
export type Animal = {
    model: string;
    killed: boolean;
    loaded: boolean;
}

type SpawnArea = {
    points: Vector3[]
}

export interface HuntingMission {
    playerId: number;
    animals: Animal[];
    spawnArea: SpawnArea;
    vehicle: {
        model: string;
        position: Vector4;
    };
    butcher: Vector4;
    missionType: MissonType;
    requiredLicenses: License[];
    requiredWeapons: Weapon[];
}

export interface AktiveMission {
    mission: HuntingMission;
    vehicle: number;
    animals: number[];
}