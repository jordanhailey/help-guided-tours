import {
  Controller as MuseumController,
  Repository as MuseumRepository,
} from "./museums/index.ts";
import { createServer } from "./web/index.ts";

const museumRepository = new MuseumRepository();
const museumController = new MuseumController({ museumRepository });

// TODO Remove this call to set mock data once data persistence is established
museumRepository.storage.set("123", {
  id: "123",
  name: "The Lourve",
  description: "Museum in Paris",
  location: { lat: "12", lng: "34" },
});

createServer({ configuration: { port: 8080 }, museum: museumController });
//console.log(await museumController.getAll());
