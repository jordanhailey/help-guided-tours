import { Application } from "../deps.ts";
import { MuseumController } from "../museums/index.ts"

interface CreateServerDependencies {
	configuration: {
		port: number
	},
	museum: MuseumController
}

export async function createServer({ 
			configuration: { port },
			museum 
		}: CreateServerDependencies
	) {
		const app = new Application();
		app.use((ctx) => {
			ctx.response.body = "Hello World!"
		});
		await app.listen({ port });
} 
