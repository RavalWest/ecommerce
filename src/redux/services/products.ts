import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "./types";

export const products = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/products" }),
    endpoints: (builder) => ({
        getProductsList: builder.query<Product[], string>({
            query: () => `/`,
        }),
    }),
});

export const { useGetProductsListQuery } = products;
