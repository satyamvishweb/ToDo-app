import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditFormState {
  title: string;
  dueDate: string;
  status: string;
  category: string;
  id: number;
  name: string;
  description: string;
}

const initialState: EditFormState = {
  title: "",
  dueDate: "",
  status: "",
  category: "",
  id: 0,
  name: "",
  description: "",
};

const mobileEditSlice = createSlice({
  name: "mobileEdit",
  initialState,
  reducers: {
    setEditForm(state, action: PayloadAction<Partial<EditFormState>>) {
      Object.assign(state, action.payload);
    },
    resetEditForm(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setEditForm, resetEditForm } = mobileEditSlice.actions;

export default mobileEditSlice.reducer;
