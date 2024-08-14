import React, { useReducer, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { updateOrder, resetForm } from '../state/pizzaFomSlice'
import { useSubmitOrderMutation } from '../state/createApi'

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
      return initialState
    default:
      return state
  }
}

export default function PizzaForm() {
const [state, dispatch] = useReducer(reducer,initialState)
const [submitOrder, { error: creationError }] = useSubmitOrderMutation()
const [isSubmitting, setIsSubnmitting] = useState(false)

const onInputChange = (evt) => {
  const { name, value } = evt.target
  dispatch({ type: CHANGE_INPUT, payload: {name, value}}) 
}

const onCheckboxChange = (evt) => {
  const { name, checked } = evt.target
  dispatch({ type: CHANGE_CHECKBOX, payload: { toppingId: name, checked } })
}




const resetFormAction = () => {
  dispatch({ type: RESET_FORM })
}


const handleSubmit = (event) => {
  event.preventDefault()
  setIsSubnmitting(true)
  const { fullName, size, toppings } = state

  const selectedToppings = Object.keys(toppings)
    .filter(toppingId => toppings[toppingId])


  submitOrder({ fullName, size, toppings: selectedToppings })
    .unwrap()
    .then(data => {
      console.log('Order successful:', data)
      resetFormAction()
      setIsSubnmitting(false)
    })
    .catch(err => {
      console.error('Order failed:', err)
      setIsSubnmitting(false)
    })
}


  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
    
      {isSubmitting && <div>Order in progress...</div>}
      {creationError && <div className='failure'>{creationError.data.message}</div>}

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
            <option value="S" >Small</option>
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
