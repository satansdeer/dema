import { useMemo, Dispatch, SetStateAction } from "react";
import Select from "react-select";
import { Order, Session, Filters } from "../types";

type Options = {
  channel: string[];
  channelGroup: string[];
  campaignName: string[];
};

const deriveOptionsFromData = (orders: Order[], sessions: Session[]) => {
  return [...orders, ...sessions].reduce<Options>(
    (acc, item) => {
      (
        ["channel", "channelGroup", "campaignName"] as (keyof Options)[]
      ).forEach((key) => {
        if (!acc[key]) {
          acc[key] = [];
        }
        if (item[key] && !acc[key].includes(item[key])) {
          acc[key].push(item[key]);
        }
      });
      return acc;
    },
    {
      channel: [],
      channelGroup: [],
      campaignName: [],
    },
  );
};

interface FiltersPanelProps {
  orders: Order[];
  sessions: Session[];
  onChange: Dispatch<SetStateAction<Filters>>;
  filters: Filters;
}

export const FiltersPanel = ({
  orders = [],
  sessions = [],
  onChange,
}: FiltersPanelProps) => {
  const options = useMemo(
    () => deriveOptionsFromData(orders, sessions),
    [orders, sessions],
  );

  const campaignNameOptions = options.campaignName.map((o) => ({
    label: o,
    value: o,
  }));

  const channelOptions = options.channel.map((o) => ({
    label: o,
    value: o,
  }));

  const channelGroupOptions = options.channelGroup.map((o) => ({
    label: o,
    value: o,
  }));

  return (
    <>
      <div className="flex flex-row items-center w-full">
        <div className="mb-5 w-full">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Campaign Names
          </label>
          <Select
            isMulti
            name="channel"
            placeholder="Select campaign names"
            options={campaignNameOptions}
            onChange={(selectedOptions) =>
              onChange((old) => ({
                ...old,
                campaignName: selectedOptions.map((option) => option.value),
              }))
            }
            className="outline-none"
            classNamePrefix="select"
          />
        </div>
      </div>
      <div className="flex flex-row items-center w-full">
        <div className="mb-5 w-1/2 pr-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Channels
          </label>
          <Select
            isMulti
            name="channel"
            placeholder="Select channel names"
            options={channelOptions}
            onChange={(selectedOptions) =>
              onChange((old) => ({
                ...old,
                channel: selectedOptions.map((option) => option.value),
              }))
            }
            className="outline-none"
            classNamePrefix="select"
          />
        </div>
        <div className="mb-5 w-1/2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Channel Groups
          </label>
          <Select
            isMulti
            name="channelGroup"
            placeholder="Select channel groups"
            options={channelGroupOptions}
            onChange={(selectedOptions) =>
              onChange((old) => ({
                ...old,
                channelGroup: selectedOptions.map((option) => option.value),
              }))
            }
            className="outline-none"
            classNamePrefix="select"
          />
        </div>
      </div>
    </>
  );
};
