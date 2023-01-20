import React from "react";
import { useEffect, useState } from "react";
import Accountinfo from "../Accountinfo";

const Index = () => {

  const [accId1, setaccId1] = useState("");
  const [fName1, setfName1] = useState("");
  const [lName1, setlName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");

  useEffect(() => {
    let data1 = JSON.parse(localStorage.getItem("userInfo"))
    setaccId1(data1?.Id)
    setfName1(data1?.fname)
    setlName1(data1?.lname)
    setEmail1(data1?.Email)
    setPhone1(data1?.Phone)

  }, [])

  return accId1 && (
    <div>
      <Accountinfo
        accId={accId1}
        fName={fName1}
        lName={lName1}
        email={email1}
        phone={phone1}
        setaccId={setaccId1}
        setfName={setfName1}
        setlName={setlName1}
        setEmail={setEmail1}
        setPhone={setPhone1}
        feature={'UPDATE'}
      />
    </div>
  );
};

export default Index;
