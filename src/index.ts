import "./env.js"
import "modernlog/patch.js"
import { app } from "./server.js"
import cache from "./cache.js"
import { wait } from "web3-vite"

// start the cache
await cache.update()

app.listen(+process.env.PORT, process.env.HOST, () => {
    console.log(`Listening on http://${process.env.HOST}:${process.env.PORT}`)
})

// eslint-disable-next-line no-constant-condition
while(true){
    // update every minute
    await wait(60 * 1000)
    await cache.update()
}