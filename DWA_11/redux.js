// Setting  up a simple REDUX like store

const createStore = (reducer) => {
    let state;
    let listeners = [];
  
    const getState = () => state;
  
    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    };
  
    const subscribe = (listener) => {
      listeners.push(listener);
  
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    };
  
    dispatch({});
  
    return {
      getState,
      dispatch,
      subscribe,
    };
  };
  

// Set up Reducer
const reducer = (state = 0, action) => {
    switch (action.type) {
      case 'ADD_COUNTER':
        console.log("ADD")
        return state + 1;
      case 'SUBTRACT_COUNTER':
        console.log("SUB")
        return state - 1;
      case 'RESET_COUNTER':
        console.log("RESET")
        return state = 0;
      default:
        return state;
    }
  };


// // Create Redux Store for counter
const store = createStore(reducer);


// Get DOM elements with query selectors
const html = {
    value: document.querySelector('[data-key="number"]'),
    addButton: document.querySelector('[data-key="add"]'),
    subtractButton: document.querySelector('[data-key="subtract"]'),
    resetButton: document.querySelector('[data-key="reset"]'),
  };



  // Update DOM
  const updateCounter = () => {
    const counter = store.getState();
    html.value.innerHTML = counter;
  };
  
  // Subscribe to store update
  store.subscribe(updateCounter);
  
  // Event listeners for buttons
  html.addButton.addEventListener('click', () => {
    store.dispatch({ type: 'ADD_COUNTER' });
  });
  
  html.subtractButton.addEventListener('click', () => {
    store.dispatch({ type: 'SUBTRACT_COUNTER' });
  });
  
  html.resetButton.addEventListener('click', () => {
    store.dispatch({ type: 'RESET_COUNTER' });

  });


