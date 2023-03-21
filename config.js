const backendURL = process.env.NODE_ENV === "production" ? "https://yourdomain.com" : "localhost:8080";

export { backendURL };