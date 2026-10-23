const API_BASE_URL = "https://dummyjson.com";

const API_ENDPOINTS = {
  products: "/products",
  addComment: "/comments/add",
};

const DEFAULT_HEADERS = {
  Accept: "application/json",
};

const JSON_HEADERS = {
  ...DEFAULT_HEADERS,
  "Content-Type": "application/json",
};

async function parseResponse(response) {
  if (!response.ok) {
    let message = `Erreur HTTP : ${response.status}`;

    try {
      const errorBody = await response.json();
      if (typeof errorBody.message === "string") {
        message = errorBody.message;
      }
    } catch {
      // Garder le message HTTP si le serveur ne renvoie pas de JSON exploitable.
    }

    throw new Error(message);
  }

  return response.json();
}

async function apiGet(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: DEFAULT_HEADERS,
  });

  return parseResponse(response);
}

async function apiPost(endpoint, payload) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export { API_ENDPOINTS, apiGet, apiPost };
