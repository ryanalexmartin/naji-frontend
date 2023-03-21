const backendURL = process.env.NODE_ENV === "production" ? "https://yourdomain.com" : "http://localhost:8080";

export { backendURL };