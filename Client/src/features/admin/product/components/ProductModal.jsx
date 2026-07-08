function ProductModal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0  h-screen z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-5 shadow-xl md:p-6">
        <div className=" flex items-center justify-between gap-4">
          <h2 className="truncate text-lg font-semibold text-slate-900 md:text-xl">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="shrink-0 rounded-lg px-3 py-1 text-2xl transition hover:bg-slate-100"
          >
            X
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default ProductModal;
