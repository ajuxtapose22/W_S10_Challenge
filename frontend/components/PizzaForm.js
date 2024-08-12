import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrder, resetForm } from '../state/pizzaFomSlice';
import { useSubmitOrderMutation } from '../state/createApi';

const CHANGE_INPUT = "CHANGE_INPUT"
const CHANGE_CHECKBOX = "CHANGE_CHECKBOX"
const RESET_FORM = "RESET_FORM"

const initialState = { 
  fullName: '',
  size: '',
  toppings: {
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false}
}

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload
      return { ...state, [name]: value }
    }
    case CHANGE_CHECKBOX: {
      const { toppingId, checked } = action.payload
      return { ...state, toppings: { ...state.toppings, [toppingId]: checked}}
    }
    case RESET_FORM:
      return initialState;
    default:
      return state
  }
}

export default function PizzaForm({ formState }) {
const [state, dispatch] = useReducer(reducer,initialState)
const [submitOrder, {isLoading, isError}] = useSubmitOrderMutation()

const onInputChange = (evt) => {
  const { name, value } = evt.target
  dispatch({ type: CHANGE_INPUT, payload: {name, value}}) 
}

const onCheckboxChange = (evt) => {
  const { name, checked } = evt.target;
  dispatch({ type: CHANGE_CHECKBOX, payload: { toppingId: name, checked } });
}




const resetForm = () => {
  dispatch({ type: RESET_FORM });
};

const handleSubmit = (event) => {
  event.preventDefault();
  const { fullName, size, toppings } = state;
  submitOrder({ fullName, size, toppings })
    .unwrap()
    .then(data => {
      console.log(data);
      resetForm();
    })
    .catch(err => {
      console.error(err);
    });
};



  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {isError && <div className='failure'>Order failed: fullName is required</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={state.fullName}
            onChange={onInputChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={state.size}
            onChange={onInputChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input 
            data-testid="checkPepperoni" 
            name="1" 
            type="checkbox" 
            checked={state.toppings['1']}
            onChange={onCheckboxChange}
          />
          Pepperoni<br />
        </label>
        <label>
          <input 
            data-testid="checkGreenpeppers" 
            name="2" 
            type="checkbox" 
            checked={state.toppings['2']}
            onChange={onCheckboxChange}
          />
          Green Peppers<br />
        </label>
        <label>
          <input 
            data-testid="checkPineapple" 
            name="3" 
            type="checkbox" 
            checked={state.toppings['3']}
            onChange={onCheckboxChange}
          />
          Pineapple<br />
        </label>
        <label>
          <input 
            data-testid="checkMushrooms" 
            name="4" 
            type="checkbox" 
            checked={state.toppings['4']}
            onChange={onCheckboxChange}
          />
          Mushrooms<br />
        </label>
        <label>
          <input 
            data-testid="checkHam" 
            name="5" 
            type="checkbox" 
            checked={state.toppings['5']}
            onChange={onCheckboxChange}
          />
          Ham<br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
