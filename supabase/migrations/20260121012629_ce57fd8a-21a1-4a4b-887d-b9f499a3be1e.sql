-- Add RLS policies to deny UPDATE and DELETE operations on diagnostico_cnc
CREATE POLICY "Deny public updates"
ON public.diagnostico_cnc
FOR UPDATE
TO anon, authenticated
USING (false);

CREATE POLICY "Deny public deletes"
ON public.diagnostico_cnc
FOR DELETE
TO anon, authenticated
USING (false);