# Logs
> Following along with the lessons found in the [Deno Web Development book](https://www.packtpub.com/product/deno-web-development/9781800205666).

- The book outlines some of the built in features of Deno, and explains the exciting possibilities deno can enable.
- As the runtime becomes more mature, its quite possible Node may adopt some of the methodology Deno employs. Likewise, some of 
the missing features of Deno that Node possesses could find their way into the runtime. 
- It seems unlikely that NPM will find its way over to Deno, but it could happen. Just the same, many of the 
libraries are being ported over by OSS contributors.

## Building with Deno
- In the second section of the book, the author begins walking through the process of deciding on an apps architecture. They recommend
following the SOLID design principles Robert C. Martin (Uncle Bob) wrote about - The gist of which is to avoid tightly coupled, fragile 
code by writing modules that have a single responsibility and interact through abstractions instead of creating direct dependencies (think APIs).
- The application being created is an app in which users can log into, and add to a collection of museums. 
- My goal is to take this skeleton application and expand on it further, creating a mini travel planning app, where users can not only add, edit, and view museums,
but also activities, restuarants, and hotels. 
- The title I've chose for this app is Help-guided Tours (a weak spin on Self-guided, I know).


