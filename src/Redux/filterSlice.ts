// Redux filterSlice (filterSlice.ts)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchQuery: string;
  category: string;
  dueDate: string;
}

const initialState: FilterState = {
  searchQuery: '',
  category: '',
  dueDate: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setDueDate(state, action: PayloadAction<string>) {
      state.dueDate = action.payload; // Store the string value (e.g., "Today", "This Week", etc.)
    },
  },
});

export const { setSearchQuery, setCategory, setDueDate } = filterSlice.actions;

export default filterSlice.reducer;
