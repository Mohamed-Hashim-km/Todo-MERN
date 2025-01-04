import { Route, Routes } from "react-router-dom"
import Homepage from "./screens/Homepage"
import UpdateTodo from "./screens/UpdateTodo"
import Login from "./registrations/Login"
import Signup from "./registrations/Signup"


function App() {

  return (
    <>
  
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      <Route path="/homepage" element={<Homepage />} />

      <Route path="/update/:id" element={<UpdateTodo/>} />
    </Routes>
     
    </>
  )
}

export default App
