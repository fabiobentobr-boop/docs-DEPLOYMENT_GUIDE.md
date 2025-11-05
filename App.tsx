
import React, { useState, useCallback } from 'react';
import type { FormDataType } from './types.ts';
import { vehicleOptions } from './constants.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { FormSection } from './components/FormSection.tsx';
import { TextInput, RadioGroup, FileInput, VehicleSelector } from './components/FormInputs.tsx';
import { CheckCircleIcon, AlertTriangleIcon } from './components/Icons.tsx';

const initialFormData: FormDataType = {
  date: '', carrier: '', globalProcessNumber: '', vehiclePlate: '', implement1Plate: '', implement2Plate: '',
  vehicleConfig: '', pbtCompliant: '', pbtEvidence: [], loadType: '', palletSpaces: '', palletSpacesEvidence: [],
  palletsTipped: '', palletsTippedEvidence: [], stretchMissing: '', stretchMissingEvidence: [],
  woodCorrectAmount: '', woodCorrectAmountEvidence: [], woodWrongThickness: '', woodWrongThicknessEvidence: [],
  woodAbnormalSpacing: '', woodAbnormalSpacingEvidence: [], woodCorrectlyPlaced: '', woodCorrectlyPlacedEvidence: [],
  internalRopes: '', internalRopesEvidence: [], ratchetStrapsOverWood: '', ratchetStrapsOverWoodEvidence: [],
  uniformLoading: '', uniformLoadingEvidence: [], generalRemarks: [],
};

const yesNoOptions = ['Sim', 'Não'] as const;
const loadTypeOptions = ['Paletizada', 'Batida', 'Carregamento misto'] as const;

export default function App() {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = useCallback((field: keyof FormDataType, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    const data = new FormData();
    
    // Adiciona um assunto dinâmico para o e-mail para melhor organização
    data.append('_subject', `Novo Formulário de Adernamento - ${formData.carrier || 'N/A'} - ${formData.date || 'N/A'}`);
    
    // Anexa todos os campos do formulário ao objeto FormData
    Object.keys(formData).forEach(key => {
      const value = formData[key as keyof FormDataType];
      if (Array.isArray(value)) {
        // Lida com arrays de arquivos
        value.forEach(file => {
          data.append(key, file);
        });
      } else if (value) {
        // Lida com strings e outros valores, mas não anexa se estiver vazio
        data.append(key, value);
      }
    });

    try {
      // O endpoint do Formspree foi corrigido e agora usa um ID funcional.
      const response = await fetch('https://formspree.io/f/mgegygwy', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitSuccess(true);
        window.scrollTo(0, 0);
        // Reseta o formulário após mostrar a mensagem de sucesso
        setTimeout(() => {
          setFormData(initialFormData);
          setSubmitSuccess(null);
        }, 5000);
      } else {
        const responseData = await response.json();
        if (responseData.errors) {
          setSubmitError(responseData.errors.map((error: any) => error.message).join(', '));
        } else {
          setSubmitError('Ocorreu um erro ao enviar o formulário. Tente novamente.');
        }
        window.scrollTo(0, 0);
      }
    } catch (error) {
      setSubmitError('Falha na conexão. Verifique sua internet e tente novamente.');
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const questionPairs: {q: string, f: keyof FormDataType, fe: keyof FormDataType}[] = [
    { q: '8. A carga está contemplada no PBT do veículo?', f: 'pbtCompliant', fe: 'pbtEvidence' },
    { q: '11. Existem espaços entre um palete e outro que possam ocasionar movimentações da carga?', f: 'palletSpaces', fe: 'palletSpacesEvidence' },
    { q: '13. Os paletes estão tombados?', f: 'palletsTipped', fe: 'palletsTippedEvidence' },
    { q: '15. Há indício de falta de stretch na carga paletizada?', f: 'stretchMissing', fe: 'stretchMissingEvidence' },
    { q: '17. A quantidade de madeirites está correta?', f: 'woodCorrectAmount', fe: 'woodCorrectAmountEvidence' },
    { q: '19. Há presença de madeirite fora da espessura padrão de no mínimo 1 cm?', f: 'woodWrongThickness', fe: 'woodWrongThicknessEvidence' },
    { q: '21. Existem espaçamento anormal entre os madeirites?', f: 'woodAbnormalSpacing', fe: 'woodAbnormalSpacingEvidence' },
    { q: '23. Os madeirites estão alocados corretamente na guia interna?', f: 'woodCorrectlyPlaced', fe: 'woodCorrectlyPlacedEvidence' },
    { q: '25. Há presença de cordas internas unindo as réguas entre os madeirites?', f: 'internalRopes', fe: 'internalRopesEvidence' },
    { q: '27. As cintas catracas estão por cima dos madeirites gerando apoio à carga?', f: 'ratchetStrapsOverWood', fe: 'ratchetStrapsOverWoodEvidence' },
    { q: '29. O carregamento foi feito de forma uniforme e padronizado?', f: 'uniformLoading', fe: 'uniformLoadingEvidence' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {submitSuccess && (
            <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded-lg flex items-center" role="alert">
              <CheckCircleIcon className="w-6 h-6 mr-3"/>
              <p>Formulário enviado com sucesso! Obrigado.</p>
            </div>
          )}
          {submitError && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg flex items-center" role="alert">
              <AlertTriangleIcon className="w-6 h-6 mr-3 flex-shrink-0"/>
              <div>
                <p className="font-bold">Erro no envio!</p>
                <p className="text-sm">{submitError}</p>
              </div>
            </div>
          )}

          <FormSection title="Informações Gerais">
            <TextInput label="1. Data" id="date" type="date" value={formData.date} onChange={e => handleChange('date', e.target.value)} required />
            <TextInput label="2. Transportadora" id="carrier" value={formData.carrier} onChange={e => handleChange('carrier', e.target.value)} required />
            <TextInput label="3. Número processo Global" id="globalProcessNumber" value={formData.globalProcessNumber} onChange={e => handleChange('globalProcessNumber', e.target.value)} required />
            <TextInput label="4. Placa automotor" id="vehiclePlate" value={formData.vehiclePlate} onChange={e => handleChange('vehiclePlate', e.target.value)} required />
            <TextInput label="5. Placa 1º implemento" id="implement1Plate" value={formData.implement1Plate} onChange={e => handleChange('implement1Plate', e.target.value)} />
            <TextInput label="6. Placa 2º implemento" id="implement2Plate" value={formData.implement2Plate} onChange={e => handleChange('implement2Plate', e.target.value)} />
          </FormSection>

          <FormSection>
            <VehicleSelector options={vehicleOptions} value={formData.vehicleConfig} onChange={val => handleChange('vehicleConfig', val)} required />
          </FormSection>

          <FormSection title="Checklist de Carregamento">
            {questionPairs.map(pair => (
              <div key={pair.f} className="p-4 border border-gray-700 rounded-lg space-y-4">
                <RadioGroup label={pair.q} options={[...yesNoOptions]} value={formData[pair.f] as string} onChange={val => handleChange(pair.f, val)} required />
                <FileInput label={`Evidência para "${pair.q.substring(3, pair.q.indexOf('?'))}"`} files={formData[pair.fe] as File[]} onFilesChange={files => handleChange(pair.fe, files)} />
              </div>
            ))}
            
            <div className="p-4 border border-gray-700 rounded-lg space-y-4">
              <RadioGroup label="10. Tipo de carregamento" options={[...loadTypeOptions]} value={formData.loadType} onChange={val => handleChange('loadType', val)} required />
            </div>

            <div className="p-4 border border-gray-700 rounded-lg space-y-4">
              <FileInput label="31. Registro gerais e avarias" files={formData.generalRemarks} onFilesChange={files => handleChange('generalRemarks', files)} maxFiles={10} required />
            </div>
          </FormSection>

          <div className="text-center pt-4">
            <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center px-12 py-4 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : 'Enviar Formulário'}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
