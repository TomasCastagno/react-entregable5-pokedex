import { createSlice } from '@reduxjs/toolkit';

export const nameSlice = createSlice({
		name: 'name',
    initialState: "",
    reducers: {
        name: (state, action) => {
            const userName = action.payload;
            return userName
        } 
    }
})

export const { name } = nameSlice.actions;

export default nameSlice.reducer;