const express = require('express')
const Tasks = require('../models/tasks')
const auth = require('../middleware/auth')
const router = new express.Router()


//Route for a new task - post endpoint
router.post('/tasklist', auth, async (req, res) => {
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) { res.status(400).send(e) }
})

// FILTERING
//Get requests for multiple tasks, filtered: GET /tasklist?Completed=true
//PAGINATION
// limit & skip: GET /tasklist?limit=10&skip=0
// skip: pages are defined by # of results returned in limit: pg 1 starts at 0, next starts at 10
//SORTING
// Get /tasklist?sortBy=createdAt:desc

router.get('/tasklist', auth, async (req, res) => {
    const match = {} //req.query.completed
    const sort = {}
    if (req.query.Completed) {
        match.Completed = req.query.Completed === 'true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        //const task = await req.user.populate('tasks')
        const tasks = await Tasks.find({
            owner: req.user._id,
            ...match
        })
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
            .sort(sort)

        res.send(tasks)
    } catch (error) { res.status(500).send() }
})

// Get requests for single task
router.get('/tasklist/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        //const task = await Tasks.findById(_id)
        const task = await Tasks.findOne({ _id, owner: req.user._id })
        if (!task) { return res.status(404).send() }
        res.send(task)
    } catch (e) { res.status(500).send() }
})

// updating an existing Task resource
router.patch('/tasklist/:id', auth, async (req, res) => {
    // validate that updates are permitted and valid for the data
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Description', 'Completed']
    const isValidOp = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOp) { return res.status(400).send({ error: `Invalid updates` }) }
    //  process the update
    try {
        const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) { return res.status(404).send() }
        updates.forEach((update) =>
            task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) { res.status(500).send(e) }
})

//  delete task
router.delete('/tasklist/:id', auth, async (req, res) => {
    try {
        const task = await Tasks.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
        if (!task) { return res.status(404).send() }
        res.send(task)
    } catch (e) { res.status(500).send() }
})

module.exports = router