const BASE_URL = "https://interviews.staging.dema.ai";

export const getOrders = () => {
  return fetch(`${BASE_URL}/orders`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There has been a problem fetching orders list:", error);
    });
};

export const getSessions = () => {
  return fetch(`${BASE_URL}/sessions`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There has been a problem fetching sessions list:", error);
    });
};
