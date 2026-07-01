function AddressModal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button onClick={onClose} className="text-2xl">
            x
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default AddressModal;
