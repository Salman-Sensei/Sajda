const ITEMS = [
  { key: 'home', label: 'Home' },
  { key: 'history', label: 'History' },
  { key: 'progress', label: 'Progress' },
  { key: 'group', label: 'Group' },
]

export default function NavBar({ active, onNavigate }) {
  return (
    <>
      {/* Desktop top nav */}
      <nav className="hidden md:flex items-center justify-center gap-1 border-b border-line bg-cream/95 backdrop-blur-sm sticky top-0 z-10 py-3">
        <div className="flex items-center gap-1">
          {ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`focus-ring px-4 py-2 rounded-sm text-sm transition-colors duration-150 ${
                active === item.key
                  ? 'text-charcoal font-medium border-b-2 border-sage'
                  : 'text-ink hover:text-charcoal'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 border-t border-line bg-card z-10">
        <div className="flex items-stretch justify-around">
          {ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className="focus-ring flex-1 flex flex-col items-center justify-center gap-1 py-3 min-h-[44px]"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-150 ${
                  active === item.key ? 'bg-sage' : 'bg-transparent'
                }`}
              />
              <span
                className={`text-xs transition-colors duration-150 ${
                  active === item.key ? 'text-charcoal font-medium' : 'text-ink'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
