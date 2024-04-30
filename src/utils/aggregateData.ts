import { Groups, Order, Session, AggregatedData, ChannelData } from "../types";
import { fromB64 } from "./encoding";

export const aggregateData = (
  orderGroups: Groups<Order>,
  sessionGroups: Groups<Session>,
) => {
  const aggregated: AggregatedData[] = [];

  const chartData: Record<string, ChannelData> = {};

  const keys = new Set([
    ...Object.keys(orderGroups),
    ...Object.keys(sessionGroups),
  ]);

  keys.forEach((key) => {
    const orderGroup = orderGroups[key] || [];
    const sessionGroup = sessionGroups[key] || [];
    const [channel, channelGroup, campaignName] = key.split("-").map(fromB64);
    const grossSales = orderGroup.reduce(
      (acc, item) => acc + (item?.orderValue ?? 0),
      0,
    );

    const numberOfVisits = sessionGroup.length;

    const numberOfOrders = orderGroup.length;

    const averageOrderValue = numberOfOrders
      ? Math.round(grossSales / numberOfOrders)
      : 0;

    const conversionRate =
      numberOfVisits > 0 ? (numberOfOrders / numberOfVisits).toFixed(3) : 0;

    if (!chartData[channel]) {
      chartData[channel] = {
        grossSales: 0,
        numberOfVisits: 0,
        numberOfOrders: 0,
      };
    }
    chartData[channel].grossSales += grossSales;
    chartData[channel].numberOfVisits += sessionGroup.length;

    aggregated.push({
      channel,
      channelGroup,
      campaignName,
      grossSales,
      numberOfOrders,
      numberOfVisits,
      averageOrderValue,
      conversionRate,
    });
  });

  return { aggregated, chartData };
};
