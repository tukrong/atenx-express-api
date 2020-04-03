// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
// const passport = require('passport')

// pull in Mongoose model for clients
let Client = require('../models/client')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
// const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
// const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
// const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { client: { title: '', text: 'foo' } } -> { client: { text: 'foo' } }
// const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
// const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.get('/clients', (req, res, next) => {
  Client.find()
    .then(clients => res.json(clients))
    // respond with status 200 and JSON of the clients
    // .then(clients => res.status(200).json({ clients: clients }))
    // if an error occurs, pass it to the handler
    .catch(console.error)
})

// INDEX
// GET /clients
// router.get('/clients', requireToken, (req, res, next) => {
//   Client.find()
//     .then(clients => res.json(clients))
//     // respond with status 200 and JSON of the clients
//     // .then(clients => res.status(200).json({ clients: clients }))
//     // if an error occurs, pass it to the handler
//     .catch(next)
// })

// router.get('/clients/:id', requireToken, (req, res, next) => {
//   Client.findById(req.params.id)
//     .then(handle404)
//     .then(client => res.status(200).json({ client: client.toObject() }))
//     .catch(next)
// })

// CREATE
// POST /clients
router.post('/create-client', (req, res, next) => {
  // set owner of new client to be current user
  const fullname = req.body.fullname
  const newClient = new Client({ fullname })

  newClient.save()
    .then(() => res.json('Client added!'))
    // .then(handle404)
    .catch(console.error)
})

// router.post('/create-client', requireToken, (req, res, next) => {
//   // set owner of new example to be current user
//   req.body.client.owner = req.user.id
//
//   Client.create(req.body.client)
//     // respond to succesful `create` with status 201 and JSON of new "client"
//     .then(client => {
//       res.status(201).json({ client: client.toObject() })
//     })
//     // if an error occurs, pass it off to our error handler
//     // the error handler needs the error message and the `res` object so that it
//     // can send an error message back to the client
//     .catch(next)
// })

// UPDATE
// PATCH /clients/5a7db6c74d55bc51bdf39793
// router.patch('/clients/:id', requireToken, removeBlanks, (req, res, next) => {
//   // if the client attempts to change the `owner` property by including a new
//   // owner, prevent that by deleting that key/value pair
//   delete req.body.client.owner
//
//   Client.findById(req.params.id)
//     .then(handle404)
//     .then(client => {
//       // pass the `req` object and the Mongoose record to `requireOwnership`
//       // it will throw an error if the current user isn't the owner
//       requireOwnership(req, client)
//
//       // pass the result of Mongoose's `.update` to the next `.then`
//       return client.updateOne(req.body.client)
//     })
//     // if that succeeded, return 204 and no JSON
//     .then(() => res.sendStatus(204))
//     // if an error occurs, pass it to the handler
//     .catch(next)
// })
//
// // DESTROY
// // DELETE /clients/5a7db6c74d55bc51bdf39793
// router.delete('/clients/:id', requireToken, (req, res, next) => {
//   Client.findById(req.params.id)
//     .then(handle404)
//     .then(client => {
//       // throw an error if current user doesn't own `client`
//       requireOwnership(req, client)
//       // delete the client ONLY IF the above didn't throw
//       client.deleteOne()
//     })
//     // send back 204 and no content if the deletion succeeded
//     .then(() => res.sendStatus(204))
//     // if an error occurs, pass it to the handler
//     .catch(next)
// })

module.exports = router
