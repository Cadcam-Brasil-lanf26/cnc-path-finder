import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import TextQuestion from "./TextQuestion";

interface FormData {
  email: string;
  name: string;
  phone: string;
  utm_campaign: string;
  utm_source: string;
  utm_content: string;
  utm_medium: string;
  utm_term: string;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
}

const questions = [
  {
    id: 1,
    question: "Você é:",
    options: ["Programador CNC", "Operador CNC", "Quero iniciar nessa profissão"],
    hasOtherOption: true,
  },
  {
    id: 2,
    question: "Qual a sua idade?",
    options: ["18 a 24", "25 a 34", "35 a 44", "45 a 54", "55 a 64", "+65"],
    hasOtherOption: false,
  },
  {
    id: 3,
    question: "Há quanto tempo você conhece o Prof. Fernando Ferreira?",
    options: [
      "Há mais ou menos 6 meses.",
      "Há pouco tempo (cerca de 1 a 3 meses).",
      "Há bastante tempo (mais de 1 ano).",
      "Acabei de conhecer.",
    ],
    hasOtherOption: false,
  },
  {
    id: 4,
    question: "Você está empregado?",
    options: ["Sim", "Não"],
    hasOtherOption: false,
  },
  {
    id: 5,
    question: "Qual o valor do seu salário atual?",
    options: [
      "Entre R$ 1.000 a R$ 2.000",
      "Entre R$ 2.000 a R$ 3.000",
      "Entre R$ 3.000 a R$ 4.000",
      "Entre R$ 4.000 a R$ 5.000",
      "Entre R$ 6.000 a R$ 7.000",
      "Entre R$ 7.000 a R$ 8.000",
      "Acima de R$ 8.000",
      "Não estou empregado(a)",
    ],
    hasOtherOption: false,
  },
  {
    id: 6,
    question: "É a primeira vez que você participa da JORNADA DA PROGRAMAÇÃO CNC?",
    options: ["Sim", "Não"],
    hasOtherOption: false,
  },
];

const textQuestion = {
  id: 7,
  question: "O que realmente FALTA você APRENDER para considerar que isso seja um diferencial aí na sua realidade? (Me fala 2 exemplos se preferir)",
};

const CNCForm = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    phone: "",
    utm_campaign: "",
    utm_source: "",
    utm_content: "",
    utm_medium: "",
    utm_term: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      email: searchParams.get("email") || "",
      name: searchParams.get("name") || "",
      phone: searchParams.get("phone") || "",
      utm_campaign: searchParams.get("utm_campaign") || "",
      utm_source: searchParams.get("utm_source") || "",
      utm_content: searchParams.get("utm_content") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_term: searchParams.get("utm_term") || "",
    }));
  }, [searchParams]);

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const handleOptionSelect = (questionKey: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [questionKey]: value }));
    
    // Auto-advance for questions 1-6
    if (currentStep < 7) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 300);
    }
  };

  const handleTextChange = (value: string) => {
    setFormData(prev => ({ ...prev, question7: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Log form data (in production, you'd send this to a server)
    console.log("Form submitted:", formData);
    
    // Simulate a brief delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Redirect to the specified URL
    window.location.href = "https://sndflw.com/i/jornada-fev-26";
  };

  const renderCurrentQuestion = () => {
    if (currentStep <= 6) {
      const question = questions[currentStep - 1];
      const questionKey = `question${currentStep}` as keyof FormData;
      
      return (
        <QuestionCard
          key={currentStep}
          question={question.question}
          options={question.options}
          value={formData[questionKey]}
          onChange={(value) => handleOptionSelect(questionKey, value)}
          hasOtherOption={question.hasOtherOption}
        />
      );
    }
    
    return (
      <TextQuestion
        question={textQuestion.question}
        value={formData.question7}
        onChange={handleTextChange}
        onSubmit={handleSubmit}
        minLength={20}
        isSubmitting={isSubmitting}
      />
    );
  };

  return (
    <div className="w-full px-4">
      <ProgressBar progress={progress} />
      
      {/* Hidden inputs for form data */}
      <input type="hidden" name="email" value={formData.email} />
      <input type="hidden" name="name" value={formData.name} />
      <input type="hidden" name="phone" value={formData.phone} />
      <input type="hidden" name="utm_campaign" value={formData.utm_campaign} />
      <input type="hidden" name="utm_source" value={formData.utm_source} />
      <input type="hidden" name="utm_content" value={formData.utm_content} />
      <input type="hidden" name="utm_medium" value={formData.utm_medium} />
      <input type="hidden" name="utm_term" value={formData.utm_term} />
      
      {renderCurrentQuestion()}
    </div>
  );
};

export default CNCForm;
