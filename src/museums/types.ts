export type Museum = {
	id: string,
	name: string,
	descroption: string,
	location: {
		lat: string,
		lng: string
	}
}

export interface MuseumController {
	getAll: () => Promise<Museum[]>;
}

export interface MuseumRepository {
	getAll: () => Promise<Museum[]>;
}
