import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Layout from "./Layout"
import Home from "./pages/Home"

function App() {


  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
