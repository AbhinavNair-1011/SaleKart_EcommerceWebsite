import { Link } from "react-router-dom";

import Button from "../../../../shared/components/Button";

import OrderStatusBadge from "./OrderStatusBadge";

function AdminOrderTable({ orders }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
  <table className="w-full">
    <thead className="bg-slate-50">
      <tr>
        <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wide text-slate-500">
          Customer
        </th>

        <th className="px-8 py-5 text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
          Amount
        </th>

        <th className="px-8 py-5 text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
          Payment
        </th>

        <th className="px-8 py-5 text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
          Status
        </th>

        <th className="px-8 py-5 text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
          Date
        </th>

        <th className="px-8 py-5 text-right text-sm font-semibold uppercase tracking-wide text-slate-500">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      {orders.map((order) => (
        <tr
          key={order.id}
          className="border-t border-slate-100 transition hover:bg-slate-50"
        >
          <td className="px-8 py-5">
            <div>
              <p className="font-medium text-slate-900">
                {order.User.name}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {order.User.email}
              </p>
            </div>
          </td>

          <td className="px-8 py-5 text-center">
            <span className="font-semibold text-slate-900">
              ₹{order.totalAmount}
            </span>
          </td>

          <td className="px-8 py-5 text-center">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
              {order.paymentMethod}
            </span>
          </td>

          <td className="px-8 py-5 text-center">
            <OrderStatusBadge status={order.orderStatus} />
          </td>

          <td className="px-8 py-5 text-center text-slate-600">
            {new Date(order.createdAt).toLocaleDateString()}
          </td>

          <td className="px-8 py-5">
            <div className="flex justify-end">
              <Link to={`/admin/orders/${order.id}`}>
                <Button className="bg-slate-900 hover:bg-slate-800">
                  View Details
                </Button>
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}

export default AdminOrderTable;
