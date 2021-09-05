import got from "got";

async function hello(port: number) {
    return await got("0.0.0.0:" + port);
}

hello(8888).then((resp: any) => {
    console.log(resp);
}).catch((e) => {
    console.error(e);
});

