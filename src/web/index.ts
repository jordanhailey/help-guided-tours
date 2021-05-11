import { serve } from "https://deno.land/std/http/server.ts";
import { MuseumController } from "../museums/index.ts"

interface CreateServerDependencies {
	configuration: {
		port: number
	},
	museum: MuseumController
}

export async function createServer({ configuration: { port }, museum }: CreateServerDependencies) {
	const server = serve({port})
	console.log(`Server running at https://localhost:${port}`);
	for await (let req of server) {
		if (req.url === "/api/museums" && req.method === "GET") {
			req.respond({
				body: JSON.stringify({
					museums: await museum.getAll()
				})+"\n",
				status: 200
			})
			continue;
		}

		req.respond({
			body: 'museums api\n',
			status: 200
		})
	}
}
