export interface PriceTile {
    id: string;
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
}

export interface NewsItem {
    id: string;
    title: string;
    description: string;
    url: string;
    publishedAt: string;
}

export interface EconomicEvent {
    id: string;
    title: string;
    date: string;
    impact: "low" | "medium" | "high";
}

export interface FeedDefinition {
    id: string;
    type: "news" | "economic";
    source: string;
}

export interface AccountState {
    accountId: string;
    balance: number;
    equity: number;
    margin: number;
}

export interface StorageSchema {
    version: string;
    priceTiles: PriceTile[];
    newsItems: NewsItem[];
    economicEvents: EconomicEvent[];
    feeds: FeedDefinition[];
    accountState: AccountState;
}