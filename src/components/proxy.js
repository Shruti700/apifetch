const http = require('http');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Set up an HTTP server to listen for incoming requests
const server = http.createServer((req, res) => {
  // Define the target URL where you want to forward the requests
  const target = 'http://43.204.41.142:8080/'; // Replace with your target URL

  // Define CORS headers for your proxy
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Create a proxy middleware instance with CORS support
  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true, // Required for CORS support
    // Add any other proxy options here if needed
  });

  // Use the proxy middleware to forward the request to the target server
  proxy(req, res);
});

// Listen on a specific port (e.g., 3001)
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
