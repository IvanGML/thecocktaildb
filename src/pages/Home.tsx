import React, { useCallback, useEffect, useState } from 'react';
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import DrinkDetails from './DrinkDetails';
import { coctailTypes } from '../constants/coctailTypes.ts';
import NotFound from './NotFound.tsx';
import styled from 'styled-components';
import { checkIsMobile, throttle } from '../utils/helpers.ts';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-grow: 1;
  max-width: 100%;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
`;

const Sidebar = styled.div`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '25%')};
  display: flex;
  flex-direction: column;
  align-items: ${({ $isMobile }) => ($isMobile ? 'center' : 'start')};
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '16px' : '0')};
  padding: 16px;
`;

const Content = styled.div`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '75%')};
  padding: 16px;
`;

const Heading = styled.h1`
  font-size: 1.25rem;
  text-transform: uppercase;
  margin-bottom: 0;

  > a {
    text-decoration: none;
    color: black;
    &:hover {
      color: #2c7a7b;
    }
  }
`;

const LinkWrapper = styled.div<{ $isActive: boolean; $isMobile: boolean }>`
  > a {
    text-decoration: none;
    font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
    color: ${({ $isActive }) => ($isActive ? '#2c7a7b' : 'black')};
    padding: 8px 0;
    border-radius: 8px;
    display: block;
    text-align: ${({ $isMobile }) => ($isMobile ? 'center' : 'left')};
    &:hover {
      color: #2c7a7b !important;
    }
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState(checkIsMobile());
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = useCallback(
    (id: string) => location.pathname.includes(id),
    [location]
  );

  useEffect(() => {
    const handleResize = throttle(() => {
      setIsMobile(checkIsMobile());
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate(`/drink/${coctailTypes[0].id}`);
    }
  }, [location]);

  return (
    <Container>
      <Wrapper $isMobile={isMobile}>
        <Sidebar $isMobile={isMobile}>
          <Heading>
            <Link to="/">thecocktaildb</Link>
          </Heading>
          <List>
            {coctailTypes.map((cocktail) => (
              <ListItem key={cocktail.id}>
                <LinkWrapper
                  $isActive={isActive(cocktail.id)}
                  $isMobile={isMobile}
                >
                  <Link to={`/drink/${cocktail.id}`}>{cocktail.value}</Link>
                </LinkWrapper>
              </ListItem>
            ))}
          </List>
        </Sidebar>
        <Content $isMobile={isMobile}>
          <Routes>
            <Route path="/drink/:name" element={<DrinkDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Home;
