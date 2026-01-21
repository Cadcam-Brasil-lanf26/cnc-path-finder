import { useState } from "react";
import QuestionOption from "./QuestionOption";

interface QuestionCardProps {
  question: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  hasOtherOption?: boolean;
}

const QuestionCard = ({ question, options, value, onChange, hasOtherOption = false }: QuestionCardProps) => {
  const [otherValue, setOtherValue] = useState("");
  const isOtherSelected = hasOtherOption && value.startsWith("Outro:");

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-foreground font-heading mb-6 text-center leading-relaxed">
        {question}
      </h2>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <QuestionOption
            key={index}
            label={option}
            selected={value === option}
            onClick={() => onChange(option)}
          />
        ))}
        
        {hasOtherOption && (
          <div className={`form-option ${isOtherSelected ? 'form-option-selected' : ''}`}>
            <div 
              className={`form-option-radio ${isOtherSelected ? 'form-option-radio-selected' : ''}`}
              onClick={() => {
                if (otherValue.trim()) {
                  onChange(`Outro: ${otherValue}`);
                }
              }}
            >
              <div className={`form-option-radio-inner ${isOtherSelected ? 'form-option-radio-inner-selected' : ''}`} />
            </div>
            <div className="flex-1 flex items-center gap-2">
              <span className="text-sm md:text-base font-body">Outro:</span>
              <input
                type="text"
                value={otherValue}
                onChange={(e) => {
                  setOtherValue(e.target.value);
                  if (e.target.value.trim()) {
                    onChange(`Outro: ${e.target.value}`);
                  }
                }}
                placeholder="Especifique..."
                className="flex-1 bg-transparent border-b border-border focus:border-primary outline-none 
                           text-foreground placeholder:text-muted-foreground py-1 font-body text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
