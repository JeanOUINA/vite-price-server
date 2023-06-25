// we'll use the vitex api even if it sucks

import Source from "../Source.js"

export default class ViteXSource implements Source {
    name = "ViteX"

    async getTokens(): Promise<string[]> {
        const res = await fetch("https://api.vitex.net/api/v2/markets")
        const json = await res.json()
        const tokens = new Set<string>()
        for(const market of json.data){
            tokens.add(market.tradeToken)
            tokens.add(market.quoteToken)
        }
        return [...tokens]
    }
    
    async getPrice(token: string): Promise<number> {
        const res = await fetch(`https://api.vitex.net/api/v2/exchange-rate?tokenIds=${token}`)
        const json = await res.json()
        if(!json.data || !json.data[0] || !json.data[0].usdRate)return 0
        return json.data[0].usdRate
    }

    async getPrices(tokens: string[]): Promise<Record<string, number>> {
        const res = await fetch(`https://api.vitex.net/api/v2/exchange-rate?tokenIds=${tokens.join(",")}`)
        const json = await res.json()
        if(!json.data)return {}
        return json.data.reduce((acc, token) => {
            acc[token.tokenId] = token.usdRate ?? 0
            return acc
        }, {} as Record<string, number>)
    }
}