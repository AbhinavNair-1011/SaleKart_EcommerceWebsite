function Select({
  label,
  id,
  register,
  error,
  children,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="font-medium"
      >
        {label}
      </label>

      <select
        id={id}
        {...register}
        {...props}
        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
      >
        {children}
      </select>

      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default Select;