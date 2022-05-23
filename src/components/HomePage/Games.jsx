import React from "react";
import styled from "styled-components";
import { gameItems } from "../../data";
import Game from "./Game";

const ContainerMain = styled.div``;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
`;

const Center = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  align-items: center;
  text-align: center;
  margin-top: 20px;
`;

const Products = () => {
  return (
    <ContainerMain>
      <Title>GAMES</Title>
      <Container>
        {gameItems.map((item) => (
          <Game item={item} key={item.id} />
        ))}
      </Container>
    </ContainerMain>
  );
};

export default Products;
