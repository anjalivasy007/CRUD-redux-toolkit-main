import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    editUser: (state, action) => {
      const { id, firstName, lastName, birthDate, gender, age, email, phone, maritalStatus, spouseName, spouseEmail, spousePhone, languages } = action.payload;
      const existingUser = state.find(user => user.id === id);
      if(existingUser) {
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.birthDate = birthDate;
        existingUser.gender = gender;
        existingUser.age = age;
        existingUser.email = email;
        existingUser.phone = phone;
        existingUser.maritalStatus = maritalStatus;
        existingUser.spouseName = spouseName;
        existingUser.spouseEmail = spouseEmail;
        existingUser.spousePhone = spousePhone;
        existingUser.languages = languages;
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      const existingUserIndex = state.findIndex(user => user.id === id);
      if(existingUserIndex !== -1) {
        state.splice(existingUserIndex, 1);
      }
    },
    setUsers: (state, action) => {
      return action.payload;
    },
  }
});

export const { addUser, editUser, deleteUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
