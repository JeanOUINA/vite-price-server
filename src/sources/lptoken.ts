import Source from "../Source";

export default class LpTokenSource implements Source {
    name = "LpToken"

    tokensSet = new Set<string>([
        // VITCWBNB
        "tti_6312d2a685a9bd7a54250cb9",
        // VINUBNB PCS
        "tti_e06b807b9c6fadd0391f8748",
        // VICATWBNB
        "tti_135ae433038c18fe0797f528",
        // VIVABNB
        "tti_d05920af6f485fa52ffe4e69"
    ])

    async getTokens(): Promise<string[]> {
        return [...this.tokensSet]
    }
    
    async getPrice(token: string): Promise<number> {
        const res = await fetch(`https://vite-api.thomiz.dev/lptokens/${token}`)
        const json = await res.json()
        if(!json || typeof json.usd !== "string")throw new Error(JSON.stringify(json, null, 4))
        return parseFloat(json.usd)
    }

    async getPrices(tokens: string[]): Promise<Record<string, number>> {
        const promises = tokens.map(token => this.getPrice(token).catch(err => {
            console.error(`[${this.name}] Failed to get price for ${token}:`, err)
            return 0
        }))
        const prices = await Promise.all(promises)

        return tokens.reduce((acc, token, i) => {
            acc[token] = prices[i]
            return acc
        }, {} as Record<string, number>)
    }
}