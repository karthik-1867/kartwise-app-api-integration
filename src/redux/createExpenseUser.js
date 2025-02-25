import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    createExpenseGroup : [],
    loading : false,
    error:false,
}

export const createExpenseUser = createSlice({
    name: 'createExpenseGroup',
    initialState,
    reducers:{
      expenseGroupStart : (state) => {
         state.loading = true;
      },
      expenseGroupSuccess : (state,action) => {
         state.loading =false;
         state.createExpenseGroup = [...state.createExpenseGroup,action.payload];
         state.error = false;
      },
      expenseGroupFailure : (state) => {
        state.loading =false;
        state.error = true;
      }
    }
})

export const {expenseGroupStart,expenseGroupSuccess,expenseGroupFailure} = createExpenseUser.actions

export default createExpenseUser.reducer;