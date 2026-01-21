import CNCForm from "@/components/CNCForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 md:py-12 px-4">
      {/* Logo */}
      <div className="mb-6 md:mb-8 animate-fade-in">
        <img
          src="https://cadcambrasil.com/wp-content/uploads/2026/01/Cadcam-Brasil-jornada-programacao-CNC.png"
          alt="CADCAM Brasil - Jornada Programação CNC"
          className="h-16 md:h-20 w-auto object-contain"
        />
      </div>

      {/* Title */}
      <div className="text-center mb-8 md:mb-12 max-w-2xl animate-fade-in">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground font-heading leading-tight">
          Faça o seu pré diagnóstico da Especialização CNC
        </h1>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-2xl">
        <CNCForm />
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-12 text-center">
        <p className="text-muted-foreground text-xs font-body">
          © {new Date().getFullYear()} CADCAM Brasil. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Index;
