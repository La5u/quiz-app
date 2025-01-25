import { motion } from "framer-motion";

const CircularProgress = ({ progress, color = 'blue' }) => {
  const circumference = 2 * Math.PI * 40; // radius is 40

  const getColorClass = (colorName) => {
    const colorMap = {
      'blue': 'stroke-blue-500',
      'green': 'stroke-green-500',
      'red': 'stroke-red-500',
      // add more colors as needed
    };
    return colorMap[colorName] || 'stroke-blue-500';
  };

  return (
    <div className="relative w-24 h-24">
      <svg
        className="transform -rotate-90 w-24 h-24"
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          className="stroke-gray-200"
          strokeWidth="8"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
        />
        {/* Progress circle */}
        <motion.circle
          className={getColorClass(color)}
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-semibold">{Math.round(progress)}%</span>
      </div>
    </div>
  );
};

export default CircularProgress; 