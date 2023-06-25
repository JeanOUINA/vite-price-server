import express from "express"
import cache from "./cache.js"
import { isValidTokenId } from "web3-vite"

export const app = express()
.disable("x-powered-by")
.get("/prices", (req, res) => {
    res.status(200).send(cache.prices)
})
.get("/tokens", (req, res) => {
    res.status(200).send(cache.getTokens())
})
.get("/sources", (req, res) => {
    res.status(200).send(cache.getAllSources())
})
.get("/all", (req, res) => {
    res.status(200).send(cache.getAllPrices())
})
.get("/prices/:token", (req, res) => {
    if(!isValidTokenId(req.params.token)){
        return res.status(400).send({
            error: {
                name: "InvalidTokenId",
                message: "Invalid token id"
            }
        })
    }
    res.status(200).send(cache.getAllPricesByToken(req.params.token))
})
.get("/price/:token", (req, res) => {
    res.contentType("application/json")
    .status(200)
    .send(
        cache.getPrice(req.params.token).toString()
    )
})