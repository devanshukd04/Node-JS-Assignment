import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
import Form from "./pages/Form.tsx";
import Submissions from "./pages/Submissions.tsx";
import Header from "./components/Header.tsx";
import StepperComp from "./pages/StepperComp.tsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* <Route index element={<Home />} /> we need to add default path */}
            <Route path="register" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="form" element={<Form/>}/>
            <Route path="form-submissions" element={<Submissions/>}/>
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
