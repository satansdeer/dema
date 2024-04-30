export interface AggregatedData {
  channel: string;
  channelGroup: string;
  campaignName: string;
  grossSales: number;
  numberOfOrders: number;
  numberOfVisits: number;
  averageOrderValue: number;
  conversionRate: number | string;
}

export interface Order {
  channel: string;
  channelGroup: string;
  campaignName: string;
  orderValue: number;
}

export interface Session {
  channel: string;
  channelGroup: string;
  campaignName: string;
}

export type Entry = Order | Session;

export type Groups<T> = Record<string, T[]>;

export type Filters = Record<keyof Entry, string[]>;

export interface ChannelData {
  grossSales: number;
  numberOfVisits: number;
  numberOfOrders: number;
}
