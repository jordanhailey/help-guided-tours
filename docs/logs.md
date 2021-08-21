# Logs

> Following along with the lessons found in the
> [Deno Web Development book](https://www.packtpub.com/product/deno-web-development/9781800205666).

- The book outlines some of the built in features of Deno, and explains the
  exciting possibilities deno can enable.
- As the runtime becomes more mature, its quite possible Node may adopt some of
  the methodology Deno employs. Likewise, some of the missing features of Deno
  that Node possesses could find their way into the runtime.
- It seems unlikely that NPM will find its way over to Deno, but it could
  happen. Just the same, many of the libraries are being ported over by OSS
  contributors.

## Building with Deno

- In the second section of the book, the author begins walking through the
  process of deciding on an apps architecture. They recommend following the
  SOLID design principles Robert C. Martin (Uncle Bob) wrote about - The gist of
  which is to avoid tightly coupled, fragile code by writing modules that have a
  single responsibility and interact through abstractions instead of creating
  direct dependencies (think APIs).
- The application being created is an app in which users can log into, and add
  to a collection of museums.
- My goal is to take this skeleton application and expand on it further,
  creating a mini travel planning app, where users can not only add, edit, and
  view museums, but also activities, restuarants, and hotels.
- The title I've chose for this app is Help-guided Tours (a weak spin on
  Self-guided, I know).

## Help-Guided Tours

### Adding Basic logging, Auth, and Connecting a Database

- Adding Middleware to incorperate authentication, and data persistence.
- Middleware is always processed as a stack that is processed FIFO (functions
  which are async and call on await `next()` process the rest of their code in
  LIFO order, enabling a process to finish after all other synchronous
  middleware functions have been executed, and after all following `async`
  middleware functions have been resolved/rejected), with each function
  controlling the flow of the response. In Oak, like Express, middleware is
  attached via the `use` method.
- If a middleware function does not call `next()` the response process is
  halted.
  - A router is just one kind of middleware, it handles requests to certain
    routes and executes processes along the way to generate a response.
  - As long as one function in the chain calls the `ctx.response()` method, the
    response can be processed.

#### Logging

#### JWT Auth

- I had to veer from the guided path emplementing JWT Auth. The tools the author
  uses require `Oak@6.3.1`, and I was using `Oak@7.4.0`. The RouterMiddleware
  interface had changed and even when trying to work around it, the plug in tool
  didn't work as expected. So I took inspiration from the author's mudule and
  wrote my own.
  - I settled on using `djwt@v2.2`, and so I needed to change a few interfaces
    and even the processes executed on the `getToken` and `generateToken`
    method.
  - Lastly, I had to write my own RouterMiddleware function to reject
    unauthenitcated requests.
