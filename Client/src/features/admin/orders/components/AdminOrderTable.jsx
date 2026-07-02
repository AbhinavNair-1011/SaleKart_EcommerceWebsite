import { Link } from "react-router-dom";

import Button from "../../../../shared/components/Button";

import OrderStatusBadge from "./OrderStatusBadge";

function AdminOrderTable({ orders }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Customer</th>

            <th className="px-4 py-3 text-left">Email</th>

            <th className="px-4 py-3 text-left">Amount</th>

            <th className="px-4 py-3 text-left">Payment</th>

            <th className="px-4 py-3 text-left">Status</th>

            <th className="px-4 py-3 text-left">Date</th>

            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="px-4 py-4">{order.User.name}</td>

              <td className="px-4 py-4">{order.User.email}</td>

              <td className="px-4 py-4">₹{order.totalAmount}</td>

              <td className="px-4 py-4 capitalize">{order.paymentMethod}</td>

              <td className="px-4 py-4">
                <OrderStatusBadge status={order.orderStatus} />
              </td>

              <td className="px-4 py-4">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td className="px-4 py-4 text-center">
                <Link to={`/admin/orders/${order.id}`}>
                  <Button>View</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrderTable;
