"use client"
import { useState } from 'react';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { Step1Identity } from './step-one';
import { Step2Components } from './step-two';
import { Step3Costing } from './step-three';
import { useStyle } from '@/context/style-context';

const BOMStepperApp = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);

    const { state, updateState } = useStyle();

    const steps = ["Style Identity", "Cut & Construction", "Components", "Final Costing"];

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleRedirect = () => {
        setCurrentStep(0);
        updateState({
            styleId: '',
            styleName: '',
            season: 'SS25',
            fit: 'Regular',
            fabricType: 'Woven',
            construction: '',
            components: [],
            laborCost: 0,
            overhead: 0,
        });
    }
    return (
        <div className="max-w-5xl mx-auto p-8 bg-slate-50 min-h-screen">
            {/* STEPPER HEADER */}
            <div className="flex items-center justify-between mb-10 bg-white p-6 rounded-xl shadow-sm">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${currentStep >= idx ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 text-slate-400"
                            }`}>
                            {currentStep > idx ? <Check size={20} /> : idx + 1}
                        </div>
                        <span className={`ml-3 font-medium ${currentStep === idx ? "text-blue-600" : "text-slate-500"}`}>{step}</span>
                        {idx < steps.length - 1 && <div className="w-12 h-px bg-slate-300 mx-4" />}
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                {/* STEP 0: ROOT LEVEL DATA */}
                {currentStep === 0 && (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-6">Style Identity</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Style ID/Number</label>
                                <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. M-JKT-001" value={state.styleId} onChange={(e) => updateState({ styleId: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Style Name</label>
                                <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. Classic Denim Jacket" value={state.styleName} onChange={(e) => updateState({ styleName: e.target.value })} />
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 1: DEFINE CUT */}
                {currentStep === 1 && (<Step1Identity />)}

                {/* STEP 2: DEFINE COMPONENTS (Simplified View) */}
                {currentStep === 2 && (<Step2Components />)}

                {/* STEP 3: DEFINE COST (Aggregated) */}
                {currentStep === 3 && (<Step3Costing handleRedirect={handleRedirect} />)}

                {/* FOOTER NAVIGATION */}
                <div className="bg-slate-50 p-6 border-t flex justify-between">
                    <button onClick={prevStep} disabled={currentStep === 0}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold ${currentStep === 0 ? "text-slate-300" : "text-slate-600 hover:bg-slate-200"}`}>
                        <ChevronLeft size={20} /> Previous
                    </button>
                    {currentStep !== steps.length - 1 && <button onClick={nextStep} disabled={currentStep === steps.length - 1}
                        className={`flex items-center gap-2 px-8 py-2 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 disabled:opacity-50`}>
                        Next <ChevronRight size={20} />
                    </button>}
                </div>
            </div>
        </div>
    );
};

export default BOMStepperApp;