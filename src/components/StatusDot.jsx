const STYLES = {
  completed: 'bg-sage',
  missed: 'bg-rose',
  unrecorded: 'bg-neutral2',
}

const LABELS = {
  completed: 'Completed',
  missed: 'Missed',
  unrecorded: 'Not recorded',
}

export default function StatusDot({ status, showLabel = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`h-2 w-2 rounded-full transition-colors duration-250 ${STYLES[status]}`}
        aria-hidden="true"
      />
      {showLabel && (
        <span className="text-sm text-ink">{LABELS[status]}</span>
      )}
    </span>
  )
}

export { LABELS as statusLabels }
