import React from 'react';
import styled from 'styled-components';
import NotFoundPic from '../assets/404-page-not-found.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  spacing: 16px;
  text-align: center;
`;

const StyledImage = styled.img`
  width: 400px;
  height: auto;
  object-fit: contain;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: rgba(44, 122, 123, 0.7);
  margin-top: 32px;
`;

const NotFound: React.FC = () => {
  return (
    <Container>
      <VStack>
        <StyledImage src={NotFoundPic as string} alt="404 - Page Not Found" />
        <Heading>Oops! The page you are looking for doesn’t exist</Heading>
      </VStack>
    </Container>
  );
};

export default NotFound;
