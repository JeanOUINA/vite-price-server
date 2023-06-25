import VITCSwap from "web3-vite/dist/contracts/VITCSwap.js"
import { client } from "../vite.js"
import Source from "../Source.js"
import { usdtTokenId, viteTokenId } from "web3-vite/dist/constants.js"
import { isValidTokenId } from "web3-vite"

export default class VITCSwapSource implements Source {
    name = "VITCSwap"
    // somehow the default export is the export itself, then the class is in .defualt
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    contract:VITCSwap = new VITCSwap.default(client, "v1")

    async getTokens(): Promise<string[]> {
        // fetching from chain is too long fuck that lol
        try{
            const res = await fetch("https://vitcswap-api.thomiz.dev/api/pairs")
            const tokens = await res.json()
            if(!Array.isArray(tokens) || tokens.find(token => !isValidTokenId(token)))throw new Error("!json")

            // the api does not return vite in its tokens
            if(!tokens.includes(viteTokenId)){
                tokens.push(viteTokenId)
            }

            return tokens
        }catch(err){
            const tokens = await this.contract.getTokens()

            // the contract does not return vite in its tokens
            if(!tokens.includes(viteTokenId)){
                tokens.push(viteTokenId)
            }

            return tokens
        }
    }
    
    async getPrice(token: string): Promise<number> {
        const price = await this.contract.getTokenPrice(token, usdtTokenId)
        return price.toNumber()
    }

    async getPrices(tokens: string[]): Promise<Record<string, number>> {
        const promises = tokens.map(token => this.getPrice(token))
        const prices = await Promise.all(promises)

        return tokens.reduce((acc, token, i) => {
            const price = prices[i]
            if(price === Infinity){
                acc[token] = 0
            }else{
                acc[token] = prices[i]
            }
            return acc
        }, {} as Record<string, number>)
    }
}