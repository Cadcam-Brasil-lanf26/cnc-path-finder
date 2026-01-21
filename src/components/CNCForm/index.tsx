import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formSchema, sanitizeInput } from "@/lib/formValidation";
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
      email: sanitizeInput(searchParams.get("email") || ""),
      name: sanitizeInput(searchParams.get("namee") || ""),
      phone: sanitizeInput(searchParams.get("phone") || ""),
      utm_campaign: sanitizeInput(searchParams.get("utm_campaign") || ""),
      utm_source: sanitizeInput(searchParams.get("utm_source") || ""),
      utm_content: sanitizeInput(searchParams.get("utm_content") || ""),
      utm_medium: sanitizeInput(searchParams.get("utm_medium") || ""),
      utm_term: sanitizeInput(searchParams.get("utm_term") || ""),
    }));
  }, [searchParams]);

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const handleOptionSelect = (questionKey: keyof FormData, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [questionKey]: sanitizedValue }));
    
    // Auto-advance for questions 1-6
    if (currentStep < 7) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 300);
    }
  };

  const handleTextChange = (value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, question7: sanitizedValue }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate form data
      const validationResult = formSchema.safeParse(formData);
      
      if (!validationResult.success) {
        const firstError = validationResult.error.errors[0];
        toast.error(firstError.message || "Dados inválidos. Verifique suas respostas.");
        setIsSubmitting(false);
        return;
      }

      const validatedData = validationResult.data;

      // Insert into Supabase
      const { error } = await supabase
        .from('diagnostico_cnc')
        .insert({
          email: validatedData.email || null,
          name: validatedData.name || null,
          phone: validatedData.phone || null,
          utm_campaign: validatedData.utm_campaign || null,
          utm_source: validatedData.utm_source || null,
          utm_content: validatedData.utm_content || null,
          utm_medium: validatedData.utm_medium || null,
          utm_term: validatedData.utm_term || null,
          'Você é': validatedData.question1,
          'Qual a sua idade': validatedData.question2,
          'Há quanto tempo você conhece o Prof. Fernando Ferreira': validatedData.question3,
          'Você está empregado': validatedData.question4,
          'Qual o valor do seu salário atual': validatedData.question5,
          'É a primeira vez que você participa da JORNADA DA PROGRAMAÇ': validatedData.question6,
          'O que realmente FALTA você APRENDER para considerar que isso s': validatedData.question7,
        });

      if (error) {
        throw error;
      }

      // Redirect after successful insert
      window.location.href = "https://sndflw.com/i/jornada-fev-26";
    } catch (error) {
      console.error('Erro ao enviar formulário');
      toast.error("Erro ao enviar formulário. Por favor, tente novamente.");
      setIsSubmitting(false);
    }
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
        maxLength={2000}
        isSubmitting={isSubmitting}
      />
    );
  };

  return (
    <div className="w-full px-4">
      <ProgressBar progress={progress} />
      {renderCurrentQuestion()}
    </div>
  );
};

export default CNCForm;
