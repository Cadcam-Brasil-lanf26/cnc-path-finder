import { useState } from "react";
import { Button } from "@/components/ui/button";
import QuestionOption from "./QuestionOption";

interface QuestionCardProps {
  question: string;
  options: string[];
  value: string;
  onChange: (value: string, isOther?: boolean) => void;
  hasOtherOption?: boolean;
}

const QuestionCard = ({ question, options, value, onChange, hasOtherOption = false }: QuestionCardProps) => {
  const [otherValue, setOtherValue] = useState("");
  const isOtherSelected = hasOtherOption && value.startsWith("Outro:");

  const handleOtherSubmit = () => {
    if (otherValue.trim()) {
      onChange(`Outro: ${otherValue}`, false); // false = não é mais "outro em edição", pode avançar
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && otherValue.trim()) {
      e.preventDefault();
      handleOtherSubmit();
    }
  };

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
            onClick={() => onChange(option, false)}
          />
        ))}
        
        {hasOtherOption && (
          <div className={`form-option ${isOtherSelected ? 'form-option-selected' : ''}`}>
            <div 
              className={`form-option-radio ${isOtherSelected ? 'form-option-radio-selected' : ''}`}
              onClick={() => {
                if (otherValue.trim()) {
                  handleOtherSubmit();
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
                maxLength={200}
                onChange={(e) => {
                  const newValue = e.target.value.slice(0, 200);
                  setOtherValue(newValue);
                  if (newValue.trim()) {
                    onChange(`Outro: ${newValue}`, true); // true = ainda em edição, não avançar
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder="Especifique..."
                className="flex-1 bg-transparent border-b border-border focus:border-primary outline-none 
                           text-foreground placeholder:text-muted-foreground py-1 font-body text-sm"
              />
            </div>
            {isOtherSelected && otherValue.trim() && (
              <Button
                type="button"
                size="sm"
                onClick={handleOtherSubmit}
                className="ml-2"
              >
                OK
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
