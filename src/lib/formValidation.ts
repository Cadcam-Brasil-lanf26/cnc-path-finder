import { z } from 'zod';

export const formSchema = z.object({
  email: z.string().email("Email inválido").max(255).optional().or(z.literal('')),
  name: z.string().max(100, "Nome muito longo").optional().or(z.literal('')),
  phone: z.string().max(30, "Telefone muito longo").optional().or(z.literal('')),
  utm_campaign: z.string().max(100).optional().or(z.literal('')),
  utm_source: z.string().max(100).optional().or(z.literal('')),
  utm_content: z.string().max(100).optional().or(z.literal('')),
  utm_medium: z.string().max(100).optional().or(z.literal('')),
  utm_term: z.string().max(100).optional().or(z.literal('')),
  question1: z.string().min(1, "Selecione uma opção").max(200, "Resposta muito longa"),
  question2: z.string().min(1, "Selecione uma opção"),
  question3: z.string().min(1, "Selecione uma opção"),
  question4: z.string().min(1, "Selecione uma opção"),
  question5: z.string().min(1, "Selecione uma opção"),
  question6: z.string().min(1, "Selecione uma opção"),
  question7: z.string().min(20, "Mínimo de 20 caracteres").max(2000, "Resposta muito longa"),
});

export type FormData = z.infer<typeof formSchema>;

export const sanitizeInput = (input: string): string => {
  return input.trim().slice(0, 2000);
};
