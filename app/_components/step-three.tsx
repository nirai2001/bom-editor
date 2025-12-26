import { useStyle } from "@/context/style-context";
import { saveStyleToDb } from "@/service/style-service";
import { exportToPDF } from "@/utils/export-pdf";
import { Info, Save } from "lucide-react";
interface Step3Props {
    handleRedirect: () => void;
}

export const Step3Costing = ({ handleRedirect }: Step3Props) => {
    const { state, updateState } = useStyle();
    const handleFinalClick = async () => {
        exportToPDF(state);
        try{
            const response = await saveStyleToDb(state);
            if (response) {
                console.log("Techpack saved:", response);
                handleRedirect();
            }
        } catch (error) {
            window.alert("Error saving techpack: " + error);
            return;
        }

    }
    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Final Costing Aggregator</h2>
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl mb-8 flex justify-between items-center">
                <div>
                    <p className="text-blue-800 text-sm font-semibold uppercase">Total Material Cost</p>
                    <h3 className="text-3xl font-black text-blue-900">
                        ${state.components.reduce((acc, item) => acc + (item.qty * item.cost), 0).toFixed(2)}
                    </h3>
                </div>
                <Info className="text-blue-400" size={32} />
            </div>
            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm font-bold text-slate-700">Labor Cost (CMT)</span>
                        <input type="number" className="w-full mt-1 p-3 border rounded-lg" value={state.laborCost} onChange={(e) => updateState({ laborCost: parseFloat(e.target.value) })} />
                    </label>
                    <label className="block">
                        <span className="text-sm font-bold text-slate-700">Factory Overhead (%)</span>
                        <input type="number" className="w-full mt-1 p-3 border rounded-lg" value={state.overhead} onChange={(e) => updateState({ overhead: parseFloat(e.target.value) })} />
                    </label>
                </div>
                <div className="bg-slate-900 text-white p-6 rounded-xl flex flex-col justify-center">
                    <p className="text-slate-400 text-sm">Estimated Landed Cost</p>
                    <h2 className="text-4xl font-bold text-green-400">
                        ${(
                            state.components.reduce((acc, item) => acc + (item.qty * item.cost), 0) +
                            state.laborCost +
                            (state.laborCost * (state.overhead / 100))
                        ).toFixed(2)}
                    </h2>
                    <button className={`mt-6 flex items-center justify-center gap-2 bg-blue-600 p-3 rounded-lg font-bold hover:bg-blue-500 ${state.components.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleFinalClick} disabled={state.components.length === 0}>
                        <Save size={18} /> Finalize Techpack
                    </button>
                </div>
            </div>
        </div>
    );
};