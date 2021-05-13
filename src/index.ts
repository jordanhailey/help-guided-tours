import {
  Controller as MuseumController,
  Repository as MuseumRepository,
} from "./museums/index.ts";
import {
  Controller as UserController,
  Repository as UserRepository,
} from "./users/index.ts";
import { createServer } from "./web/index.ts";
import { AuthRepository } from "./deps.ts";

const museumRepository = new MuseumRepository();
const museumController = new MuseumController({ museumRepository });
const userRepository = new UserRepository();
const authRepository = new AuthRepository({
  configuration: {
    algorithm: "HS512",
    key: "some-key",
    tokenExpirationInSeconds: 120
  }
});
const userController = new UserController({ userRepository, authRepository });

// TODO Remove this call to set mock data once data persistence is established
museumRepository.storage.set("123", {
  id: "123",
  name: "The Lourve",
  description: "Museum in Paris",
  location: { lat: "12", lng: "34" },
});

createServer({
  configuration: { port: 8080 },
  museum: museumController,
  user: userController,
});
//console.log(await museumController.getAll());
