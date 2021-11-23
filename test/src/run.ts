import got from "got";
import * as stats from "simple-statistics";

const totalRequests = 1000;
const intervalMs = 2;
const port = 8889;
console.log(`Starting load test: ${totalRequests} total requests, ${intervalMs}ms interval`);

async function hello(port: number) {
    const resp = await got("http://0.0.0.0:" + port);
    return resp.body;
}

let active = 0;
let total = 0;
let timeList: number[] = [];
const interval = setInterval(() => {
    total += 1;
    active += 1;
    const start = Date.now();
    hello(port).then((resp: string) => {
        const end = Date.now();
        const time = end - start;
        timeList.push(time);
        // console.log(`Response: ${resp} (${time}ms), Active requests: ${active}`);
        active -= 1;
    }).catch((e) => {
        const end = Date.now();
        const time = end - start;
        timeList.push(time);
        console.error(`Error: ${e.message} (${time}ms), Active requests: ${active}`);
        active -= 1;
    }).finally(() => {
        if (total >= totalRequests && active === 0) {
            const mean = stats.mean(timeList);
            const stdev = stats.standardDeviation(timeList);
            console.log(`Summary: mean=${mean}, stdev=${stdev}`);
        }
    });
    if (total >= totalRequests) {
        clearInterval(interval);
    }
}, intervalMs);
