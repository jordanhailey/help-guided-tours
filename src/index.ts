import { Controller as MuseumController	} from './museums/controller.ts';

const museumController = new MuseumController({
	museumRepository: {
		getAll: async () => []
	}
});

console.log(await museumController.getAll());
