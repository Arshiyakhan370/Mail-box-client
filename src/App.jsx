import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import PopUpAlert from "./components/modals/PopUpAlert";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./components/UI/SideBar";
import SendMail from "./components/pages/SendMail";
import Inbox from "./components/pages/Inbox";
import SentMails from "./components/pages/SentMails";
import RecycleBin from "./components/pages/RecyleBin";
import MailBoxModal from "./components/modals/MailBoxModal";
import { useEffect } from "react";
import { loginOnLoad } from "./components/store/auth-thunks";
import { getData, putData } from "./components/store/mail-box-thunks";
import { mailBoxActions } from "./components/store/mail-box-slice";

let firstRender = true;

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const mailBox = useSelector((state) => state.mailBox);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("getting data");
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
    // eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    if (!firstRender) {
      console.log("dispatch");
      dispatch(putData(mailBox));
    }
  }, [mailBox, dispatch]);

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      console.log("auto signin");
      dispatch(loginOnLoad());
      dispatch(mailBoxActions.getTotalUnread());
    }
  }, [dispatch]);

  return (
    <>
      
      <Routes>
        {!isAuthenticated && <Route path="*" element={<Navigate replace to="/signup" />} />}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      
          
        
      </Routes>
    </>
  );
}

export default App;
