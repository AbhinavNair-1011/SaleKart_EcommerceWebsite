function Input({
  label,
  id,
  type = "text",
  register,
  error,
  labelClassName,
  className,

  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`font-bold  text-black ${labelClassName}`}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        {...register}
        {...props}
        className={`rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 bg-white/80  text-black ${className}`}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default Input;