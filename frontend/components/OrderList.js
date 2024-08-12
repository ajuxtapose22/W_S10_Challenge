import React from 'react'
import { useGetPizzaOrdersQuery } from '../state/createApi'

export default function OrderList() {
  const { data: orders, error, isLoading } = useGetPizzaOrdersQuery()  


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders: {error.message}</div>; 


  if (!orders || orders.length === 0) {
    return <div>No orders available.</div>;
  }

    return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders.map((order) => {

            const toppingsCount = order.toppings ? order.toppings.length : 0;
            const toppingsText = toppingsCount === 0 ? 'no toppings' : `${toppingsCount} ${toppingsCount === 1 ? 'topping' : 'toppings'}`;

            return (
              <li key={order.id}>
                <div>
                  <p>{order.customer} ordered a size {order.size} with {toppingsText}
                     
                  </p>
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}

