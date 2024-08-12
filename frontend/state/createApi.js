import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/' }),
    tagTypes: ['PizzaOrders'],
    endpoints: (builder) => ({
        getPizzaOrders: builder.query({
            query: () => 'history',
            providesTag: ['PizzaOrders'],
        }),
        submitOrder: builder.mutation({
            query: (newOrder) => ({
                url: 'order',
                method: 'POST',
                body: newOrder
            }),
            invalidatesTags: ['PizzaOrders']
        })
    }),

});

export const { useGetPizzaOrdersQuery, useSubmitOrderMutation } = pizzaApi;