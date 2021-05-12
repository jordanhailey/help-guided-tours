import { Application, Router, RouterMiddleware } from "../deps.ts";
import { MuseumController } from "../museums/index.ts";
import { UserController } from "../users/index.ts";

interface CreateServerDependencies {
  configuration: {
    port: number;
  };
  museum: MuseumController;
  user: UserController;
}

export async function createServer({
  configuration: { port },
  museum,
  user,
}: CreateServerDependencies) {
  const app = new Application();

  // Logging
  app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    const { method, url } = ctx.request;
    console.log(`${method} ${url} - ${rt}`);
  });

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set(
      "X-Response-Time",
      `${ms}ms`,
    );
  });

  const apiRouter = new Router({ prefix: "/api" });

  app.addEventListener("listen", (e) => {
    console.log(
      `Server has started, listening at ${e.hostname ||
        "localhost"}:${e.port}\n`,
    );
  });
  app.addEventListener("error", (e) => {
    console.log(`An error has occured: ${e.message}\n`);
  });

  const addTestHeaderMiddleware: RouterMiddleware = async (ctx, next) => {
    ctx.response.headers.set("X-Test", "true");
    await next();
  };

  apiRouter.get("/museums", addTestHeaderMiddleware, async (ctx) => {
    ctx.response.body = {
      museums: await museum.getAll(),
    };
  });

  apiRouter.post("/users/register", async (ctx) => {
    const { username, password } = await ctx.request.body({ type: "json" })
      .value;
    if (!username || !password) {
      ctx.response.status = 400;
      return;
    }
    try {
      const createdUser = await user.register({ username, password });
      ctx.response.status = 201;
      ctx.response.body = { user: createdUser };
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { error: error };
    }
  });

  app.use(apiRouter.routes());
  app.use(apiRouter.allowedMethods());
  app.use((ctx) => {
    ctx.response.body = "Hello World!";
  });
  await app.listen({ port });
}
