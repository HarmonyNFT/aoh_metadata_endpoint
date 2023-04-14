const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))

// Middleware function to deny PUT and DELETE requests
server.use((req, res, next) => {
  if (req.method === 'PUT' || req.method === 'DELETE') {
    res.status(403).json({ message: 'PUT and DELETE requests are not allowed' })
  } else {
    next()
  }
})

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
