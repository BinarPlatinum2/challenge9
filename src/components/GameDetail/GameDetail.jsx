import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 75vh;
  display: flex;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Image = styled.img`
  height: 80%;
`;

const Title = styled.h2`
  font-size: 60px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const GameDetail = () => {
  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src="https://projects-static.raspberrypi.org/projects/rock-paper-scissors/786e7621aca25ecfc99e462e6b85f4c07178969a/en/images/rock-paper-scissors.png" />
        </ImgContainer>
        <InfoContainer>
          <Title>Rock Paper Scissors</Title>
          <Desc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            laboriosam illum perferendis vel excepturi nobis animi accusamus
            dicta a libero, optio temporibus itaque eum pariatur non quia iure,
            sequi accusantium.
          </Desc>
          <Button>Play Now!</Button>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default GameDetail;
