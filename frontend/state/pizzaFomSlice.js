import { createSlice } from '@reduxjs/toolkit'


    const initialState = { 
        fullName: '',
        size: '',
        toppings: {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false
    },
        filte: 'All'
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
            updateOrderTopping: (state, action) => {
                const { toppingId, value } = action.payload
                state.toppings[toppingId] = value
            },
            resetForm: () => initialState,
            setFilter: (state, action) => {
                state.filter = action.payload
            }
        }
      })

export const { updateOrderFullName, updateOrderSize, updateOrderTopping, resetForm, setFilter } = pizzaFormSlice.actions
export default pizzaFormSlice.reducer
