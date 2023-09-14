// 1. Base Tracker, Meal & Workout Class

class CalorieTracker{
constructor(){
// this._calorieLimit = 2000

// 80.
this._calorieLimit = Storage.getCalorieLimit()
// this._totalCalories = 0


// 82. Persist Total Calories To Local Storage
this._totalCalories = Storage.getTotalCalories(0)


// 92. Save Meals To Local Storage
// this._meals = []
this._meals = Storage.getMeals()

// 99.
// this._workouts = []
this._workouts = Storage.getWorkouts()
 

// 16. (Display Tracker Stats)
this._displayCaloriesLimit()


// 10. (Display Tracker Stats)
this._displayCaloriesTotal()

// 20. (Display Tracker Stats)
this._displayCaloriesConsumed()

// 23. (Display Tracker Stats)
this._displayCaloriesBurned()

// 26. (Display Tracker Stats)
this._displayCaloriesRemaining()

// 30. (Progress Bar & Calorie Alert)
this._displayCaloriesProgress()

// 107. Clear Storage Items
document.getElementById('limit').value = this._calorieLimit

}


// Public Methods/API //

// 2. Base Tracker, Meal & Workout Class
addMeal(meal) {
this._meals.push(meal)
this._totalCalories += meal.calories

// 85.
Storage.updateTotalCalories(this._totalCalories) 


// 91. Save Meals To Local Storage
Storage.saveMeal(meal)

// 12. (Display Tracker Stats)
this._render()


// 55. 
this._displayNewMeal(meal)


}

// 3. Base Tracker, Meal & Workout Class
addWorkout(workout) {
  this._workouts.push(workout)
  this._totalCalories -= workout.calories

// 86.
Storage.updateTotalCalories(this._totalCalories)


// 100.
Storage.saveWorkout(workout)

  // 13. Display Tracker Stats
  this._render()

// 57. 
this._displayNewWorkout(workout)

  }


  // 61. 
removeMeal(id){

// want to find the index of the meal want to remove using find index method, the array is _meals, the findIndex() takes in a calback function. If it doen not match it will be negative -1 otherwise it will be the actual index.  
const index = this._meals.findIndex((meal) => meal.id === id) 

if(index !== -1){
  const meal = this._meals[index]
  // take away the calories for that meal
  this._totalCalories -= meal.calories
  // want to take the meal out of the array completely, _meals is an array 
  this._meals.splice(index, 1)

// 87.
Storage.updateTotalCalories(this._totalCalories)

  // 105. set to local storage
  Storage.removeMeal(id)

  // then we want to render 
  this._render()
}
}


  // 62. 
  removeWorkout(id){

    // want to find the index of the workout want to remove using find index method, the array is _workouts, the findIndex() takes in a calback function. If it doen not match it will be negative -1 otherwise it will be the actual index.  
    const index = this._workouts.findIndex((workout) => workout.id === id) 
    
    if(index !== -1){
      const workout = this._workouts[index]
      // take away the calories for that meal
      this._totalCalories += workout.calories

// 88.
Storage.updateTotalCalories(this._totalCalories)



  // 106. set to local storage
  Storage.removeWorkout(id)


      // want to add the workout in the array, _workouts is an array 
      this._workouts.splice(index, 1)
      // then we want to render 
      this._render()
    }
    }

    // 71.
    reset(){
      this._totalCalories = 0
      this._meals = [];
      this._workouts = [];

      // 108. Clear Storage Items
      Storage.clearAll()

      this._render()
      }

      // 77. 
      setLimit(calorieLimit){
        this._calorieLimit = calorieLimit

        // 81. 
        Storage.setCalorieLimit(calorieLimit)
        this._displayCaloriesLimit()
        this._render()
      }


// 93. Save Meals To Local Storage
loadItems(){
this._meals.forEach(meal => this._displayNewMeal(meal))

// 101.
this._workouts.forEach(workout => this._displayNewWorkout(workout))

}




// Private Methods //

// 9. Display Tracker Stats
_displayCaloriesTotal(){
const totalCaloriesEl = document.getElementById('calories-total')
 totalCaloriesEl.innerHTML = this._totalCalories
}


// 15. display the limit (max 2000)
_displayCaloriesLimit(){
  const calorieLimitEl = document.getElementById('calories-limit')
  calorieLimitEl.innerHTML = this._calorieLimit
  }


// 17. (Display Tracker Stats) consumed and burned little calculation only have total calories what came or did we burn from the workout and what did we consume from meals. We can use the reduce() high order array method

_displayCaloriesConsumed(){
const caloriesConsumedEl = document.getElementById('calories-consumed')

// 18. (Display Tracker Stats) taking all of the calories in the meals array and adding them together using reduce() high order array method which takes in a callback function and takes two arguments the accumulator and the other whatever we want to call each meal
const consumed = this._meals.reduce((total, meal)=> total + meal.calories, 0) //total begins or is set at 0. It will loop through all the meals and add the first meal calories then loop again and add the second meal calories


// 19. output Display Tracker Stats
caloriesConsumedEl.innerHTML = consumed

}



// 22. burned workout array calories (Display Tracker Stats)
_displayCaloriesBurned(){
  const caloriesBurnedEl = document.getElementById('calories-burned')
   
  const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0) 
  
  caloriesBurnedEl.innerHTML = burned

}


// 25. Display Tracker Stats
_displayCaloriesRemaining(){


 // 35. (Progress Bar & Calorie Alert)
 const progressEl = document.getElementById('calorie-progress')  

const caloriesRemainingEl = document.getElementById('calories-remaining')
  
// calorie limit -total calories
const remaining = this._calorieLimit - this._totalCalories

caloriesRemainingEl.innerHTML = remaining 


// 32. change calories remaing element to red negative (Progress Bar & Calorie Alert)

if(remaining <= 0){

  caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light')
  caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger')

// 33. change color of progress bar (Progress Bar & Calorie Alert)
progressEl.classList.remove('bg-success')
progressEl.classList.add('bg-danger')


}else{
  caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger')
  caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light')

  // 34. change color of progress bar (Progress Bar & Calorie Alert)
progressEl.classList.remove('bg-danger')
progressEl.classList.add('bg-success')

}

}


// 28. (Progress Bar & Calorie Alert)
_displayCaloriesProgress(){

  const progressEl = document.getElementById('calorie-progress')
  
  const percentage = (this._totalCalories / this._calorieLimit) * 100
  
  const width = Math.min(percentage, 100)
  progressEl.style.width = `${width}%`
  }


// 56. Display New Meal & Workout
_displayNewMeal(meal){
  const mealsEl = document.getElementById('meal-items');

  const mealEl = document.createElement('div')
  mealEl.classList.add('card', 'my-2')
  mealEl.setAttribute('data-id', meal.id)
  mealEl.innerHTML = `
  <div class="card-body">
  <div class="d-flex align-items-center justify-content-between">
    <h4 class="mx-1">${meal.name}</h4>
    <div
      class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
    >
    ${meal.calories}
    </div>
    <button class="delete btn btn-danger btn-sm mx-2">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</div>
  `;

  mealsEl.appendChild(mealEl)

}



// 58. 
_displayNewWorkout(workout){
  const workoutsEl = document.getElementById('workout-items');

  const workoutEl = document.createElement('div')
  workoutEl.classList.add('card', 'my-2')
  workoutEl.setAttribute('data-id', workout.id)
  workoutEl.innerHTML = `
  <div class="card-body">
  <div class="d-flex align-items-center justify-content-between">
    <h4 class="mx-1">${workout.name}</h4>
    <div
      class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
    >
    ${workout.calories}
    </div>
    <button class="delete btn btn-danger btn-sm mx-2">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</div>
  `;

  workoutsEl.appendChild(workoutEl)

}






// 11. Display Tracker Stats
// need to render it for output not a framework this is vanilla js and can call it where you need it.
_render(){
this._displayCaloriesTotal()

// 21. Display Tracker Stats
this._displayCaloriesConsumed()

// 24. Display Tracker Stats
this._displayCaloriesBurned()

// 27. Display Tracker Stats
this._displayCaloriesRemaining()

// 29. (Progress Bar & Calorie Alert)
this._displayCaloriesProgress()
}


  }






// 4. Base Tracker, Meal & Workout Class

class Meal {
constructor(name, calories){
this.id = Math.random().toString(16).slice(2) //hexadecimal 16 base number to create unique id. A hexadecinal start's with 0 so to get rid of the 0. can add on .slice(2)

this.name = name
this.calories = calories
}
}


// 5. Base Tracker, Meal & Workout Class
class Workout {
  constructor(name, calories){
  this.id = Math.random().toString(16).slice(2) 
  this.name = name
  this.calories = calories
  }
  }
  



// 36. App Class, New Meal & Workout
// ---delete start here---

// // 6. Base Tracker, Meal & Workout Class
// // instantiate or initialise tracker  
// const tracker = new CalorieTracker();


// // 7. Base Tracker, Meal & Workout Class
// // add a meal 
// // const breakfast = new Meal('name', 'calories')
// const breakfast = new Meal('Breakfast', 400)
// tracker.addMeal(breakfast)

// // 14. add another meal & 31. (Progress Bar & Calorie Alert)
// const lunch = new Meal('Lunch', 350)
// tracker.addMeal(lunch)

// // 8. Base Tracker, Meal & Workout Class
// // add a workout 
// const run = new Workout('Morning Run', 320)
// tracker.addWorkout(run)

// console.log(tracker._meals)
// console.log(tracker._workouts)
// console.log(tracker._totalCalories)

// ---delete end here---




// 78.Storage Class & Calorie Limit Persist

// all of these methods will be static we don't need multiple instances of storage it is local storage only one entity don't need to instantiate a storage class just want to call storage dot whatever method 
class Storage{

  static getCalorieLimit(defaultLimit = 2000){
    let calorieLimit;

    // check in local storage already
    if(localStorage.getItem('calorieLimit') === null){
      calorieLimit = defaultLimit
    }else{
      calorieLimit = +localStorage.getItem('calorieLimit')
    }
    
    return calorieLimit
  }

// 79.
static setCalorieLimit(calorieLimit){

localStorage.setItem('calorieLimit', calorieLimit)
}

// 83. 
static getTotalCalories(defaultCalories = 0){
  let totalCalories;

  // check in local storage already
  if(localStorage.getItem('totalCalories') === null){
    totalCalories = defaultCalories
  }else{
    totalCalories = +localStorage.getItem('totalCalories')
  }
  
  return totalCalories
}


// 84.
static updateTotalCalories(calories){
  localStorage.setItem('totalCalories', calories)
}



// 89. Save Meals To Local Storage
static getMeals(){
  let meals;

  // check in local storage already
  if(localStorage.getItem('meals') === null){
    meals = []
  }else{
    meals = JSON.parse(localStorage.getItem('meals'))
  }

  return meals
}

// 90. Save Meals To Local Storage
static saveMeal(meal){
const meals = Storage.getMeals();
meals.push(meal)
localStorage.setItem('meals', JSON.stringify(meals))
}


// 102. Remove Meals & Workouts From LocalStorage
static removeMeal(id){
const meals = Storage.getMeals()
meals.forEach((meal, index)=>{
  if(meal.id === id){
    meals.splice(index, 1) //takeaway 1
  }
})

// 103.
localStorage.setItem('meals', JSON.stringify(meals));
}



// 97.
// workouts 
static getWorkouts(){
  let workouts;

  // check in local storage already
  if(localStorage.getItem('workouts') === null){
    workouts = []
  }else{
    workouts = JSON.parse(localStorage.getItem('workouts'))
  }

  return workouts
}

// 98.
static saveWorkout(workout){
const workouts = Storage.getWorkouts();
workouts.push(workout)
localStorage.setItem('workouts', JSON.stringify(workouts))
}



// 103. Remove Meals & Workouts From LocalStorage
static removeWorkout(id){
  const workouts = Storage.getWorkouts() //get from local storage
  workouts.forEach((workout, index)=>{ //loop through
    if(workout.id === id){
      workouts.splice(index, 1) //check id that is passed in take it out by splice, splice it at that index and take out 1
    }
  })
  
  // 104. set to local storage
  localStorage.setItem('workouts', JSON.stringify(workouts));
  }
  
   // 109. Clear Storage Items
static clearAll(){

  // clears all
  // localStorage.clear()

  // individually
  localStorage.removeItem('totalCalories')
  localStorage.removeItem('meals')
  localStorage.removeItem('workouts')
}
}


// 37. App Class New Meal & Workout

class App{
constructor(){
this._tracker = new CalorieTracker()

// 95. add a function to put all event listeners in their own method
this._loadEventListeners()



// 94. Save Meals To Local Storage

this._tracker.loadItems()
}


// 96. add a function to put all event listeners in their own method
// ---start---
_loadEventListeners(){
// 48.
document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this, 'meal'));



// 38.
// document.getElementById('meal-form').addEventListener('submit', this._newMeal.bind(this));
// when we call a method inside of a callback it is called as a regular function that the this keyword is going to be the window object. 

// In this situation if it is on an event listener this is going to be the element the event is on, e.g. <form id="meal-form">…</form> if it in a regular function then it is the window object. 

// We want this console.log(this) to pertain link to the new app we initialised const app = new App() so we can use bind() as when we have our callback in the event listener we can add .bind(this) and pass in this, then this will pertain to the our app in console: App {_tracker: CalorieTracker}
 
// 45. 

// document.getElementById('workout-form').addEventListener('submit', this._newWorkout.bind(this));


// 49.
document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'));



// 59. 
// multiple deletes so will use event delegation traget the items parent div then target the button

document.getElementById('meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'))
// we want the this keyword to be the actual object rather than the element we click so use .bind(this), also passing in the type

// 63.
document.getElementById('workout-items').addEventListener('click', this._removeItem.bind(this, 'workout'));

// 64. Meals Filter and Reset
document.getElementById('filter-meals').addEventListener('keyup', this._filterItems.bind(this, 'meal'))


// 65. Workouts Filter and Reset
document.getElementById('filter-workouts').addEventListener('keyup', this._filterItems.bind(this, 'workout'))


// 69. reset
document.getElementById('reset').addEventListener('click', this._reset.bind(this))

// 72. Set Calorie Limit
document.getElementById('limit-form').addEventListener('submit', this._setLimit.bind(this))

}
// ---end 96.---


// 39. and 51.
_newItem(type, e){ //pass in event
  e.preventDefault() //since this is a submit event
  // console.log(this) 

  // 41.
  // we could set these variables to .value at the end as this is how we get an input value. I like to have the variables just to the element iteself and just add on .value as and when you need it.

  // 52. 
const name = document.getElementById(`${type}-name`)
const calories = document.getElementById(`${type}-calories`)


// const name = document.getElementById('meal-name')
// const calories = document.getElementById('meal-calories')

 // 42. validate inputs

if(name.value === '' || calories.value === ''){
alert('Please fill in all fields')
return
}

// 53.
if(type === 'meal'){
  const meal = new Meal(name.value, +calories.value)
  this._tracker.addMeal(meal)
}else{
  const workout = new Workout(name.value, +calories.value)
  this._tracker.addWorkout(workout)
}



// 43. and 54.
// const meal = new Meal(name.value, +calories.value)
// this._tracker.addMeal(meal)
name.value = ''
calories.value = ''


// 46. collapse the meal bootstrap dropdown
const collapseItem = document.getElementById(`collapse-${type}`)

// we have access because we are including the bootstrap javascript file.
const bsCollapse = new bootstrap.Collapse(collapseItem, {
toggle: true
})
}



// 60. 
_removeItem(type, e){
if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')){

  if(confirm('Are you sure?')){
    // console.log('delete')
    const id = e.target.closest('.card').getAttribute('data-id')
    // console.log(id)

    type === 'meal'
    ? this._tracker.removeMeal(id)
    : this._tracker.removeWorkout(id);

  e.target.closest('.card').remove()
  }
}
}

// 66. 
_filterItems(type, e){
const text = e.target.value.toLowerCase() 
// console.log(text)

// loop through the items want to get the id for the meals and wokouts `#${type}-items` and the class of .card targeting the card item and then loop through

// 67. 
document.querySelectorAll(`#${type}-items .card`).forEach((item)=> {
  // the item in the forEach is the card we want to get the chilc of the child and then the text content which is the name because that is what we want to filter

  // firstChild pertains to all nodes if it an element, comment or text we want we just want to deal with elements firstChildElement  

// 68. 
const name = item.firstElementChild.firstElementChild.textContent

if(name.toLowerCase().indexOf(text) !== -1){
// indexOf if it does not match the result is negative -1 if it is a match want it to show

item.style.display = 'block'
}else{
item.style.display = 'none'
}
})
}

// 70. reset
_reset(){

// the tracker is to do with calories, two arrays, meals and workouts     
this._tracker.reset()

// clear up any meals workout items anything to do with the dom 
document.getElementById('meal-items').innerHTML = ''
document.getElementById('workout-items').innerHTML = ''

// input so use value 
document.getElementById('filter-meals').value = ''
document.getElementById('filter-workouts').value = ''
} 

// 73.
// e event object
_setLimit(e){
  // since it is a form preventDefault
  e.preventDefault()

  // get limit 2000 
  const limit = document.getElementById('limit')


//  74.  
if(limit.value === 0){
  alert('Please add a limit')
  return
}

// since the calorie limit is in the tracker call a method in the tracker add a + as a number as it is passed as a string  

// 75.
this._tracker.setLimit(+limit.value)
limit.value = ''

// 76. 
// close the bootstrap popup
const modalEl = document.getElementById('limit-modal')
const modal = bootstrap.Modal.getInstance(modalEl)
modal.hide()

}




// 50. delete _newWorkout(e) edit 39. _newMeal() renamed to newItem()
// ---44. Start---
// _newWorkout(e){ //pass in event
//   e.preventDefault() //since this is a submit event
//   // console.log(this) 

//   // we could set these variables to .value at the end as this is how we get an input value. I like to have the variables just to the element iteself and just add on .value as and when you need it.
// const name = document.getElementById('workout-name')
// const calories = document.getElementById('workout-calories')

// if(name.value === '' || calories.value === ''){
// alert('Please fill in all fields')
// return
// }

// const workout = new Workout(name.value, +calories.value)
// this._tracker.addWorkout(workout)
// name.value = ''
// calories.value = ''
// // ---44. End---


// // 47. collapse the workout bootstrap dropdown
// const collapseWorkout = document.getElementById('collapse-workout')
// // we have access because we are including the bootstrap javascript file.
// const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
// toggle: true

// })
// }





}

// 40.
const app = new App() //we have to initialise our app only thing we have to do to kick off our entire application which will run the constructor and then everything basically happens from there..  





