import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    expenseGroupInfo : [],
    loading : false,
    error:false,
}

export const expenseGroupInfo = createSlice({
    name: 'createExpenseGroup',
    initialState,
    reducers:{
      expenseStart : (state) => {
         state.loading = true;
      },
      expenseSuccess : (state,action) => {
         state.loading =false;
         state.expenseGroupInfo = [...state.expenseGroupInfo,action.payload];
         state.error = false;
      },
      expenseFailure : (state) => {
        state.loading =false;
        state.error = true;
      }
    }
})

export const {expenseStart,expenseSuccess,expenseFailure} = expenseGroupInfo.actions

export default expenseGroupInfo.reducer;