import { AlertCircle } from 'lucide-react'
import Button from './Button'

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <AlertCircle size={22} className="text-red-400" />
      </div>
      <p className="text-sm font-semibold text-slate-700">Something went wrong</p>
      <p className="text-xs text-slate-400 mt-1 max-w-xs">{message}</p>
      {onRetry && (
        <Button variant="ghost" size="sm" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
