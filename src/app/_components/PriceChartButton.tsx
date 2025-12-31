import { FaList } from "react-icons/fa"

interface PriceChartButtonProps {
  onClick?: () => void
  className?: string
}

const PriceChartButton = ({ onClick, className = "" }: PriceChartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-[#D4AF37] font-bold flex items-center gap-1 hover:underline ${className}`}
    >
      Price Chart <FaList className="text-sm" />
    </button>
  )
}

export default PriceChartButton
