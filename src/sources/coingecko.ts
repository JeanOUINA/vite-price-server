import Source from "../Source.js"

export default class CoinGeckoSource implements Source {
    name = "CoinGecko"

    tokensMap = new Map<string, string>(Object.entries({
        tti_5649544520544f4b454e6e40: "vite",
        tti_22d0b205bed4d268a05dfc3c: "vitamin-coin",
        tti_541b25bd5e5db35166864096: "vita-inu",
        tti_f370fadb275bc2a1a839c753: "epic-cash",
        tti_80f3751485e4e83456059473: "tether",
        tti_564954455820434f494e69b5: "vitex",
        tti_52c672080a7f5cdcb8addbdc: "hummingbot",
        tti_29a2af20212b985e9d49e899: "nano",
        tti_d63139ee766ed13aa25f0a4b: "benddao",
        tti_f9bd6782f966f899d74d7df8: "banano",
        tti_61f59e574f9f7babfe8908e5: "banano",
        tti_0baed0d3ab3520d81eb04702: "shiba-inu",
        tti_5c3e2df1729d8d402a8275b8: "wax",
        tti_8364a003d3a2d3c22af015ec: "saito",
        tti_c34069d833433fa25ae97441: "avalanche-2",
        tti_b18e6488eeb30541da7f5010: "viterium",
        tti_181e08c4fdb2876956245076: "stellar",
        tti_a23c2f75791efafe5fada99e: "viva",
        tti_b3fbb46b9318b3d168ba904e: "vicat",
        tti_ae7c9df2d83d9815424c5ecc: "paw",
        tti_3d1ed2b1151ed9bb64d51fee: "harmony",
        tti_fb901364ef662c25cf43125c: "binancecoin",
        tti_52278701cf99308c8775337e: "litecash",
        tti_2f875c97d3a51b66a59c4411: "ankr",
        tti_b90c9baffffc9dae58d1f33f: "bitcoin",
        tti_60ce61fb1bf38a32be3bfb91: "terra-luna",
        tti_f5c5446b8621bea7410fd454: "terra-luna-2",
        tti_3d482aaceb076a729cb3967b: "terrausd",
        tti_cd927832cb1890645e627693: "auto",
        tti_4d9ae6dae85405360e8b4695: "planet-token",
        tti_733c4026779953052bd68017: "radicle",
        tti_b0c07c71206c1db4aa8fb442: "handshake",
        tti_9b8b779b0ca5b55464e1cfda: "eos",
        tti_e0f975aa35963870f29ee413: "kardiachain",
        tti_392a4a23e84f514608f0b3f0: "alchemist",
        tti_ffcd2355f4843e8db240b013: "chainlink",
        tti_c8c9ad17bc7b45e38eb88a44: "binance-usd",
        tti_93df321906bf2fc3699e8996: "okb",
        tti_509c1977b40a86131dedaca4: "arweave",
        tti_4a04203e28bb8f3dc3d8f9b1: "ripple",
        tti_15d7902d9c4b5d6efb9618af: "pepe",
        tti_ffcb16eab521ec54daeba2ba: "the-open-network",
        tti_3fa548491ae1309fb6045786: "waves",
        tti_7fb89970f021269b6e101be1: "usd-coin",
        tti_c90c146c059b821527f40b98: "dai",
        tti_a2a290f98c963f6aca7bb9e7: "non-fungible-yearn",
        tti_684be55f138c4145844170c3: "bitcoin-cash-sv",
        tti_e5750d3c5b3bb5a31b8ba637: "monero",
        tti_e6218b92d202a0bef2d91fb1: "waultswap",
        tti_ba08360030939f1af8e4db88: "ferrum-network",
        tti_687d8a93915393b219212c73: "ethereum",
        tti_e9034802dcd5a2b5603e42fc: "hecofi",
        tti_e80bcafb642ce4898857eccc: "bismuth",
        tti_f7e187a151e9c74b81e87cce: "beam",
        tti_60e20567a20282bfd25ab56c: "tera-smart-money",
        tti_68af1261fba35f29b8d2115a: "robonomics-network",
        tti_6b6ee201d326a4ec715c0801: "permission-coin",
        tti_661d467c3f4d9c6d7b9e9dc9: "ergo",
        tti_c05c2c2fb8f6b428e3d60b04: "tellor",
        tti_08afaead8fe29b24b6da330f: "ixicash",
        tti_22a818227bb47f072f92f428: "pascalcoin",
        tti_0570e763918b4355074661ac: "turtlecoin",
        tti_03921398b4c7d86622b127d1: "hathor",
        tti_a0631aab52bbb9cf398fa5ed: "statera",
        tti_44718c5f6996f0a000142344: "dnaxcat",
        tti_cf532d62f0a49cd99ebae4bc: "idena",
        tti_5e9c3b41692b7df9144bde6d: "monerov",
        tti_26472d9be08f8f2fdeb3030d: "dero",
        tti_c57651a60eff2e7d4b52babf: "sparkpoint",
        tti_34c5ed639f97d1e826451c92: "uniswap",
        tti_6adff43eaa32068c9c8dbbfe: "gnosis",
        tti_2dceb296d0dfb34487837806: "celo",
        tti_8a088649de995d0dd54a6046: "pancakeswap-token",
        tti_3e84e81880b9eb297dd411e6: "poocoin",
        tti_6ec2144693dd31db48b20a63: "matic-network",
        tti_905289db7f48f0a8ac64c824: "minato",
        tti_6f1756ae2c4eecbd13dfea82: "dogecoin",
        tti_c192655916fa8582e71d9999: "hashbit",
        tti_42dda11891d8073f08578289: "fantom",
        tti_49541d5cece6789a71757872: "canto",
        tti_d28c96da024877252b8de16d: "render-token",
        tti_72f4cbbed88a5902c78a896f: "kaspa"
    }))

    async getTokens(): Promise<string[]> {
        return [...this.tokensMap.keys()]
    }
    
    async getPrice(token: string): Promise<number> {
        const prices = await this.getPrices([token])
        return prices[token] ?? 0
    }

    async getPrices(tokens: string[]): Promise<Record<string, number>> {
        const ids = new Set<string>()
        for(const tokenId of tokens){
            const id = this.tokensMap.get(tokenId)
            if(!id){
                console.error(`[${this.name}] Unknown token ${tokenId}: Not in tokensMap`)
                continue
            }
            ids.add(id)
        }
        const result = Object.fromEntries(tokens.map(e => [e, 0]))
        if(!ids.size)return result

        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${[...ids].join(",")}&vs_currencies=usd`)
        const prices = await res.json()
        for(const tokenId of tokens){
            const id = this.tokensMap.get(tokenId)
            if(!id)continue
            const price = prices[id]?.usd
            if(!price)continue
            result[tokenId] = price
        }
        return result
    }
}