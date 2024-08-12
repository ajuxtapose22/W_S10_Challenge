import { createSlice } from '@reduxjs/toolkit'


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
      
export const pizzaFormSlice = createSlice({
        name: 'pizzaForm',
        initialState,
        reducers: {
            updateOrderFullName: (state, action) => {
                state.fullName = action.payload
            },
            updateOrderSize: (state, action) => {
                state.size = action.payload
            },
            updateOderTopping: (state, action) => {
                const { toppingId, value } = action.payload
                state.toppings[toppingId] = value
            },
            resetForm: (state) => {
                return initialState
            } 
        }
      })

export const { updateOrder, resetForm } = pizzaFormSlice.actions
export default pizzaFormSlice.reducer
