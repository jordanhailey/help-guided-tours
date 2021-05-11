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

		app.addEventListener("listen", e => {
			console.log(`Server has started, listening at ${e.hostname || 'localhost'}:${e.port}\n`)
		})
		app.addEventListener("error", e => {
			console.log(`An error has occured: ${e.message}\n`)
		})

		app.use((ctx) => {
			ctx.response.body = "Hello World!"
		});
		await app.listen({ port });
} 
