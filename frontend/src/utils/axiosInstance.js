import axios from "axios";

const backendURL =
  import.meta.env.VITE_BACKEND_URL;

if (!backendURL) {
  throw new Error(
    "VITE_BACKEND_URL is not defined. Configure it in your deployment environment."
  );
}

const API = axios.create({
  baseURL: backendURL,
  withCredentials: true, // Important: This allows cookies to be sent cross-origin
});

// Request interceptor for debugging
API.interceptors.request.use(
  (config) => {
    // Log in development only
    if (import.meta.env.DEV) {
      console.log("API Request:", config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Log detailed error info (both dev and production for debugging)
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL: error.config?.baseURL + error.config?.url,
        message: error.response.data?.message,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("API Request Error - No response received:", {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        message: "Network error or server not responding",
      });
    } else {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
