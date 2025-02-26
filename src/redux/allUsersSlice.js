import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    allUsers : [],
    loading : false,
    error:false,
}

export const allUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
      usersFetchStart : (state) => {
         state.loading = true;
      },
      usersFetchSuccess : (state,action) => {
         state.loading =false;
         state.allUsers = [...state.allUsers,action.payload];
         state.error = false;
      },
      usersUpdateRemovedUser : (state,action) => {
        state.loading =false;
        state.allUsers = [...state.allUsers,state.allUsers.filter((i)=>i!=action.payload)];
        state.error = false;
     },
      usersFetchFailure : (state) => {
        state.loading =false;
        state.error = true;
      }
    }
})

export const {usersFetchStart,usersFetchSuccess,usersFetchFailure,usersUpdateRemovedUser} = allUserSlice.actions

export default allUserSlice.reducer;