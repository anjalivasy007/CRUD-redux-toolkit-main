import { Route, Routes } from "react-router-dom";
import AddUser from "./features/users/AddUser";
import EditUser from "./features/users/EditUser";
import UserList from "./features/users/UserList";
import { ThemeProvider } from "@mui/material/styles";
 

function App() {
  return (
    <div>
      <h5 className="text-center font-bold text-2xl text-gray-700">CRUD with redux toolkit</h5>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
