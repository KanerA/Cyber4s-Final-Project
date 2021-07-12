const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/stands',
    createProxyMiddleware({
      target: 'http://bon-appetite-node:8080', // uncomment for docker
    //   target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/drinks',
    createProxyMiddleware({
      target: 'http://bon-appetite-node:8080', // uncomment for docker
    //   target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/dishes',
    createProxyMiddleware({
      target: 'http://bon-appetite-node:8080', // uncomment for docker
    //   target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://bon-appetite-node:8080', // uncomment for docker
    //   target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};