import { Button } from "@/components/ui/button";

interface TextQuestionProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  minLength?: number;
  maxLength?: number;
  isSubmitting?: boolean;
}

const TextQuestion = ({ 
  question, 
  value, 
  onChange, 
  onSubmit, 
  minLength = 20,
  maxLength = 2000,
  isSubmitting = false 
}: TextQuestionProps) => {
  const trimmedValue = value.trim();
  const isValid = trimmedValue.length >= minLength;
  const remainingChars = minLength - trimmedValue.length;
  const isAtMaxLength = value.length >= maxLength;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-foreground font-heading mb-6 text-center leading-relaxed">
        {question}
      </h2>
      
      <div className="space-y-4">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="Digite sua resposta aqui..."
          rows={5}
          maxLength={maxLength}
          className="w-full p-4 rounded-xl border-2 border-border bg-card text-foreground 
                     placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary
                     transition-colors duration-300 font-body text-sm md:text-base"
        />
        
        <div className="flex justify-between items-center">
          <span className={`text-sm font-body ${isValid ? 'text-primary' : 'text-muted-foreground'}`}>
            {isValid ? '✓ Resposta válida' : `Mínimo de ${remainingChars} caracteres restantes`}
          </span>
          <span className={`text-sm font-body ${isAtMaxLength ? 'text-destructive' : 'text-muted-foreground'}`}>
            {value.length}/{maxLength}
          </span>
        </div>

        <Button
          onClick={onSubmit}
          disabled={!isValid || isSubmitting}
          className="w-full py-6 text-base font-semibold font-heading rounded-xl
                     bg-primary hover:bg-primary/90 text-primary-foreground
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 glow-effect hover:animate-pulse-glow"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Pesquisa'}
        </Button>
      </div>
    </div>
  );
};

export default TextQuestion;
