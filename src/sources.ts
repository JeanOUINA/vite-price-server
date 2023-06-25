import CoinGeckoSource from "./sources/coingecko.js";
import LpTokenSource from "./sources/lptoken.js";
import VITCSwapSource from "./sources/vitcswap.js";
import ViteXSource from "./sources/vitex.js";

export const sources = [
    new LpTokenSource(),
    new CoinGeckoSource(),
    new ViteXSource(),
    new VITCSwapSource(),
]

export interface AllPrices {
    name: string
    prices: Record<string, number>
}

export async function getAllPrices():Promise<AllPrices[]>{
    const promises = []
    for(const source of sources){
        promises.push(
            source.getTokens()
            .then(tokens => source.getPrices(tokens))
            .catch(() => ({}))
        )
    }
    const prices = await Promise.all(promises)
    return prices.map((prices, i) => {
        return {
            name: sources[i].name,
            prices
        }
    })
}