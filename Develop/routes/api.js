const router = require('express').Router();
const Workout = require('./../models/workout');

//add a new workout
router.post('/api/workouts', (req, res) => {
    Workout.create({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err)
        });
});

//public folder already has defined routes so make sure that the routes match up on the front end 

router.put('/api/workouts:id', (req, res) => {
    
})
//add exercises to workout //insert 
//put route - api/workouts/id
//push exercise into workout array
//pass workout id into route with exercise as cream filling


//get all workouts
// /api/workouts


//get specific workout
//to continue workout??
//gets last 7 workouts
// /api/workouts/range


//delete workout 
// /api/workouts



module.exports = router;