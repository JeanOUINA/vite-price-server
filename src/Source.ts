

export default abstract class Source {
    abstract name: string
    /* Get supported tokens by this source */
    abstract getTokens(): Promise<string[]>
    /* Get the price of a token in USD */
    abstract getPrice(token: string): Promise<number>
    abstract getPrices(tokens: string[]): Promise<Record<string, number>>
}