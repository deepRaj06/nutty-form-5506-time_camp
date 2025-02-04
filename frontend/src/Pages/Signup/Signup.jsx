import { Box, Button, Input, Text, useToast, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import styles from "./signup.module.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signupFailure,
  signupRequest,
  signupSuccess,
} from "../../Redux/auth/action";
import { notify } from "../../utils/extraFunctions";
const Signup = () => {
  const [user, setUser] = useState({});
  console.log("user", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupRequest());
    axios
      .post(`/signup`, user)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          // console.log(res.data);
          dispatch(signupSuccess(res.data));
          notify(toast, "Account Created Successfully", "success", "bottom");
          navigate("/login");
        }
      })
      .catch((err) => {
        notify(toast, err.response.data.message, "error", "bottom");
        dispatch(signupFailure());
      });
  };

  // Google Authentication button
  const handleGoogleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };

  return (
    <Box py={"10"}>
      <Box className={styles.signupdiv}>
        <Text className={styles.heading}>Start tracking time</Text>
        <Text className={styles.subheading}>
          Create an account and start with a free 14-day trial
        </Text>
        <Text className={styles.subsubheading}>
          All features. No credit card required
        </Text>
        <Box
          className={styles.googlebtn}
          _hover={{ backgroundColor: "gray.100" }}
        >
          <FcGoogle className={styles.googlelogo} />
          <Text
            onClick={handleGoogleAuth}
            className={styles.googletext}
            color="#8f7e77"
          >
            Sign up with Google
          </Text>
        </Box>
        <Text marginTop="20px" fontSize="14px">
          Or
        </Text>

        <VStack spacing={"6"} w="75%" m="auto">
          <Input
            type="text"
            name="name"
            focusBorderColor="#25cf60"
            placeholder="Enter name"
            marginTop="15px"
            fontWeight="lighter"
            fontSize="14px"
            onChange={handleChange}
          />

          <Input
            type="email"
            name="email"
            focusBorderColor="#25cf60"
            placeholder=" Enter Email"
            fontWeight="lighter"
            fontSize="14px"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            focusBorderColor="#25cf60"
            placeholder=" Enter password"
            marginTop="15px"
            fontWeight="lighter"
            fontSize="14px"
            onChange={handleChange}
          />
        </VStack>
        <Button
          backgroundColor="#25cf60"
          marginTop="40px"
          padding="25px 35px 25px 35px"
          borderRadius="25px"
          fontSize="15px"
          color="white"
          fontWeight="700"
          _hover={{ backgroundColor: "#25cf60" }}
          onClick={handleSignup}
        >
          Sign up for free
        </Button>
        <Text className={styles.note}>
          By signing up you agree to our{" "}
          <a href="https://www.timecamp.com/terms-conditions/">
            <span style={{ color: "#25cf60" }}>Terms of Service</span>{" "}
          </a>{" "}
          and{" "}
          <a href="https://www.timecamp.com/privacy-policy/">
            <span style={{ color: "#25cf60" }}>Privacy Policy</span>
          </a>
        </Text>
      </Box>
    </Box>
  );
};
export default Signup;
