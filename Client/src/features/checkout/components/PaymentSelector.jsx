function PaymentSelector({ paymentMethod, setPaymentMethod }) {
  return (
<div className="rounded-3xl bg-white p-7 shadow-xl shadow-slate-200/40">
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900">
      Payment Method
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      Select your preferred payment option.
    </p>
  </div>

  <div className="space-y-4">
    <label
      className={`flex cursor-pointer items-center justify-between rounded-2xl p-5 transition ${
        paymentMethod === "cod"
          ? "bg-blue-50 shadow-md"
          : "bg-slate-50 hover:bg-slate-100"
      }`}
    >
      <div className="flex items-center gap-4">
        <input
          type="radio"
          checked={paymentMethod === "cod"}
          onChange={() => setPaymentMethod("cod")}
          className="h-4 w-4 accent-blue-600"
        />

        <div>
          <p className="font-semibold text-gray-900">
            Cash on Delivery
          </p>

          <p className="text-sm text-gray-500">
            Pay when your order arrives.
          </p>
        </div>
      </div>

      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600">
        COD
      </span>
    </label>

    <label
      className={`flex cursor-pointer items-center justify-between rounded-2xl p-5 transition ${
        paymentMethod === "razorpay"
          ? "bg-blue-50 shadow-md"
          : "bg-slate-50 hover:bg-slate-100"
      }`}
    >
      <div className="flex items-center gap-4">
        <input
          type="radio"
          checked={paymentMethod === "razorpay"}
          onChange={() => setPaymentMethod("razorpay")}
          className="h-4 w-4 accent-blue-600"
        />

        <div>
          <p className="font-semibold text-gray-900">
            Razorpay
          </p>

          <p className="text-sm text-gray-500">
            Pay securely using UPI, Cards or Net Banking.
          </p>
        </div>
      </div>

      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600">
        Online
      </span>
    </label>
  </div>
</div>
  );
}

export default PaymentSelector;
