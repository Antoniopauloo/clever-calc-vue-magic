
import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-calculator-background p-4">
      <div className="w-full max-w-md">
        <Calculator />
      </div>
      <footer className="text-center mt-8 text-sm text-gray-500">
        <p>Calculadora Aritmética em React © 2025</p>
      </footer>
    </div>
  );
};

export default Index;
