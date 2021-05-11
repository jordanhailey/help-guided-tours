import { Application, Router } from "../deps.ts";
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
		const apiRouter = new Router({ prefix: "/api"});

		app.addEventListener("listen", e => {
			console.log(`Server has started, listening at ${e.hostname || 'localhost'}:${e.port}\n`)
		})
		app.addEventListener("error", e => {
			console.log(`An error has occured: ${e.message}\n`)
		})

		apiRouter.get("/museums", async (ctx)=>{
			ctx.response.body = {
				museums: await museum.getAll()
			}
		})

		app.use(apiRouter.routes());
		app.use(apiRouter.allowedMethods());
		app.use((ctx) => {
			ctx.response.body = "Hello World!"
		});
		await app.listen({ port });
} 
