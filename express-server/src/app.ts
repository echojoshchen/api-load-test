/**
 * Setup routes
 */
import express from "express";
import helmet from "helmet";

export function configureRouter(app: express.Router): void {
    // Set security headers
    app.use(
        helmet({
            frameguard: { action: "deny" },
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                },
            },
        }),
    );

    app.get("/", (_: express.Request, res: express.Response) => {
        res.send("hello world");
    });
}

const app = express();
configureRouter(app);
app.listen(8888, () => {
    console.log(`Started listening on port ${8888}`);
});


