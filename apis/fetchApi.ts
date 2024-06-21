import Cookie from "js-cookie";

type RequestOptions = {
  params?: Record<string, string>;
} & RequestInit;

const fetchApi = () => {
  const request = async <T>(url: string, opts?: RequestOptions): Promise<T> => {
    let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
    if (opts?.params) {
      const searchParams = paramsMapping(opts.params);
      apiUrl += `?${searchParams}`;
    }

    let defaultHeaders: Record<any, string> = {
      "Content-Type": "application/json",
    };

    if (window.document !== undefined) {
      const authToken = Cookie.get("EBUDDY_TOKEN");
      defaultHeaders = {
        ...defaultHeaders,
        Authorization: `Bearer ${authToken}`,
      };
    }

    const res = await fetch(apiUrl, {
      ...opts,
      headers: {
        ...defaultHeaders,
        ...opts?.headers,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    return await res.json();
  };

  const paramsMapping = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      searchParams.append(key, params[key]);
    }
    return searchParams.toString();
  };

  return {
    get: <R>(url: string, opts?: RequestOptions) =>
      request<R>(url, { ...opts, method: "GET" }),
    put: <R>(url: string, opts?: RequestOptions) =>
      request<R>(url, { ...opts, method: "PUT" }),
  };
};

export default fetchApi;
