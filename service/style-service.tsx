import { StyleState } from "@/context/style-context";

export const saveStyleToDb = async (state: StyleState) => {
  try {
    const response = await fetch('/api/styles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });

    if (!response.ok) throw new Error('Failed to save');
    
    const savedData = await response.json();
    alert('Style saved successfully!');
    return savedData;
  } catch (err) {
    console.error(err);
    alert('Error saving techpack');
  }
};