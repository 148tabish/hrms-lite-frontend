export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          {label}
        </label>
      )}
      <input
        className={`input-base ${error ? 'input-error' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  )
}
