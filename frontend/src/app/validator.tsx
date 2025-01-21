'use client'
import { useState, useEffect } from "react";
import usePatterns, { INumberPatternData } from "./usePatterns";
import useValidation from "./useValidate";

const styles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundImage: 'linear-gradient(to bottom right, #b3cde8, #d1d5db, #6b7280)',
};

export default function Validator() {
  const { data: patterns, error, isLoading } = usePatterns();
  const [creditCardNumber, setCreditCardNumber] = useState<string>('');
  const [formatterNumber, setFormatterNumber] = useState<string>();
  const [currentPattern, setCurrentPattern] = useState<INumberPatternData | null>();
  const { mutate, data: valid } = useValidation();

  useEffect(() => {
    const sanitizedNumber = creditCardNumber.replace(/\D+/g, '');
    if (!creditCardNumber) {
      setFormatterNumber('');
      setCurrentPattern(null);
      mutate(null);
      return;
    }
    const pattern = handleCardPattern(creditCardNumber.charAt(0));
    setCurrentPattern(pattern);
    setFormatterNumber(handleFormat(sanitizedNumber, pattern).trim());
    
    if (pattern && pattern.size === sanitizedNumber.length) {
      mutate(sanitizedNumber);
    }
  }, [creditCardNumber, patterns]);

  const handleFormat = (value: string, pattern: INumberPatternData | null): string => {
    if (!pattern) {
      return '';
    }
    const format = pattern.format;
    const result = format.reduce((accumulator, currentValue) => {
      const { formatted, startPosition  } = accumulator;
      const newValue = formatted + `${value.slice(startPosition, startPosition + currentValue)} `;
      return {
        formatted: newValue,
        startPosition: startPosition + currentValue
      }
    }, {formatted: '', startPosition: 0});
    return result.formatted;
  } 

  const handleCardPattern = (code: string):INumberPatternData | null  => {
    if (!code || !patterns) {
      return null;
    }
    const found = patterns.find((pattern: INumberPatternData) => pattern.code === code);
    if (found) {
      return found;
    }

    return patterns.find((pattern: INumberPatternData) => !pattern.code) || null;
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>ERROR. Something went wrong and is not possible to use the app</div>
  }

  const handleBackground = () => {
    if (valid === undefined) {
      return styles;
    }
    return {
      ...styles,
      backgroundImage: valid ? 'linear-gradient(to bottom right, #a7f3d0, #34d399, #10b981)' : 'linear-gradient(to bottom right, #fecaca, #f87171, #ef4444)'
    }
  }

  const handleMessage = () => {
    if (valid === undefined) {
      return;
    }

    if (valid) {
      return (
        <label className="block mb-1 text-sm text-green-800 mt-4">
          This is a valid credit card number.
        </label>
      );
    }

    return (
      <label className="block mb-1 text-sm text-red-800 mt-4">
        This is an invalid credit card number.
      </label>
    );
  }

  return (
    <div style={handleBackground()}>
      <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl'>
        <div className='max-w-md mx-auto space-y-6'>
           <div className="w-full max-w-md mx-auto min-w-[200px] mt-4">
                <label className="block mb-1 text-sm text-slate-800 mt-4">
                    Inform the credit card number:
                </label>
                <input
                    type="tel"
                    id="cardNumber"
                    value={formatterNumber}
                    onChange={e => setCreditCardNumber(e.target.value)}
                    className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                    placeholder="#### #### #### ####"
                />
                <label className="block text-xs text-slate-800">
                  {currentPattern && `(This credit card was identified as ${currentPattern.name})`}
                </label>
                </div>
                {handleMessage()}
            </div>
        </div>
    </div>
  );
}
