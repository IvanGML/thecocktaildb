import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cocktailApi = createApi({
  reducerPath: 'cocktailApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.thecocktaildb.com/api/json/v1/1/',
  }),
  endpoints: (builder) => ({
    getCocktailByName: builder.query<{ drinks: never[] }, string>({
      query: (name: string) => `search.php?s=${name}`,
    } as never),
  }),
});

export const { useGetCocktailByNameQuery } = cocktailApi;
