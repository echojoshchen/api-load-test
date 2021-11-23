/**
 * Setup routes
 */
import fastify, { FastifyInstance } from "fastify";
import middie from "middie";

export async function configureRouter(app: FastifyInstance): Promise<void> {
    await app.register(middie);

    app.get("/", async () => {
        return Math.random().toString();
    });
}

const app = fastify();
configureRouter(app);
app.listen(8889, () => {
    console.log(`Started listening on port ${8889}`);
});


