import { useMemo } from "react";
import { Order, Session, Groups } from "../types";

const calculateOverview = (
  orderGroups: Groups<Order>,
  sessionGroups: Groups<Session>,
) => {
  const result = {
    totalVisits: 0,
    totalOrders: 0,
    totalGrossSales: 0,
  };

  const keys = new Set([
    ...Object.keys(orderGroups),
    ...Object.keys(sessionGroups),
  ]);

  keys.forEach((key) => {
    const orderGroup = orderGroups[key] || [];
    const sessionGroup = sessionGroups[key] || [];
    result.totalOrders += orderGroup.length;

    result.totalGrossSales += orderGroup.reduce(
      (acc, item) => acc + item.orderValue,
      0,
    );

    result.totalVisits += sessionGroup.length;
  });

  return result;
};

interface OverviewProps {
  groupedOrders: Record<string, Order[]>;
  groupedSessions: Record<string, Session[]>;
}

export const Overview = ({ groupedOrders, groupedSessions }: OverviewProps) => {
  const overviewData = useMemo(
    () => calculateOverview(groupedOrders, groupedSessions),
    [groupedOrders, groupedSessions],
  );

  return (
    <div className="flex flex-row items-center">
      <div className="mr-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Total Gross Sales
        </label>
        <div>{overviewData?.totalGrossSales}</div>
      </div>
      <div className="mr-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Total Number of Orders
        </label>
        <div>{overviewData?.totalOrders}</div>
      </div>
      <div className="mr-4">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Total Visits
        </label>
        <div>{overviewData?.totalVisits}</div>
      </div>
    </div>
  );
};
