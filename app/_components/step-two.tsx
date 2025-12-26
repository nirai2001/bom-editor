import { useStyle } from "@/context/style-context";
import { Plus, Trash2 } from "lucide-react";

export const Step2Components = () => {
    const { state, updateState } = useStyle();

    const addComponent = () => {
        const newItem = {
            id: crypto.randomUUID(), // Generates a unique ID
            category: 'Main Fabric',
            desc: '',
            qty: 0,
            unit: 'Pcs',
            cost: 0,
            waste: 0
        };
        updateState({ components: [...state.components, newItem] });
    };

    const removeComponent = (id: string) => {
        const filtered = state.components.filter(item => item.id !== id);
        updateState({ components: filtered });
    };

    const handleComponentChange = (id: string, field: string, value: any) => {
        const updated = state.components.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        updateState({ components: updated });
    };

    return (
        <div className="p-8">
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Material Components</h2>
                <button
                    onClick={addComponent}
                    className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-100 transition-colors"
                >
                    <Plus size={18} /> Add Item
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b text-left text-slate-500 text-sm">
                            <th className="pb-3 px-2">Category</th>
                            <th className="pb-3 px-2">Description</th>
                            <th className="pb-3 px-2">Qty</th>
                            <th className="pb-3 px-2">Unit Cost</th>
                            <th className="pb-3 px-2 text-right">Total</th>
                            <th className="pb-3 px-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.components.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-slate-50 transition-colors">
                                <td className="py-3 px-2">
                                    <select
                                        className="w-full p-2 border rounded bg-white text-sm"
                                        value={item.category}
                                        onChange={(e) => handleComponentChange(item.id, 'category', e.target.value)}
                                    >
                                        <option>Main Fabric</option>
                                        <option>Trim</option>
                                        <option>Thread</option>
                                        <option>Label/Tag</option>
                                    </select>
                                </td>
                                <td className="py-3 px-2">
                                    <input
                                        type="text"
                                        placeholder="Item name..."
                                        className="w-full p-2 border rounded text-sm"
                                        value={item.desc}
                                        onChange={(e) => handleComponentChange(item.id, 'desc', e.target.value)}
                                    />
                                </td>
                                <td className="py-3 px-2">
                                    <div className="flex gap-1">
                                        <input
                                            type="number"
                                            className="w-16 p-2 border rounded text-sm"
                                            value={item.qty}
                                            onChange={(e) => handleComponentChange(item.id, 'qty', parseFloat(e.target.value) || 0)}
                                        />
                                        <select
                                            className="p-2 border rounded text-xs bg-slate-50"
                                            value={item.unit}
                                            onChange={(e) => handleComponentChange(item.id, 'unit', e.target.value)}
                                        >
                                            <option>Mtr</option><option>Yds</option><option>Pcs</option><option>Set</option>
                                        </select>
                                    </div>
                                </td>
                                <td className="py-3 px-2">
                                    <input
                                        type="number"
                                        className="w-20 p-2 border rounded text-sm"
                                        value={item.cost}
                                        onChange={(e) => handleComponentChange(item.id, 'cost', parseFloat(e.target.value) || 0)}
                                    />
                                </td>
                                <td className="py-3 px-2 text-right font-bold text-slate-700">
                                    ${(item.qty * item.cost).toFixed(2)}
                                </td>
                                <td className="py-3 px-2 text-right">
                                    <button
                                        onClick={() => removeComponent(item.id)}
                                        className="text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {state.components.length === 0 && (
                <div className="text-center py-10 border-2 border-dashed rounded-xl mt-4 text-slate-400">
                    No components added yet. Click Add Item to start building your BOM.
                </div>
            )}
        </div>
    );
};