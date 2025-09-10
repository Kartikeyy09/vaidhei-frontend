import React, { useState } from 'react';
import { ArrowDownTrayIcon, PrinterIcon } from '@heroicons/react/24/solid'; 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InvoicePreview = ({ invoiceData }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        } catch (error) { return ''; }
    };

    const convertAmountToWords = (amount) => {
        if (isNaN(amount)) return "";
        const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        const numToWords = (num) => {
            if (num === 0) return "Zero";
            if (num < 20) return ones[num];
            if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
            if (num < 1000) return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + numToWords(num % 100) : "");
            if (num < 100000) return numToWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + numToWords(num % 1000) : "");
            if (num < 10000000) return numToWords(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + numToWords(num % 100000) : "");
            return numToWords(Math.floor(num / 10000000)) + " Crore" + (num % 10000000 ? " " + numToWords(num % 10000000) : "");
        };
        const integerPart = Math.floor(amount);
        const decimalPart = Math.round((amount - integerPart) * 100);
        let words = "INR " + numToWords(integerPart);
        if (decimalPart > 0) { words += " and " + numToWords(decimalPart) + " Paise"; }
        return words + " Only";
    };
    
    const generateInvoicePDF = async () => {
        const input = document.getElementById(`invoice-print-area-${invoiceData.id}`);
        const canvas = await html2canvas(input, { scale: 3, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasRatio = canvas.width / canvas.height;
        const pageRatio = (pdfWidth - 20) / (pdfHeight - 20);

        let imgWidth, imgHeight;
        if (canvasRatio > pageRatio) {
            imgWidth = pdfWidth - 20;
            imgHeight = imgWidth / canvasRatio;
        } else {
            imgHeight = pdfHeight - 20;
            imgWidth = imgHeight * canvasRatio;
        }
        
        const x = (pdfWidth - imgWidth) / 2;
        const y = 10;
        
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        return pdf;
    };

    const handleDownloadPDF = async () => {
        setIsProcessing(true);
        try {
            const pdf = await generateInvoicePDF();
            pdf.save(`Invoice-${invoiceData.invoiceNo}.pdf`);
        } catch (error) {
            console.error("Failed to generate PDF for download:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    // --- FUNCIÓN DE IMPRESIÓN CORREGIDA Y SIMPLIFICADA ---
    const handlePrint = async () => {
        setIsProcessing(true);
        try {
            const pdf = await generateInvoicePDF();
            // Genera el PDF como un Blob
            const pdfBlob = pdf.output('blob');
            // Crea una URL para el Blob
            const url = URL.createObjectURL(pdfBlob);
            // Abre la URL en una nueva pestaña. El navegador se encargará del resto.
            window.open(url, '_blank');
            // La URL se puede revocar después de un tiempo para liberar memoria,
            // pero el navegador la mantendrá viva mientras la pestaña esté abierta.
        } catch (error) {
            console.error("Failed to generate PDF for printing:", error);
        } finally {
            setIsProcessing(false);
        }
    };
    
    if (!invoiceData) return null;

    const totalTax = (invoiceData.totalSgst || 0) + (invoiceData.totalCgst || 0) + (invoiceData.totalIgst || 0);

    return (
        <div>
            <div className="p-4 flex justify-end gap-4">
                 <button 
                    onClick={handleDownloadPDF} 
                    disabled={isProcessing}
                    className="flex items-center gap-2 bg-green-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    <ArrowDownTrayIcon className="w-5 h-5"/> 
                    {isProcessing ? 'Processing...' : 'Download PDF'}
                 </button>
                 <button 
                    onClick={handlePrint} 
                    disabled={isProcessing}
                    className="flex items-center gap-2 bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    <PrinterIcon className="w-5 h-5"/> 
                    {isProcessing ? 'Processing...' : 'Print'}
                 </button>
            </div>
            
            <div id={`invoice-print-area-${invoiceData.id}`} className="bg-white p-4 sm:p-6 text-sm">
                {/* El contenido de la factura no cambia */}
                 <div className="border border-black">
                    <h1 className="text-center text-xl font-bold py-2">Tax Invoice</h1>
                    <div className="flex border-t border-black">
                        <div className="w-1/2 p-2 border-r border-black">
                            <p className="font-bold">{invoiceData.sellerName}</p>
                            <p className="whitespace-pre-wrap">{invoiceData.sellerAddress}</p>
                            {invoiceData.sellerPan && <p><span className="font-bold">PAN:</span> {invoiceData.sellerPan}</p>}
                            <p><span className="font-bold">GSTIN/UIN:</span> {invoiceData.sellerGstin}</p>
                            <p><span className="font-bold">State Name:</span> {invoiceData.sellerState}, <span className="font-bold">State Code:</span> {invoiceData.sellerStateCode}</p>
                            <p><span className="font-bold">Email:</span> {invoiceData.sellerEmail}</p>
                        </div>
                        <div className="w-1/2 text-xs">
                            <div className="flex border-b border-black"><div className="w-1/2 p-2 border-r border-black"><span className="font-bold">Invoice No.</span><br />{invoiceData.invoiceNo}</div><div className="w-1/2 p-2">
                            <span className="font-bold">Dated</span><br />{formatDate(invoiceData.invoiceDate)}</div></div>
                            <div className="flex border-b border-black"><div className="w-1/2 p-2 border-r border-black">
                            <span className="font-bold">Delivery Note</span><br/></div>
                            <div className='w-1/2 p-2'> <p className="">Mode/Terms of Payment</p>
                            <span><span className="font-bold"></span> {invoiceData.bankName}</span>
                            <span className="">A/c No. </span> {invoiceData.bankAcNo}
                            <p><span className="font-bold">IFSC:</span> {invoiceData.bankIfsc}</p></div>
                            </div>
                            <div className="flex border-b border-black">
                            <div className="w-1/2 p-2 border-r border-black">
                            <span className="font-bold">Supplier's Ref.</span>
                            </div>
                            <div className='w-1/2 p-2'> <p>Other Reference(s)</p>
                             {invoiceData.periodFrom && invoiceData.periodTo && 
                             <p className="font-bold">For the period from {formatDate(invoiceData.periodFrom)} to {formatDate(invoiceData.periodTo)}</p>}</div>
                            </div>
                            <div className="flex border-b border-black">
                            <div className="w-1/2 p-2 border-r border-black">
                            <span className="font-bold">Buyer's Order No.</span><br />{formatDate(invoiceData.dateOfSupply)}</div>
                            <div className="w-1/2 p-2"><span className="font-bold">Dated</span><br />{invoiceData.placeOfSupply}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-t border-black">
                        <div className="w-1/2 p-2 border-r border-black">
                            <p className="font-bold">Buyer</p>
                            <p>{invoiceData.buyerName}</p>
                            <p className="whitespace-pre-wrap">{invoiceData.buyerAddress}</p>
                            <p><span className="font-bold">GSTIN/UIN:</span> {invoiceData.buyerGstin}</p>
                            <p><span className="font-bold">State Name:</span> {invoiceData.buyerState}, <span className="font-bold">State Code:</span> {invoiceData.buyerStateCode}</p>
                        </div>
                        <div className="w-1/2 text-xs"><div className="p-2 h-full"><span className="font-bold">Terms of Delivery</span><br />{invoiceData.termsOfDelivery}</div></div>
                    </div>
                    <table className="w-full border-t border-black text-center text-[10px] sm:text-sm">
                        <thead className="font-bold bg-gray-50">
                            <tr><td className="w-10 p-1 border-r border-black">Sl<br/>No.</td><td className="w-2/5 p-1 border-r border-black">ITEM DESCRIPTION</td><td className="p-1 border-r border-black">HSN/SAC</td><td className="p-1 border-r border-black">Amount</td><td colSpan="3" className="p-1 border-r border-black">GST Rates</td><td colSpan="3" className="p-1 border-r border-black">GST Amount</td><td className="p-1">Total<br/>Amount</td></tr>
                            <tr><td className="border-t border-r border-black p-1"></td><td className="border-t border-r border-black p-1"></td><td className="border-t border-r border-black p-1"></td><td className="border-t border-r border-black p-1"></td><td className="w-12 border-t border-r border-black p-1">SGST</td><td className="w-12 border-t border-r border-black p-1">CGST</td><td className="w-12 border-t border-r border-black p-1">IGST</td><td className="w-20 border-t border-r border-black p-1">SGST</td><td className="w-20 border-t border-r border-black p-1">CGST</td><td className="w-20 border-t border-r border-black p-1">IGST</td><td className="border-t border-black p-1"></td></tr>
                        </thead>
                        <tbody>
                            {invoiceData.items.map((item, index) => (
                                <tr key={index} className="border-t border-black align-top"><td className="p-1 border-r border-black">{index + 1}</td><td className="p-1 border-r border-black text-left whitespace-pre-wrap">{item.description}</td><td className="p-1 border-r border-black">{item.hsn}</td><td className="p-1 border-r border-black text-right">{item.amount.toFixed(2)}</td><td className="p-1 border-r border-black">{item.sgstRate}%</td><td className="p-1 border-r border-black">{item.cgstRate}%</td><td className="p-1 border-r border-black">{item.igstRate}%</td><td className="p-1 border-r border-black text-right">{item.sgstAmount.toFixed(2)}</td><td className="p-1 border-r border-black text-right">{item.cgstAmount.toFixed(2)}</td><td className="p-1 border-r border-black text-right">{item.igstAmount.toFixed(2)}</td><td className="p-1 text-right">{item.total.toFixed(2)}</td></tr>
                            ))}
                            <tr className="border-t-2 border-black font-bold"><td colSpan="3" className="p-1 text-right border-r border-black">Total</td><td className="p-1 text-right border-r border-black">{invoiceData.totalAmount.toFixed(2)}</td><td colSpan="3" className="border-r border-black"></td><td className="p-1 text-right border-r border-black">{invoiceData.totalSgst.toFixed(2)}</td><td className="p-1 text-right border-r border-black">{invoiceData.totalCgst.toFixed(2)}</td><td className="p-1 text-right border-r border-black">{invoiceData.totalIgst.toFixed(2)}</td><td className="p-1 text-right">{invoiceData.grandTotal.toFixed(2)}</td></tr>
                        </tbody>
                    </table>
                    <div className="flex justify-between border-t border-black p-2">
                        <div><span className="font-bold">Amount Chargeable (in words):</span><br/>{convertAmountToWords(invoiceData.grandTotal)}</div>
                        <div className="font-bold">E. & O.E</div>
                    </div>
                    <table className="w-full border-t border-black text-center text-[10px] sm:text-sm">
                        <thead className="font-bold"><tr><td rowSpan="2" className="p-1 border-r border-black">HSN/SAC</td><td rowSpan="2" className="p-1 border-r border-black">Taxable Value</td><td colSpan="2" className="p-1 border-r border-black">CGST</td><td colSpan="2" className="p-1 border-r border-black">SGST</td><td colSpan="2" className="p-1 border-r border-black">IGST</td><td rowSpan="2" className="p-1">Total Tax Amount</td></tr><tr><td className="p-1 border-t border-r border-black">Rate</td><td className="p-1 border-t border-r border-black">Amount</td><td className="p-1 border-t border-r border-black">Rate</td><td className="p-1 border-t border-r border-black">Amount</td><td className="p-1 border-t border-r border-black">Rate</td><td className="p-1 border-t border-r border-black">Amount</td></tr></thead>
                        <tbody>
                            {Object.entries(invoiceData.taxSummary).map(([hsn, data]) => (
                                <tr key={hsn} className="border-t border-black"><td className="p-1 border-r border-black">{hsn}</td><td className="p-1 border-r border-black">{data.taxableValue.toFixed(2)}</td><td className="p-1 border-r border-black">{data.cgstRate}%</td><td className="p-1 border-r border-black">{data.cgstAmount.toFixed(2)}</td><td className="p-1 border-r border-black">{data.sgstRate}%</td><td className="p-1 border-r border-black">{data.sgstAmount.toFixed(2)}</td><td className="p-1 border-r border-black">{data.igstRate}%</td><td className="p-1 border-r border-black">{data.igstAmount.toFixed(2)}</td><td className="p-1">{(data.cgstAmount + data.sgstAmount + data.igstAmount).toFixed(2)}</td></tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="border-t border-black p-2"><span className="font-bold">Tax Amount (in words) : </span> {convertAmountToWords(totalTax)}</div>
                    <div className="flex border-t border-black">
                        <div className="w-1/2 p-2 border-r border-black"><p className="font-bold">Declaration</p><p className="text-xs">{invoiceData.declaration}</p></div>
                        <div className="w-1/2 p-2 text-center flex flex-col justify-between items-center"><p className="font-bold">for {invoiceData.sellerName}</p><p className="mt-16">Authorised Signatory</p></div>
                    </div>
                </div>
                <p className="text-center text-xs mt-2">This is a Computer Generated Invoice</p>
            </div>
        </div>
    );
};

export default InvoicePreview;