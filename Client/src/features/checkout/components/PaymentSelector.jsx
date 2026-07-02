function PaymentSelector({ paymentMethod, setPaymentMethod }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-bold">Payment Method</h2>

      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input
            type="radio"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          Cash On Delivery
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            checked={paymentMethod === "razorpay"}
            onChange={() => setPaymentMethod("razorpay")}
          />
          Razorpay
        </label>
      </div>
    </div>
  );
}

export default PaymentSelector;
