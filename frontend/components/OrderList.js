import React, { useState } from 'react';
import { useGetPizzaOrdersQuery } from '../state/createApi';

export default function OrderList() {
  const { data: orders = [], error, isLoading } = useGetPizzaOrdersQuery();
  const [filter, setFilter] = useState('All');

  const filteredOrders = orders.filter(order => 
    filter === 'All' || order.size === filter
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders: {error.message}</div>;

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      
      <ol>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const toppingsCount = order.toppings ? order.toppings.length : 0;
            const toppingsText = toppingsCount === 0 ? 'no toppings' : `${toppingsCount} ${toppingsCount === 1 ? 'topping' : 'toppings'}`;
            return (
              <li key={order.id}>
                <div>
                  <p>
                    {order.customer} ordered a size {order.size} with {toppingsText}
                  </p>
                </div>
              </li>
            );
          })
        ) : (
          <div>No orders available.</div>
        )}
      </ol>

      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => (
          <button
            key={size}
            className={`button-filter${size === 'All' ? ' active' : ''}`}
            onClick={() => setFilter(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
