import { Controller as MuseumController, Repository as MuseumRepository	} from './museums/index.ts';

const museumRepository = new MuseumRepository();

// TODO Remove this call to set mock data once data persistence is established
museumRepository.storage.set("123",{
	id: "123",
	name: "The Lourve",
	description: "Museum in Paris",
	location: {lat:"12",lng:"34"}
})

const museumController = new MuseumController({ museumRepository });

console.log(await museumController.getAll());
