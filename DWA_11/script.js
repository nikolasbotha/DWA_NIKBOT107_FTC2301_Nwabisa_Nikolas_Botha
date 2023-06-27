// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import store from './redux/store';
// import { Provider } from 'react-redux';

// ReactDOM.render(
// 	<React.StrictMode>
// 		<Provider store={store}>
// 			<App />
// 		</Provider>
// 	</React.StrictMode>,
// 	document.getElementById('root')
// );


// const MAX_NUMBER = 15
// const MIN_NUMBER = -5
// const STEP_AMOUNT = 1


// const number = document.querySelector('[data-key="number"]')
// const subtract = document.querySelector('[data-key="subtract"]')
// const add = document.querySelector('[data-key="add"]')
// const reset = document.querySelector('[data-key="reset"]')



// const subtractHandler = () => {
//     const newValue = parseInt(number.value) - STEP_AMOUNT;
//     number.value = newValue;

//     if (add.disabled === true) {
//         add.disabled = false;
//     }

//     if (newValue <= MIN_NUMBER) {
//         subtract.disabled = true;
//     } 
    
// }

// const addHandler = () => {
//     const newValue = parseInt(number.value) + STEP_AMOUNT;
//     number.value = newValue;

//     if (subtract.disabled === true) {
//         subtract.disabled = false;
//     }
    
//     if (newValue >= MAX_NUMBER) {
//         add.disabled = true;
//     } 
    
// }

// const resetCounter = () => {
//     number.value = 0
// }

// subtract.addEventListener('click', subtractHandler)
// add.addEventListener('click', addHandler)
// reset.addEventListener('click', resetCounter)