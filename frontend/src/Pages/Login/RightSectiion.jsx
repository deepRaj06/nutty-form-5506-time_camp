import React from "react";
import { Box,  Input, Text } from "@chakra-ui/react";
import styles from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
const RightSectiion = () => {
  const navigate = useNavigate();

  return (
    <Box className={styles.logindiv}>
      <Text className={styles.loginheading}>Log in to TimeCamp</Text>

      <Box
        className={styles.googlebtn}
        _hover={{ backgroundColor: "gray.100" }}
      >
        <FcGoogle fontSize="30px" />
        <Text fontSize="14px" fontWeight="700" color="#8f7e77">
          Log in with Google
        </Text>
      </Box>

      <Text marginTop="20px" fontSize="14px">
        Or
      </Text>

      <Box margin="auto" width="75%" marginTop="20px">
        <Input focusBorderColor="#25cf60" placeholder="email" type="email" />
        <Input
          type="password"
          focusBorderColor="#25cf60"
          placeholder="password"
          marginTop="15px"
        />
      </Box>

      <Link to="/#">
        <Text color="#25cf60" marginTop="15px" fontSize="14px" cursor="pointer">
          Forgotten Password?
        </Text>
      </Link>

      <Text
        className={styles.loginbtn}
        backgroundColor="#25cf60"
        cursor="pointer"
      >
        Log in
      </Text>

      <Text
        color="gray"
        fontSize="14px"
        width="65%"
        margin="auto"
        marginTop="20px"
        textAlign="center"
      >
        <span
          onClick={() => navigate("/signup")}
          style={{ color: "#25cf60", cursor: "pointer" }}
        >
          No account? Sign up
        </span>{" "}
        or
        <span style={{ color: "#25cf60", cursor: "pointer" }}>
          {" "}
          Log in with SSO
        </span>
      </Text>
    </Box>
  );
};

export default RightSectiion;
