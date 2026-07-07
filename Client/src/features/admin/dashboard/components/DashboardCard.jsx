function DashboardCard({
  title,
  value,
}) {
  return (
<div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
  <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
    {title}
  </p>

  <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
    {value}
  </h2>
</div>
  );
}

export default DashboardCard;