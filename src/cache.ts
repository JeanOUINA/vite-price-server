import { AllPrices, getAllPrices } from "./sources.js"

export default new class PriceCache {
    allPrices:AllPrices[] = []
    tokens = new Set<string>()
    prices:Record<string, number> = {}

    async update(){
        this.allPrices = await getAllPrices()
        this.tokens = new Set<string>()
        this.prices = {}
        for(const source of this.allPrices){
            for(const token in source.prices){
                if(source.prices[token] === 0 && !this.prices[token]){
                    this.prices[token] = 0
                }
                if(this.tokens.has(token))continue
                this.tokens.add(token)
                this.prices[token] = source.prices[token]
            }
        }

        // aliases
        const aliasSource:AllPrices = {
            name: "aliases",
            prices: {
                // sack = knobsack
                "tti_21ac6a75469bed1e7b7c5665": this.prices["tti_93939ea53d7726c1c0ee0196"]
            }
        }
        for(const token in aliasSource.prices){
            if(aliasSource.prices[token] === 0 && !this.prices[token]){
                this.prices[token] = 0
            }
            if(aliasSource.prices[token] === 0)continue
            this.tokens.add(token)
            this.prices[token] = aliasSource.prices[token]
        }
        this.allPrices.unshift(aliasSource)


        console.log(`Updated prices for ${this.tokens.size} tokens`)
    }

    getPrice(token: string): number {
        return this.prices[token] ?? 0
    }

    getPrices(tokens: string[]): Record<string, number> {
        return tokens.reduce((acc, token) => {
            acc[token] = this.prices[token] ?? 0
            return acc
        }, {} as Record<string, number>)
    }

    getTokens(): string[] {
        return [...this.tokens]
    }

    getAllPrices(): AllPrices[] {
        return this.allPrices
    }

    getAllSources(): string[] {
        return this.allPrices.map(source => source.name)
    }

    getAllPricesByToken(token: string): [string, number][] {
        return this.allPrices.filter(source => source.prices[token] !== undefined)
            .map(source => [source.name, source.prices[token]])
    }
}