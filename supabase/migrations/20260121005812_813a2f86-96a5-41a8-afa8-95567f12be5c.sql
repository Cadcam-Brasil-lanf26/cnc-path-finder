-- Create table for CNC diagnostic form responses
CREATE TABLE public.diagnostico_cnc (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  name TEXT,
  phone TEXT,
  utm_campaign TEXT,
  utm_source TEXT,
  utm_content TEXT,
  utm_medium TEXT,
  utm_term TEXT,
  "Você é" TEXT NOT NULL,
  "Qual a sua idade" TEXT NOT NULL,
  "Há quanto tempo você conhece o Prof. Fernando Ferreira" TEXT NOT NULL,
  "Você está empregado" TEXT NOT NULL,
  "Qual o valor do seu salário atual" TEXT NOT NULL,
  "É a primeira vez que você participa da JORNADA DA PROGRAMAÇÃO CNC" TEXT NOT NULL,
  "O que realmente FALTA você APRENDER para considerar que isso seja um diferencial aí na sua realidade" TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.diagnostico_cnc ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (form submissions)
CREATE POLICY "Allow anonymous inserts" 
ON public.diagnostico_cnc 
FOR INSERT 
WITH CHECK (true);

-- Create policy to prevent public reads (only admin access via service role)
CREATE POLICY "Deny public reads" 
ON public.diagnostico_cnc 
FOR SELECT 
USING (false);