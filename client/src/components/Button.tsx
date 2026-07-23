interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
  activeColor?: string
}

function Button({ children, onClick, active, activeColor = 'bg-green-500' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded border ${active ? `${activeColor} text-white` : 'bg-white text-gray-700'}`}
    >
      {children}
    </button>
  )
}

export default Button