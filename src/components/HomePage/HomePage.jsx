import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import Slider from "./Slider";
import Games from "./Games";
import { UserAuth } from "../../context/AuthContext";
import Home2 from "../Home";

const Container = styled.div`
  width: 100%;
`;

const Home = () => {
  const { isAuth } = UserAuth();

  let navigate = useNavigate();

  if (!isAuth) {
    navigate("/");
  }

  console.log(isAuth);
  return (
    <Container>
      <Slider />
      <Games />
    </Container>
  );
};

export default Home;
