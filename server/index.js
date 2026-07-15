export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/portfolio") {
      return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    if (request.method === "GET" && !url.pathname.includes(".")) {
      return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
    }

    return response;
  },
};
