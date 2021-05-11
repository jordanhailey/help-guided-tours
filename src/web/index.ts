import { serve } from "https://deno.land/std/http/server.ts";

interface CreateServerDependencies {
	configuration: {
		port: number
	}
}

export async function createServer({ configuration: { port } }: CreateServerDependencies) {
	const server = serve({port})
	console.log(`Server running at https://localhost:${port}`);
	for await (let req of server) {
		req.respond({
			body: 'museums api\n',
			status: 200
		})
	}
}
