import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { loginSuccess } from "../Redux/auth/action";

function PrivateRoute({ children }) {
  // Google Auth
  const [user, setUser] = useState({});
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((store) => store.AuthReducer.token);
  //   console.log(token);

  const getUser = () => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/login/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        // console.log(response)
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((resObj) => {
        // console.log(resObj);
        setUser(resObj.user);
        dispatch(loginSuccess(resObj.user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(user);

  useEffect(() => {
    getUser();
  }, []);

  return(
    (token || user) ? children : (<Navigate to="/login" state={{ from: location }} replace />)
  )

  // if (token || user) {
  //   return children;
  // } else {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
}

export default PrivateRoute;
