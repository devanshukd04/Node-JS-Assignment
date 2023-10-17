import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
import Form from "./pages/Form.tsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* <Route index element={<Home />} /> */}
            <Route path="register" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="form" element={<Form/>}/>
            {/*<Route path="homepage" element={<Homepage/>}/>
            <Route path="emailSpoofing" element={<Mails/>}/> */}
            {/* <Route path="contact" element={<Contact />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
