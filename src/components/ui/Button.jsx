import React from 'react'
import Spinner from './Spinner'

const variants = {
  primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm',
  danger:  'bg-red-500 hover:bg-red-600 text-white shadow-sm',
  ghost:   'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200',
  outline: 'bg-transparent hover:bg-brand-50 text-brand-600 border border-brand-300',
}
const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-sm',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-lg
        transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  )
}
