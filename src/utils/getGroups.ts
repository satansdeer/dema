import { Order, Session } from "../types";
import { groupBy } from "lodash";
import { toB64 } from "./encoding";

export const getGroups = (orders: Order[], sessions: Session[]) => {
  const groupedOrders = groupBy(
    orders,
    (item) =>
      `${toB64(item.channel)}-${toB64(item.channelGroup)}-${toB64(item.campaignName)}`,
  );
  const groupedSessions = groupBy(
    sessions,
    (item) =>
      `${toB64(item.channel)}-${toB64(item.channelGroup)}-${toB64(item.campaignName)}`,
  );
  return { groupedOrders, groupedSessions };
};
