// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
// const passport = require('passport')

// pull in Mongoose model for exercises
let Exercise = require('../models/exercise')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
// const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { exercise: { title: '', text: 'foo' } } -> { exercise: { text: 'foo' } }
// const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
// const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()
// INDEX
// GET /exercises
router.get('/exercises', (req, res, next) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    // respond with status 200 and JSON of the exercises
    .then(handle404)
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /exercises/5a7db6c74d55bc51bdf39793
router.get('/exercises/:id', (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Exercise.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "exercise" JSON
    .then(exercise => res.status(200).json({ exercise: exercise.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /exercises
router.post('/create-exercises', (req, res, next) => {
  const fullname = req.body.fullname
  // Convert age to number data type
  const age = Number(req.body.age)
  const description = req.body.description
  // Convert duration to number data type
  const duration = Number(req.body.duration)
  // Convert date to number data type
  const date = Date.parse(req.body.date)
  // Create new exercise using the variable above
  const newExercise = new Exercise({
    fullname,
    age,
    description,
    duration,
    date
  })
  newExercise.save()
    .then(handle404)
    .then(() => res.json('Exercise saved'))
    .catch(next)
})

// UPDATE
// PATCH /exercises/5a7db6c74d55bc51bdf39793
router.patch('/exercises/:id', (req, res, next) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.name = req.body.name
      exercise.age = Number(req.body.age)
      exercise.description = req.body.description
      exercise.duration = Number(req.body.duration)
      exercise.date = Date.parse(req.body.date)

      exercise.save()
        .then(() => res.json('Exercise updated'))
        .catch(err => res.status(400).json('Error' + err))
    })
    .then(handle404)
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /exercises/5a7db6c74d55bc51bdf39793
router.delete('/exercises/:id', (req, res, next) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(handle404)
    .then(() => res.json('Exercise deleted'))
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
