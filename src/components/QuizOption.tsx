import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuizOptionProps {
  label: string;
  emoji?: string;
  value: string;
  isMultipleChoice: boolean;
  onSelect: (value: string) => void;
  onMultipleSelect: (value: string, isSelected: boolean) => void;
  isSelected?: boolean;
}

export default function QuizOption({
  label,
  emoji,
  value,
  isMultipleChoice,
  onSelect,
  onMultipleSelect,
  isSelected = false,
}: QuizOptionProps) {
  const handleClick = () => {
    if (isMultipleChoice) {
      onMultipleSelect(value, !isSelected);
    } else {
      onSelect(value);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onClick={handleClick}
      className={`w-full p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800
                  flex items-center justify-between text-left transition-colors
                  ${isSelected ? 'bg-purple-700/70' : ''}
                  ${isMultipleChoice ? 'border-2 border-purple-500' : ''}`}
    >
      <div className="flex items-center gap-3">
        {emoji && <span className="text-2xl">{emoji}</span>}
        <span>{label}</span>
      </div>
      {isMultipleChoice && isSelected && <Check className="w-5 h-5 text-green-400" />}
      {!isMultipleChoice && <ArrowRight className="w-5 h-5" />}
    </motion.button>
  );
}
