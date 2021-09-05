/**
 * Setup routes
 */
import fastify, { FastifyInstance } from "fastify";
import middie from "middie";

export async function configureRouter(app: FastifyInstance): Promise<void> {
    await app.register(middie);

    // Set security headers
    app.get("/", async () => {
        return "hello world";
    });
}

const app = fastify();
configureRouter(app);
app.listen(8889, () => {
    console.log(`Started listening on port ${8889}`);
});


