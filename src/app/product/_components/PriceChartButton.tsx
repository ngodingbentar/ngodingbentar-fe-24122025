interface PriceChartButtonProps {
  onClick?: () => void
  className?: string
}

const PriceChartButton = ({ onClick, className = "" }: PriceChartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-[#D4AF37] text-xs font-bold flex items-center gap-1 hover:underline ${className}`}
    >
      Price Chart <span className="text-xs">☰</span>
    </button>
  )
}

export default PriceChartButton
