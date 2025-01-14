const token = localStorage.getItem("token");
console.log(token , "Check Token")
export async function client(
  endpoint,
  { body, ...customConfig }: Partial<RequestInit> = {}
) {
  const headers = { "Content-Type": "application/json" };
  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  let data;
  try {
    const response = await window.fetch(
      `${process.env.REACT_APP_BASE_URL}${endpoint}`,
      config
    );
    data = await response.json();
    console.log(data, "data");
    if (response.status ) {
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      };
    }
    throw new Error(response.statusText);
  } catch (err: any) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint, customConfig: Partial<RequestInit> = {}) {
  return client(endpoint, {
    ...customConfig,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};

client.post = function (
  endpoint,
  body,
  customConfig: Partial<RequestInit> = {}
) {
  if (token) {
    return client(endpoint, {
      ...customConfig,
      body,
      headers: { Authorization: `Bearer ${token}`  },
    });
  }
  return client(endpoint, { ...customConfig, body });
};
