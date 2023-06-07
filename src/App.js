import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Component/signin";
import Signup from "./Component/signup";
import Home from "./Home";
import TodoContainer from "./Component/Todo";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TodoContainer />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
