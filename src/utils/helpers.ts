import { StringMap } from '../interfaces/common.ts';

export const getIngredientsWithMeasures = (cocktail: StringMap) => {
  const ingredientsWithMeasures: { ingredient: string; measure: string }[] = [];

  // Filter out all ingredient
  const ingredientKeys = Object.keys(cocktail).filter((key) =>
    key.startsWith('strIngredient')
  );

  // Iterate over ingredient keys and match them with corresponding measures
  ingredientKeys.forEach((ingredientKey) => {
    const measureKey = ingredientKey.replace('strIngredient', 'strMeasure');
    const ingredient = cocktail[ingredientKey];
    const measure = cocktail[measureKey];

    if (ingredient) {
      ingredientsWithMeasures.push({
        ingredient,
        measure: measure || '',
      });
    }
  });

  return ingredientsWithMeasures;
};

export const throttle = (callback, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
};

export const checkIsMobile = () => window.innerWidth < 768;
