import { FaList } from "react-icons/fa"

interface PriceChartButtonProps {
  onClick?: () => void
  className?: string
}

const PriceChartButton = ({ onClick, className = "" }: PriceChartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-[#c99947] font-bold flex items-center cursor-pointer gap-1 ${className}`}
    >
      Price Chart <FaList className="text-sm" />
    </button>
  )
}

export default PriceChartButton
