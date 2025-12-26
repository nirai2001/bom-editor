import { StyleState } from '@/context/style-context';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (styleData:StyleState) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();
  // 1. Header & Style Identity
  doc.setFontSize(20);
  doc.text('APPAREL TECH PACK: BOM', 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${date}`, 14, 30);

  // Style Info Box
  doc.setDrawColor(200);
  doc.line(14, 35, 196, 35); // Horizontal line
  
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Style Name: ${styleData.styleName || 'N/A'}`, 14, 45);
  doc.text(`Style ID: ${styleData.styleId || 'N/A'}`, 14, 52);
  doc.text(`Season: ${styleData.season}`, 14, 59);
  doc.text(`Fit: ${styleData.fit} | Fabric: ${styleData.fabricType}`, 14, 66);

  // 2. Construction Notes
  doc.setFontSize(14);
  doc.text('Construction Details', 14, 80);
  doc.setFontSize(10);
  const splitNotes = doc.splitTextToSize(styleData.construction || 'No construction notes provided.', 180);
  doc.text(splitNotes, 14, 87);

  // 3. Components Table
  const tableColumn = ["Category", "Description", "Usage", "Unit Cost", "Total"];
  const tableRows = styleData.components.map(item => [
    item.category,
    item.desc,
    `${item.qty} ${item.unit}`,
    `$${item.cost.toFixed(2)}`,
    `$${(item.qty * item.cost).toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: 100,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235] }, // Blue-600
  });

  // 4. Final Costing Summary
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  const materialTotal = styleData.components.reduce((acc, item) => acc + (item.qty * item.cost), 0);
  const landedCost = materialTotal + styleData.laborCost + (styleData.laborCost * (styleData.overhead / 100));

  doc.setFontSize(12);
  doc.text(`Material Subtotal: $${materialTotal.toFixed(2)}`, 140, finalY, { align: 'right' });
  doc.text(`Labor Cost: $${styleData.laborCost.toFixed(2)}`, 140, finalY + 7, { align: 'right' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total Landed Cost: $${landedCost.toFixed(2)}`, 140, finalY + 17, { align: 'right' });

  // Save the PDF
  doc.save(`Techpack_${styleData.styleId || 'Export'}.pdf`);
};