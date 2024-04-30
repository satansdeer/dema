import { Order, Session, Entry, Filters } from "../types";

export const filterData = (
  orders: Order[],
  sessions: Session[],
  filters: Filters | undefined,
) => {
  if (!filters) {
    return { filteredOrders: orders, filteredSessions: sessions };
  }

  const filterEntries = <T extends Entry>(data: T[], filters: Filters): T[] => {
    return data.filter((entry) => {
      return (Object.keys(filters) as (keyof Entry)[]).every((filterKey) => {
        const filterValues = filters[filterKey];
        if (!filterValues.length) return true;
        return filterValues.includes(entry[filterKey]);
      });
    });
  };

  const filteredOrders = filterEntries(orders, filters);
  const filteredSessions = filterEntries(sessions, filters);

  return { filteredOrders, filteredSessions };
};
