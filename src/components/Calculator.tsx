
import React, { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, Plus, Minus, X, Divide } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

const Calculator = () => {
  const [num1, setNum1] = useState<string>('0');
  const [num2, setNum2] = useState<string>('0');
  const [operation, setOperation] = useState<Operation>('add');
  const [result, setResult] = useState<number | string>(0);

  useEffect(() => {
    calculateResult();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num1, num2, operation]);

  function calculateResult() {
    const parsedNum1 = parseFloat(num1) || 0;
    const parsedNum2 = parseFloat(num2) || 0;

    switch (operation) {
      case 'add':
        setResult(parsedNum1 + parsedNum2);
        break;
      case 'subtract':
        setResult(parsedNum1 - parsedNum2);
        break;
      case 'multiply':
        setResult(parsedNum1 * parsedNum2);
        break;
      case 'divide':
        if (parsedNum2 === 0) {
          setResult('Erro: Divisão por zero');
        } else {
          setResult(parsedNum1 / parsedNum2);
        }
        break;
      default:
        setResult(0);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  const getOperationIcon = () => {
    switch (operation) {
      case 'add':
        return <Plus className="h-4 w-4" />;
      case 'subtract':
        return <Minus className="h-4 w-4" />;
      case 'multiply':
        return <X className="h-4 w-4" />;
      case 'divide':
        return <Divide className="h-4 w-4" />;
      default:
        return <Plus className="h-4 w-4" />;
    }
  };

  return (
    <Card className="p-6 bg-white shadow-lg rounded-2xl max-w-md w-full mx-auto">
      <div className="flex items-center justify-center gap-2 mb-6">
        <CalculatorIcon className="h-6 w-6 text-calculator-purple" />
        <h2 className="text-2xl font-bold text-gray-800">Calculadora Aritmética</h2>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="num1" className="text-sm font-medium text-gray-700">
            Primeiro Número
          </label>
          <Input
            id="num1"
            type="text"
            value={num1}
            onChange={(e) => handleInputChange(e, setNum1)}
            className="border-gray-300 focus:ring-calculator-purple focus:border-calculator-purple"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="operation" className="text-sm font-medium text-gray-700">
            Operação
          </label>
          <Select
            value={operation}
            onValueChange={(value) => setOperation(value as Operation)}
          >
            <SelectTrigger className="w-full border-gray-300 focus:ring-calculator-purple focus:border-calculator-purple">
              <SelectValue placeholder="Selecione uma operação">
                <div className="flex items-center gap-2">
                  {getOperationIcon()}
                  <span>
                    {operation === 'add' && 'Adição'}
                    {operation === 'subtract' && 'Subtração'}
                    {operation === 'multiply' && 'Multiplicação'}
                    {operation === 'divide' && 'Divisão'}
                  </span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Adição</span>
                </div>
              </SelectItem>
              <SelectItem value="subtract">
                <div className="flex items-center gap-2">
                  <Minus className="h-4 w-4" />
                  <span>Subtração</span>
                </div>
              </SelectItem>
              <SelectItem value="multiply">
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  <span>Multiplicação</span>
                </div>
              </SelectItem>
              <SelectItem value="divide">
                <div className="flex items-center gap-2">
                  <Divide className="h-4 w-4" />
                  <span>Divisão</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="num2" className="text-sm font-medium text-gray-700">
            Segundo Número
          </label>
          <Input
            id="num2"
            type="text"
            value={num2}
            onChange={(e) => handleInputChange(e, setNum2)}
            className="border-gray-300 focus:ring-calculator-purple focus:border-calculator-purple"
          />
        </div>

        <div className="p-4 bg-calculator-light-purple rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Resultado</div>
          <div className="text-2xl font-bold text-calculator-purple">
            {typeof result === 'number' ? result.toLocaleString('pt-BR', { maximumFractionDigits: 10 }) : result}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Calculator;
