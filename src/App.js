import "./App.css";
import React, { useState } from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Component/Home/index";
import Accountinfo from "./Component/Accountinfo/index";
import Viewinfo from "./Component/ViewInfo/index";
import Updateinfo from "./Component/UpdateInfo/index";
import Addprofile from "./Component/Addprofile/index"

function App() {
  const [accId, setaccId] = useState("");
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path="/accoption" element={<Home />} />

          <Route
            path="/accinfo"
            element={
              <Accountinfo
                accId={accId}
                fName={fName}
                lName={lName}
                email={email}
                phone={phone}
                setaccId={setaccId}
                setfName={setfName}
                setlName={setlName}
                setEmail={setEmail}
                setPhone={setPhone}
                feature={'ADD'}
              />
            }
          />

          <Route path="/" element={<Viewinfo />} />

          <Route path="/updateinfo" element={<Updateinfo />} />

          <Route path="/addprofile" element={<Addprofile />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
