import { useStyle } from "@/context/style-context";

export const Step1Identity = () => {
    const { state, updateState } = useStyle();

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Cut of Style & Construction</h2>
            <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-all">
                        <span className="block font-bold">Fit</span>
                        <select className="w-full mt-2 p-2 bg-slate-50 rounded" value={state.fit} onChange={(e) => updateState({ 'fit': e.target.value })}>
                            <option>Slim Fit</option><option>Regular</option><option>Oversized</option>
                        </select>
                    </div>
                    <div className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer">
                        <span className="block font-bold">Fabric Class</span>
                        <select className="w-full mt-2 p-2 bg-slate-50 rounded" value={state.fabricType} onChange={(e) => updateState({ 'fabricType': e.target.value })}>
                            <option>Woven</option><option>Knit</option><option>Seamless</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Technical Construction Notes</label>
                    <textarea className="w-full p-3 border rounded-lg h-32"
                        placeholder="Describe seam types, stitching (e.g. 1/4 inch double needle top stitch)..."
                        value={state.construction} onChange={(e) => updateState({ 'construction': e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
};