import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/' }),
    endpoints: (builder) => ({
        getPizzaOrders: builder.query({
            query: () => 'history',
        }),
        submitOrder: builder.mutation({
            query: (newOrder) => ({
                url: 'order',
                method: 'POST',
                body: newOrder
            })
        })
    }),

});

export const { useGetPizzaOrdersQuery, useSubmitOrderMutation } = pizzaApi;