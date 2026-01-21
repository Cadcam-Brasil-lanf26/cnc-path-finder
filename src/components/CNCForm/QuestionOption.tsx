interface QuestionOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const QuestionOption = ({ label, selected, onClick }: QuestionOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`form-option ${selected ? 'form-option-selected' : ''} animate-fade-in`}
    >
      <div className={`form-option-radio ${selected ? 'form-option-radio-selected' : ''}`}>
        <div className={`form-option-radio-inner ${selected ? 'form-option-radio-inner-selected' : ''}`} />
      </div>
      <span className="text-left font-body text-sm md:text-base">{label}</span>
    </button>
  );
};

export default QuestionOption;
