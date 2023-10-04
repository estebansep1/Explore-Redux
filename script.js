// DOM elements
const valueEl = document.getElementById('value')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const plusFiveBtn = document.getElementById('plusFive')
const minusFiveBtn = document.getElementById('minusFive')
const incrementIfOddBtn = document.getElementById('incrementIfOdd')
const incrementAsyncBtn = document.getElementById('incrementAsync')
const customSubmitBtn = document.getElementById('customSubmit')

// initial state value
const initialState = {
    value: 0
}

// reducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 }
        case 'counter/decremented':
            return { value: state.value - 1 }
        case 'counter/addFive':
          return { value: state.value + 5 }
        case 'counter/subFive':
          return { value: state.value - 5 }
        case 'counter/custom':
          return { value: state.value + action.payload }
        default:
          return state
    }
}

// action object definitions
const addAction = {
  type: 'counter/incremented'
}

const subAction = {
  type: 'counter/decremented'
}

const addFiveAction = {
  type: 'counter/addFive'
}

const subFiveAction = {
  type: 'counter/subFive'
}

// generating the store
let store = Redux.createStore(counterReducer)

// defining render
const render = () => {
    const state = store.getState()
    valueEl.innerHTML = state.value.toString()
}

// establishing dispatch functions
const addOne = () => {
  store.dispatch(addAction)
}

const subOne = () => {
  store.dispatch(subAction)
}

const addFive = () => {
  store.dispatch(addFiveAction)
}

const subFive = () => {
  store.dispatch(subFiveAction)
}

const incrementIfOdd = () => {
  if (store.getState().value % 2 !== 0) {
    store.dispatch(addAction)
  }
}

const incrementAsync = () => {
  setTimeout(() => {
    store.dispatch(addAction)
  }, 1000);
}

const customSubmit = () => {
  store.dispatch({
    type: 'counter/custom',
    payload: +document.getElementById('customInput').value
  })
}

// event listeners
plusBtn.addEventListener('click', addOne)
minusBtn.addEventListener('click', subOne)
plusFiveBtn.addEventListener('click', addFive)
minusFiveBtn.addEventListener('click', subFive)
incrementIfOddBtn.addEventListener('click', incrementIfOdd)
incrementAsyncBtn.addEventListener('click', incrementAsync)
customSubmitBtn.addEventListener('click', customSubmit)

// initial render
render()

// subscribe reruns render on dispatch
store.subscribe(render)