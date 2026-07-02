import { Link } from "react-router-dom";

import Button from "../../../shared/components/Button";
import OrderStatusBadge from "./OrderStatusBadge";

function OrderCard({ order }) {
  return (
    <div className="rounded-xl border-b border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">
            Order ID
          </p>

          <p className="text-sm text-gray-500">
            {order.id}
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold">
            {order.totalAmount}
          </p>

        
          <OrderStatusBadge status={order.orderStatus}/>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Payment : {order.paymentMethod}
        </p>

        <p className="text-sm text-gray-500">
          Payment Status : {order.paymentStatus}
        </p>
      </div>

      <div className="mt-5">
        <Link to={`/orders/${order.id}`}>
          <Button className="bg-slate-600 hover:bg-slate-700">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default OrderCard;