import { Link } from "react-router-dom";

import Button from "../../../../shared/components/Button";
import OrderStatusBadge from "./OrderStatusBadge";


function AdminOrderTable({ orders }) {
  return (
    <>


      <div className="space-y-4 lg:hidden">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-slate-900">
                  {order.User.name}
                </h3>

                <p className="mt-1 truncate text-sm text-slate-500">
                  {order.User.email}
                </p>
              </div>

              <OrderStatusBadge status={order.orderStatus} />
            </div>


            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">
                  Amount
                </p>

                <p className="font-bold text-slate-900">
                  ₹{order.totalAmount}
                </p>
              </div>


              <div>
                <p className="text-slate-500">
                  Payment
                </p>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                  {order.paymentMethod}
                </span>
              </div>


              <div>
                <p className="text-slate-500">
                  Date
                </p>

                <p className="text-slate-900">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>


            <Link
              to={`/admin/orders/${order.id}`}
              className="mt-5 block"
            >
              <Button className="w-full bg-slate-900 hover:bg-slate-800">
                View Details
              </Button>
            </Link>
          </div>
        ))}
      </div>




      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
        <table className="w-full">

          <thead className="bg-slate-50">
            <tr>
              {[
                "Customer",
                "Amount",
                "Payment",
                "Status",
                "Date",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className={`px-8 py-5 text-sm font-semibold uppercase tracking-wide text-slate-500 ${
                    heading === "Customer"
                      ? "text-left"
                      : heading === "Actions"
                      ? "text-right"
                      : "text-center"
                  }`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>


          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="transition hover:bg-slate-50"
              >

                <td className="px-8 py-5">
                  <p className="font-semibold text-slate-900">
                    {order.User.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {order.User.email}
                  </p>
                </td>


                <td className="px-8 py-5 text-center font-bold text-slate-900">
                  {order.totalAmount}
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
    </>
  );
}


export default AdminOrderTable;