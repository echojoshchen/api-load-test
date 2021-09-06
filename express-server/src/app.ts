/**
 * Setup routes
 */
import express from "express";

export function configureRouter(app: express.Router): void {

    app.get("/", (_: express.Request, res: express.Response) => {
        res.send(Math.random().toString());
    });
}

const app = express();
configureRouter(app);
app.listen(8888, () => {
    console.log(`Started listening on port ${8888}`);
});


