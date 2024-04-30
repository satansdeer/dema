import { useState, useMemo, useEffect } from "react";

import { FiltersPanel } from "./components/FiltersPanel";
import { Overview } from "./components/Overview";
import { aggregateData } from "./utils/aggregateData";
import { BarChart } from "./components/BarChart";
import { Table } from "./components/Table";
import { filterData } from "./utils/filterData";
import { getGroups } from "./utils/getGroups";
import { Order, Session, Filters } from "./types";
import * as api from "./api";

export function App() {
  const [filters, setFilters] = useState<Filters>({
    channel: [],
    channelGroup: [],
    campaignName: [],
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const ordersData = await api.getOrders();
      const sessionsData = await api.getSessions();
      if (ordersData) {
        setOrders(ordersData);
      }
      if (sessionsData) {
        setSessions(sessionsData);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const { filteredOrders, filteredSessions } = useMemo(
    () => filterData(orders, sessions, filters),
    [orders, sessions, filters],
  );
  const { groupedOrders, groupedSessions } = useMemo(
    () => getGroups(filteredOrders, filteredSessions),
    [filteredOrders, filteredSessions],
  );

  const aggregatedData = useMemo(
    () => aggregateData(groupedOrders, groupedSessions),
    [groupedOrders, groupedSessions],
  );

  if (isLoading) {
    return null;
  }

  return (
    <div className="p-2 w-full">
      <div className="w-full flex flex-row items-stretch px-4 mb-4">
        <div className="w-1/2 p-4 mr-4 text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Chart
          </h2>
          <BarChart chartData={aggregatedData.chartData} />
          <div></div>
        </div>
        <div className="w-1/2 text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Filters
          </h2>
          <FiltersPanel
            orders={orders}
            sessions={sessions}
            filters={filters}
            onChange={setFilters}
          />
        </div>
      </div>
      <div className="w-full px-4 mb-4">
        <div className="w-full p-4 text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Overview
          </h2>
          <Overview
            groupedSessions={groupedSessions}
            groupedOrders={groupedOrders}
          />
        </div>
      </div>

      <div className="w-full px-4">
        <div className="w-full p-4 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Data
          </h2>
          <Table data={aggregatedData.aggregated} />
        </div>
      </div>
    </div>
  );
}
