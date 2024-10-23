import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCocktailByNameQuery } from '../services/api.ts';
import { getIngredientsWithMeasures } from '../utils/helpers.ts';
import styled from 'styled-components';
import { CocktailsResponse } from '../interfaces/cocktails.ts';
import { StringMap } from '../interfaces/common.ts';

const Container = styled.div`
  padding: 24px;
  margin: 0 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #f7fafc;
  position: relative;
  width: 100%;
`;

const DrinkImage = styled.img`
  position: static;
  right: 24px;
  top: 24px;
  width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 600px) {
    position: absolute;
  }
`;

const DrinkHeading = styled.h1`
  font-size: 2rem;
  margin: 0 0 16px;
  color: #319795;
`;

const DetailText = styled.p`
  font-size: 1.125rem;
  margin-bottom: 8px;
`;

const InstructionsHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 12px;
`;

const IngredientsHeading = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 8px;
`;

const UnorderedList = styled.ul`
  padding-left: 20px;
  margin-bottom: 16px;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const DrinkDetails: React.FC<{ nameAsProp?: string }> = ({ nameAsProp }) => {
  const { name } = useParams<{ name: string }>();
  const { data, error, isLoading } =
    useGetCocktailByNameQuery<CocktailsResponse>(name || nameAsProp || '');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;
  //

  if (data && data.drinks) {
    const drink = data.drinks[0];
    const ingredientsWithMeasures = getIngredientsWithMeasures(
      drink as StringMap
    );

    return (
      <Container>
        <DrinkHeading>{drink.strDrink}</DrinkHeading>

        <DrinkImage src={drink.strDrinkThumb} alt={drink.strDrink} />

        <DetailText>
          <strong>Category:</strong> {drink.strCategory}
        </DetailText>

        <DetailText>
          <strong>Alcoholic:</strong> {drink.strAlcoholic}
        </DetailText>

        <DetailText>
          <strong>Glass:</strong> {drink.strGlass}
        </DetailText>

        <InstructionsHeading>Instructions:</InstructionsHeading>
        <DetailText>{drink.strInstructions}</DetailText>

        <IngredientsHeading>Ingredients:</IngredientsHeading>
        <UnorderedList>
          {ingredientsWithMeasures.map((item) => {
            const slash = item.measure ? '/' : '';
            return (
              <ListItem key={item.ingredient}>
                {item.ingredient} {slash} {item.measure}
              </ListItem>
            );
          })}
        </UnorderedList>
      </Container>
    );
  }

  return <p>No drink details available</p>;
};

export default DrinkDetails;
