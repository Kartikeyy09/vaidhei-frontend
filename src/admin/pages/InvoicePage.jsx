import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectAllInvoices,
    getInvoicesStatus,
    getInvoicesError,
    fetchInvoicesAsync,
    addInvoiceAsync,
    updateInvoiceAsync,
    deleteInvoiceAsync
} from '../../features/adminSlice/invoices/invoiceSlice';

import InvoiceForm from '../components/invoice/InvoiceForm';
import InvoicePreview from '../components/invoice/InvoicePreview';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon, DocumentTextIcon } from '@heroicons/react/24/solid';

// --- Funciones de Utilidad (Sin cambios) ---
const numberToWordsInr = (num) => {
    // ... (tu función existente)
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const transform = (n) => {
        let str = ''; let rem;
        if (n.length > 2 && n.length <= 9) { rem = n.slice(-2); const rest = n.slice(0, -2); str += transform(rest) + (n.length > 3 ? (n.length > 5 ? (n.length > 7 ? 'Crore ' : 'Lakh ') : 'Thousand ') : 'Hundred '); if (Number(rem) > 0) str += transform(rem);
        } else if (n.length === 2) { if (Number(n) < 20) str += a[Number(n)]; else str += b[Number(n[0])] + ' ' + a[Number(n[1])];
        } else if (n.length === 1 && n !== '0') { str += a[Number(n[0])]; }
        return str;
    };
    if (num === 0) return 'Zero'; const numStr = String(Math.round(num)); let result = transform(numStr); return result.trim() ? `${result.trim()} Only` : '';
};

const calculateInvoiceDetails = (invoice) => {
    // ... (tu función existente)
    if (!invoice) return null;
    const calculatedItems = invoice.items.map(item => {
        const amount = parseFloat(item.amount) || 0;
        const cgstRate = parseFloat(item.cgstRate) || 0;
        const sgstRate = parseFloat(item.sgstRate) || 0;
        const igstRate = parseFloat(item.igstRate) || 0;
        const cgstAmount = amount * (cgstRate / 100);
        const sgstAmount = amount * (sgstRate / 100);
        const igstAmount = amount * (igstRate / 100);
        const total = amount + cgstAmount + sgstAmount + igstAmount;
        return { ...item, amount, cgstRate, sgstRate, igstRate, cgstAmount, sgstAmount, igstAmount, total };
    });
    const totalAmount = calculatedItems.reduce((sum, item) => sum + item.amount, 0);
    const totalCgst = calculatedItems.reduce((sum, item) => sum + item.cgstAmount, 0);
    const totalSgst = calculatedItems.reduce((sum, item) => sum + item.sgstAmount, 0);
    const totalIgst = calculatedItems.reduce((sum, item) => sum + item.igstAmount, 0);
    const grandTotal = calculatedItems.reduce((sum, item) => sum + item.total, 0);
    const totalTaxAmount = totalCgst + totalSgst + totalIgst;
    const taxSummary = calculatedItems.reduce((acc, item) => {
        const hsn = item.hsn || 'N/A';
        if (!acc[hsn]) {
            acc[hsn] = { taxableValue: 0, cgstRate: item.cgstRate, sgstRate: item.sgstRate, igstRate: item.igstRate, cgstAmount: 0, sgstAmount: 0, igstAmount: 0 };
        }
        acc[hsn].taxableValue += item.amount;
        acc[hsn].cgstAmount += item.cgstAmount;
        acc[hsn].sgstAmount += item.sgstAmount;
        acc[hsn].igstAmount += item.igstAmount;
        return acc;
    }, {});
    return {
        ...invoice,
        items: calculatedItems,
        totalAmount, totalCgst, totalSgst, totalIgst, grandTotal, totalTaxAmount, taxSummary,
        grandTotalInWords: `INR ${numberToWordsInr(grandTotal)}`,
        totalTaxInWords: `INR ${numberToWordsInr(totalTaxAmount)}`
    };
};


// --- Componente principal con el nuevo diseño ---
const InvoicePage = () => {
    const dispatch = useDispatch();
    
    const invoices = useSelector(selectAllInvoices);
    const invoiceStatus = useSelector(getInvoicesStatus);
    const error = useSelector(getInvoicesError);

    const [editingInvoice, setEditingInvoice] = useState(null);
    const [viewingInvoice, setViewingInvoice] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        if (invoiceStatus === 'idle') {
            dispatch(fetchInvoicesAsync());
        }
    }, [invoiceStatus, dispatch]);

    const handleAddNew = () => {
        setEditingInvoice(null);
        setIsFormVisible(true);
    };

    const handleEdit = (invoice) => {
        setEditingInvoice(invoice);
        setIsFormVisible(true);
    };

    const handleDelete = (invoiceId) => {
        if (window.confirm("Are you sure you want to delete this invoice? This action cannot be undone.")) {
            dispatch(deleteInvoiceAsync(invoiceId));
        }
    };

    const handleSave = (formData) => {
        if (editingInvoice) {
            dispatch(updateInvoiceAsync({ id: editingInvoice.id, invoiceData: formData }));
        } else {
            dispatch(addInvoiceAsync(formData));
        }
        setIsFormVisible(false);
        setEditingInvoice(null);
    };

    const handleCancelForm = () => {
        setIsFormVisible(false);
        setEditingInvoice(null);
    };

    // --- Componentes de UI para mejorar la legibilidad ---

    const LoadingSpinner = () => (
        <div className="flex flex-col items-center justify-center p-16 text-gray-500">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-lg">Loading Invoices...</p>
        </div>
    );
    
    const EmptyState = () => (
        <div className="text-center py-20 px-6">
            <DocumentTextIcon className="mx-auto h-16 w-16 text-gray-300" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">No Invoices Yet</h3>
            <p className="mt-2 text-gray-500">Get started by creating your first invoice.</p>
            <button onClick={handleAddNew} className="mt-6 flex items-center gap-2 mx-auto bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors">
                <PlusIcon className="w-5 h-5" />
                Create New Invoice
            </button>
        </div>
    );

    const ErrorDisplay = ({ message }) => (
         <div className="text-center py-16 px-6 bg-red-50 border-l-4 border-red-400">
            <h3 className="text-xl font-semibold text-red-800">An Error Occurred</h3>
            <p className="text-red-600 mt-2">Could not fetch invoices. Please try again later.</p>
            <p className="text-sm text-red-500 mt-4"><code>Error: {message}</code></p>
        </div>
    );

    const InvoiceTable = ({ invoices }) => (
         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billed To</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {invoices.map(invoice => {
                        const details = calculateInvoiceDetails(invoice);
                        return (
                            <tr key={invoice.id} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{details.invoiceNo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{details.buyerName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(details.invoiceDate).toLocaleDateString('en-GB')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">₹{details.grandTotal.toFixed(2)}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center items-center space-x-2">
                                        <ActionButton icon={EyeIcon} color="blue" tooltip="Preview" onClick={() => setViewingInvoice(invoice)} />
                                        <ActionButton icon={PencilIcon} color="yellow" tooltip="Edit" onClick={() => handleEdit(invoice)} />
                                        <ActionButton icon={TrashIcon} color="red" tooltip="Delete" onClick={() => handleDelete(invoice.id)} />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    const ActionButton = ({ icon: Icon, color, tooltip, onClick }) => {
        const colorClasses = {
            blue: 'text-blue-600 hover:text-blue-800',
            yellow: 'text-yellow-500 hover:text-yellow-700',
            red: 'text-red-600 hover:text-red-800',
        };

        return (
            <div className="relative group flex items-center">
                <button onClick={onClick} className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${colorClasses[color]}`}>
                    <Icon className="w-5 h-5" />
                </button>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {tooltip}
                </span>
            </div>
        );
    };


    let content;
    if (invoiceStatus === 'loading') {
        content = <LoadingSpinner />;
    } else if (invoiceStatus === 'succeeded') {
        content = invoices.length > 0 ? <InvoiceTable invoices={invoices} /> : <EmptyState />;
    } else if (invoiceStatus === 'failed') {
        content = <ErrorDisplay message={error} />;
    }

    if (isFormVisible) {
        return <InvoiceForm initialData={editingInvoice} onSave={handleSave} onCancel={handleCancelForm} />;
    }

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Invoice Management</h1>
                            <p className="mt-1 text-gray-500">Create, track, and manage all your invoices in one place.</p>
                        </div>
                        <button onClick={handleAddNew} className="flex items-center gap-2 bg-indigo-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150">
                            <PlusIcon className="w-5 h-5" />
                            New Invoice
                        </button>
                    </div>
                </header>

                <main className="bg-white rounded-xl shadow-md overflow-hidden">
                    {content}
                </main>
            </div>
            
            {viewingInvoice && (
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-start p-4 z-50 overflow-y-auto">
                     <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl my-8 transform transition-all opacity-100 scale-100">
                        <header className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
                            <h2 className="text-xl font-bold text-gray-800">Invoice Preview</h2>
                            <button onClick={() => setViewingInvoice(null)} className="text-gray-400 hover:text-gray-800 transition-colors">
                                <span className="text-2xl font-bold">&times;</span>
                            </button>
                        </header>
                        <div className="max-h-[80vh] overflow-y-auto">
                           <InvoicePreview invoiceData={calculateInvoiceDetails(viewingInvoice)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoicePage;