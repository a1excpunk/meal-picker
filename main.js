const CHOSEN_MEAL = document.getElementById('chosen-meal');
const PICKER_BTN = document.getElementById('btn-picker');

const INGREDIENTS_INPUT = document.getElementById('ingredient');
const SEARCH_BTN = document.getElementById('btn-search');
const MATCHED_MEAL = document.getElementById('matched-meal');
const FIND_MEAL_CLEAR_BTN = document.getElementById('btn-findMeal-clear');

const ADD_MEAL_BTN = document.getElementById('btn-add-meal');
const ADD_MEAL_INPUT = document.getElementById('addMeal');
const ADDED_MEAL_SUCCESS = document.getElementById('added-success');

const DELETE_ALL_MEAL = document.getElementById('btn-delete-meals');
const DELETE_ALL_MEAL_MESSAGE = document.getElementById('delete-message');

const BMI_RESULT = document.getElementById('bmi-result');
const BMI_WEIGHT_INPUT = document.getElementById('weight');
const BMI_HEIGHT_INPUT = document.getElementById('height');
const BMI_CALCULATE_BTN = document.getElementById('btn-bmi-calculate');
const BMI_CLEAR_BTN = document.getElementById('btn-bmi-clear');


let meals = localStorage.getItem(0);
let allMeals ;

if(meals ===null){
    allMeals = [];
}else{
    allMeals = JSON.parse(meals);
}

function randomizer() {
    return Math.floor(Math.random() * allMeals.length)
}

function searchIngredients(ingredient) {
    return allMeals.map(meal => meal.match(ingredient));
}

function bmiFormula(weight, height) {
    return (weight / (height ** 2) * 10000).toFixed(1);
}

function redMessage(element){
    element.style.backgroundColor = '#ffbebe';
    element.style.color = '#c20000';
    element.style.fontSize = '14px'
}

function greenMessage(element){
    element.style.backgroundColor = '#d4ffdd';
    element.style.color = '#00af26';
    element.style.fontSize = '14px'
}

function initialStyle (element){
    element.style.backgroundColor = 'initial'
    element.style.color = 'initial'
    element.style.fontSize = 'initial'
}

PICKER_BTN.addEventListener('click', () => {
    if (allMeals[0] === undefined) {
        CHOSEN_MEAL.innerText = 'there is no meal, add some first'
        redMessage(CHOSEN_MEAL);
    } else {
        CHOSEN_MEAL.style.backgroundColor = 'transparent'
        CHOSEN_MEAL.style.color = 'initial'
        CHOSEN_MEAL.innerText = allMeals[randomizer()]
    }
});


SEARCH_BTN.addEventListener('click', () => {
    if (!INGREDIENTS_INPUT.value) {
        MATCHED_MEAL.innerText = "forgot to write key word"
        redMessage(MATCHED_MEAL)
    } else if (searchIngredients(INGREDIENTS_INPUT.value).every((val) => val === null)) {
        MATCHED_MEAL.innerText = "there is no meal to match or you spelled it wrong"
        redMessage(MATCHED_MEAL)

    }
    else if (searchIngredients(INGREDIENTS_INPUT.value) !== null) {
        initialStyle(MATCHED_MEAL)
        if (MATCHED_MEAL.hasChildNodes()) {
            MATCHED_MEAL.innerHTML = ''
        }

        for (let i = 0; i < searchIngredients(INGREDIENTS_INPUT.value).filter(matchedMeal => matchedMeal !== null).length; i++) {
            let mealContainer = document.createElement('p');
            MATCHED_MEAL.appendChild(mealContainer);
            mealContainer.innerText = `${i + 1}) ${searchIngredients(INGREDIENTS_INPUT.value).filter(matchedMeal => matchedMeal !== null)[i]['input']}`

        }
        console.log(searchIngredients(INGREDIENTS_INPUT.value));
        INGREDIENTS_INPUT.value = ''
    }
});

FIND_MEAL_CLEAR_BTN.addEventListener('click', () => {
    MATCHED_MEAL.innerHTML = '';
    INGREDIENTS_INPUT.value = '';
    initialStyle(MATCHED_MEAL)
});

BMI_CALCULATE_BTN.addEventListener('click', () => {
    let bmiResult = bmiFormula(BMI_WEIGHT_INPUT.value, BMI_HEIGHT_INPUT.value);
    if (!(BMI_HEIGHT_INPUT.value || BMI_HEIGHT_INPUT.value)) {
        BMI_RESULT.innerText = "forgot to enter parameters";
    } else {
        BMI_RESULT.innerText = bmiResult;
    }
});

BMI_CLEAR_BTN.addEventListener('click', () => {
    BMI_HEIGHT_INPUT.value = ''
    BMI_WEIGHT_INPUT.value = ''
    BMI_RESULT.innerText = '0'
})

ADD_MEAL_BTN.addEventListener('click', () => {

    if (!ADD_MEAL_INPUT.value) {
        ADDED_MEAL_SUCCESS.innerText = 'forgot to write meal';
        redMessage(ADDED_MEAL_SUCCESS)
    }
    if (ADD_MEAL_INPUT.value) {
        ADDED_MEAL_SUCCESS.innerText = 'Meal Successfully Added';
        greenMessage(ADDED_MEAL_SUCCESS)
        allMeals.push(ADD_MEAL_INPUT.value);
        localStorage.setItem(0, JSON.stringify(allMeals));
        ADD_MEAL_INPUT.value = ''
    }
    ADDED_MEAL_SUCCESS.classList.remove('hide');
    setTimeout(() => ADDED_MEAL_SUCCESS.classList.add('hide'), 2000);

})

DELETE_ALL_MEAL.addEventListener('click', () => {
    localStorage.clear()
})
