import { unauthorized } from "../util/errormessages";

const request = async (method, url, data) => {
  const ignore404Endpoints = [
    "http://localhost:3030/data/okrs",
    "http://localhost:3030/data/teams",
  ];

  try {
    const user = localStorage.getItem("auth");
    const auth = JSON.parse(user || "{}");

    let headers = {};

    if (auth.accessToken) {
      headers["X-Authorization"] = auth.accessToken;
    }

    let buildRequest;

    if (method === "GET") {
      buildRequest = fetch(url, { headers });
    } else {
      buildRequest = fetch(url, {
        method,
        headers: {
          ...headers,
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    const response = await buildRequest;

    if (response.status === 404 && ignore404Endpoints.includes(url)) {
      return [];
    }

    if (!response.ok) {
      let errorMessage = response.statusText;

      if (response.status === 403) {
        errorMessage = unauthorized;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
};

export const get = request.bind({}, "GET");
export const post = request.bind({}, "POST");
export const patch = request.bind({}, "PATCH");
export const put = request.bind({}, "PUT");
export const del = request.bind({}, "DELETE");
