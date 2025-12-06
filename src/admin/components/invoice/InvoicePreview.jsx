import React, { useState, useMemo } from 'react';
import { ArrowDownTrayIcon, PrinterIcon } from '@heroicons/react/24/solid';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../../../public/logo.png';
import sign from "../../../../public/vaidehi sign.jpg";

const InvoicePreview = ({ invoiceData }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const ITEMS_PER_FIRST_PAGE = 5;
    const ITEMS_PER_PAGE = 8;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (error) {
            return '';
        }
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

    const paginatedItems = useMemo(() => {
        if (!invoiceData?.items) return [];

        const items = invoiceData.items;
        const pages = [];

        if (items.length <= ITEMS_PER_FIRST_PAGE) {
            pages.push({ items, isFirstPage: true, isLastPage: true });
        } else {
            pages.push({
                items: items.slice(0, ITEMS_PER_FIRST_PAGE),
                isFirstPage: true,
                isLastPage: false
            });

            let remainingItems = items.slice(ITEMS_PER_FIRST_PAGE);
            while (remainingItems.length > 0) {
                const pageItems = remainingItems.slice(0, ITEMS_PER_PAGE);
                remainingItems = remainingItems.slice(ITEMS_PER_PAGE);
                pages.push({
                    items: pageItems,
                    isFirstPage: false,
                    isLastPage: remainingItems.length === 0
                });
            }
        }

        return pages;
    }, [invoiceData?.items]);

    const generateInvoicePDF = async () => {
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const pages = document.querySelectorAll(`[data-invoice-page="${invoiceData.id}"]`);

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];

            const canvas = await html2canvas(page, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.95);

            if (i > 0) {
                pdf.addPage();
            }

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        }

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

    const handlePrint = async () => {
        setIsProcessing(true);
        try {
            const pdf = await generateInvoicePDF();
            const pdfBlob = pdf.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            window.open(url, '_blank');
        } catch (error) {
            console.error("Failed to generate PDF for printing:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!invoiceData) return null;

    const totalTax = (invoiceData.totalSgst || 0) + (invoiceData.totalCgst || 0) + (invoiceData.totalIgst || 0);

    const InvoiceHeader = () => (
        <>
            <div className="flex items-center border-b border-black">
                <div className="p-2">
                    <img src={logo} alt="Vaidehi Logo" className="h-16 w-auto" />
                </div>
                <div className="flex-1">
                    <h1 className="text-center text-xl font-bold p-2">Tax Invoice</h1>
                </div>
            </div>
            <div className="flex border-b border-black">
                <div className="w-1/2 p-2 border-r border-black text-xs">
                    <p className="font-bold">{invoiceData.sellerName}</p>
                    <p className="whitespace-pre-wrap">{invoiceData.sellerAddress}</p>
                    {invoiceData.sellerPan && <p><span className="font-bold">PAN:</span> {invoiceData.sellerPan}</p>}
                    <p><span className="font-bold">GSTIN/UIN:</span> {invoiceData.sellerGstin}</p>
                    <p><span className="font-bold">State Name:</span> {invoiceData.sellerState}, <span className="font-bold">Code:</span> {invoiceData.sellerStateCode}</p>
                    <p><span className="font-bold">Email:</span> {invoiceData.sellerEmail}</p>
                </div>
                <div className="w-1/2 text-xs">
                    <div className="flex border-b border-black">
                        <div className="w-1/2 p-2 border-r border-black">
                            <span className="font-bold">Invoice No.</span><br />{invoiceData.invoiceNo}
                        </div>
                        <div className="w-1/2 p-2">
                            <span className="font-bold">Dated</span><br />{formatDate(invoiceData.invoiceDate)}
                        </div>
                    </div>
                    <div className="flex border-b border-black">
                        <div className="w-1/2 p-2 border-r border-black">
                            <span className="font-bold">Bank Payment Details</span>
                        </div>
                        <div className="w-1/2 p-2">
                            <span>{invoiceData.bankName}</span><br />
                            <span>A/c No. {invoiceData.bankAcNo}</span>
                            <p><span className="font-bold">IFSC:</span> {invoiceData.bankIfsc}</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 p-2 border-r border-black">
                            <span className="font-bold">Period</span>
                        </div>
                        <div className="w-1/2 p-2">
                            {invoiceData.periodFrom && invoiceData.periodTo &&
                                <p className="font-bold">{formatDate(invoiceData.periodFrom)} to {formatDate(invoiceData.periodTo)}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex border-b border-black">
                <div className="w-1/2 p-2 border-r border-black text-xs">
                    <p className="font-bold">Buyer</p>
                    <p>{invoiceData.buyerName}</p>
                    <p className="whitespace-pre-wrap">{invoiceData.buyerAddress}</p>
                    <p><span className="font-bold">GSTIN/UIN:</span> {invoiceData.buyerGstin}</p>
                    <p><span className="font-bold">State Name:</span> {invoiceData.buyerState}, <span className="font-bold">Code:</span> {invoiceData.buyerStateCode}</p>
                </div>
                <div className="w-1/2 text-xs">
                    <div className="p-2 h-full">
                        <span className="font-bold">Terms of Delivery</span><br />{invoiceData.termsOfDelivery}
                    </div>
                </div>
            </div>
        </>
    );

    const ContinuationHeader = ({ pageNum, totalPages }) => (
        <div className="flex items-center justify-between border-b border-black p-2 bg-gray-50">
            <div className="flex items-center gap-2">
                <img src={logo} alt="Vaidehi Logo" className="h-10 w-auto" />
                <span className="font-bold text-sm">Tax Invoice (Continued)</span>
            </div>
            <div className="text-xs">
                <p><span className="font-bold">Invoice No:</span> {invoiceData.invoiceNo}</p>
                <p><span className="font-bold">Page:</span> {pageNum} of {totalPages}</p>
            </div>
        </div>
    );

    const TableHeader = () => (
        <thead className="font-bold bg-gray-50 text-[9px]">
            <tr>
                <td className="w-8 p-1 border-r border-black">Sl<br />No.</td>
                <td className="p-1 border-r border-black">ITEM DESCRIPTION</td>
                <td className="w-16 p-1 border-r border-black">HSN/SAC</td>
                <td className="w-16 p-1 border-r border-black">Amount</td>
                <td colSpan="3" className="p-1 border-r border-black">GST Rates</td>
                <td colSpan="3" className="p-1 border-r border-black">GST Amount</td>
                <td className="w-16 p-1">Total</td>
            </tr>
            <tr>
                <td className="border-t border-r border-black p-1"></td>
                <td className="border-t border-r border-black p-1"></td>
                <td className="border-t border-r border-black p-1"></td>
                <td className="border-t border-r border-black p-1"></td>
                <td className="w-10 border-t border-r border-black p-1">SGST</td>
                <td className="w-10 border-t border-r border-black p-1">CGST</td>
                <td className="w-10 border-t border-r border-black p-1">IGST</td>
                <td className="w-14 border-t border-r border-black p-1">SGST</td>
                <td className="w-14 border-t border-r border-black p-1">CGST</td>
                <td className="w-14 border-t border-r border-black p-1">IGST</td>
                <td className="border-t border-black p-1"></td>
            </tr>
        </thead>
    );

    const ItemRow = ({ item, index, startIndex }) => (
        <tr className="border-t border-black align-top">
            <td className="p-1 border-r border-black text-center">{startIndex + index + 1}</td>
            <td className="p-1 border-r border-black text-left whitespace-pre-wrap text-[9px]">{item.description}</td>
            <td className="p-1 border-r border-black text-center">{item.hsn}</td>
            <td className="p-1 border-r border-black text-right">{item.amount.toFixed(2)}</td>
            <td className="p-1 border-r border-black text-center">{item.sgstRate}%</td>
            <td className="p-1 border-r border-black text-center">{item.cgstRate}%</td>
            <td className="p-1 border-r border-black text-center">{item.igstRate}%</td>
            <td className="p-1 border-r border-black text-right">{item.sgstAmount.toFixed(2)}</td>
            <td className="p-1 border-r border-black text-right">{item.cgstAmount.toFixed(2)}</td>
            <td className="p-1 border-r border-black text-right">{item.igstAmount.toFixed(2)}</td>
            <td className="p-1 text-right">{item.total.toFixed(2)}</td>
        </tr>
    );

    const EmptyRows = ({ count }) => (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <tr key={`empty-${i}`} className="border-t border-black" style={{ height: '28px' }}>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1"></td>
                </tr>
            ))}
        </>
    );

    const TotalsRow = () => (
        <tr className="border-t-2 border-black font-bold bg-gray-50">
            <td colSpan="3" className="p-1 text-right border-r border-black">Total</td>
            <td className="p-1 text-right border-r border-black">{invoiceData.totalAmount.toFixed(2)}</td>
            <td colSpan="3" className="border-r border-black"></td>
            <td className="p-1 text-right border-r border-black">{invoiceData.totalSgst.toFixed(2)}</td>
            <td className="p-1 text-right border-r border-black">{invoiceData.totalCgst.toFixed(2)}</td>
            <td className="p-1 text-right border-r border-black">{invoiceData.totalIgst.toFixed(2)}</td>
            <td className="p-1 text-right">{invoiceData.grandTotal.toFixed(2)}</td>
        </tr>
    );

    const InvoiceFooter = () => (
        <>
            <div className="flex justify-between border-t border-black p-2 text-xs">
                <div>
                    <span className="font-bold">Amount Chargeable (in words):</span><br />
                    {convertAmountToWords(invoiceData.grandTotal)}
                </div>
                <div className="font-bold">E. & O.E</div>
            </div>

            <table className="w-full border-t border-black text-center text-[9px]">
                <thead className="font-bold">
                    <tr>
                        <td rowSpan="2" className="p-1 border-r border-black">HSN/SAC</td>
                        <td rowSpan="2" className="p-1 border-r border-black">Taxable Value</td>
                        <td colSpan="2" className="p-1 border-r border-black">CGST</td>
                        <td colSpan="2" className="p-1 border-r border-black">SGST</td>
                        <td colSpan="2" className="p-1 border-r border-black">IGST</td>
                        <td rowSpan="2" className="p-1">Total Tax</td>
                    </tr>
                    <tr>
                        <td className="p-1 border-t border-r border-black">Rate</td>
                        <td className="p-1 border-t border-r border-black">Amount</td>
                        <td className="p-1 border-t border-r border-black">Rate</td>
                        <td className="p-1 border-t border-r border-black">Amount</td>
                        <td className="p-1 border-t border-r border-black">Rate</td>
                        <td className="p-1 border-t border-r border-black">Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(invoiceData.taxSummary).map(([hsn, data]) => (
                        <tr key={hsn} className="border-t border-black">
                            <td className="p-1 border-r border-black">{hsn}</td>
                            <td className="p-1 border-r border-black">{data.taxableValue.toFixed(2)}</td>
                            <td className="p-1 border-r border-black">{data.cgstRate}%</td>
                            <td className="p-1 border-r border-black">{data.cgstAmount.toFixed(2)}</td>
                            <td className="p-1 border-r border-black">{data.sgstRate}%</td>
                            <td className="p-1 border-r border-black">{data.sgstAmount.toFixed(2)}</td>
                            <td className="p-1 border-r border-black">{data.igstRate}%</td>
                            <td className="p-1 border-r border-black">{data.igstAmount.toFixed(2)}</td>
                            <td className="p-1">{(data.cgstAmount + data.sgstAmount + data.igstAmount).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="border-t border-black p-2 text-xs">
                <span className="font-bold">Tax Amount (in words): </span>
                {convertAmountToWords(totalTax)}
            </div>

            <div className="flex border-t border-black">
                <div className="w-1/2 p-2 border-r border-black">
                    <p className="font-bold text-xs">Declaration</p>
                    <p className="text-[9px]">{invoiceData.declaration}</p>
                </div>
                <div className="w-1/2 p-2 text-center flex flex-col justify-between items-center">
                    <p className="font-bold text-xs">for {invoiceData.sellerName}</p>
                    <img src={sign} alt="Signature" className="h-12 w-auto my-2" />
                    <p className="text-xs">Authorised Signatory</p>
                </div>
            </div>
        </>
    );

    const calculateEmptyRows = (itemCount, isFirstPage, isLastPage) => {
        const maxItems = isFirstPage ? ITEMS_PER_FIRST_PAGE : ITEMS_PER_PAGE;
        if (isLastPage) {
            return Math.max(0, maxItems - itemCount);
        }
        return 0;
    };

    const InvoicePage = ({ pageData, pageIndex, totalPages }) => {
        const { items: pageItems, isFirstPage, isLastPage } = pageData;
        const startIndex = isFirstPage ? 0 : ITEMS_PER_FIRST_PAGE + (pageIndex - 1) * ITEMS_PER_PAGE;
        const emptyRowCount = calculateEmptyRows(pageItems.length, isFirstPage, isLastPage);

        return (
            <div
                data-invoice-page={invoiceData.id}
                className="bg-white border border-black flex flex-col"
                style={{
                    width: '210mm',
                    height: '297mm',
                    padding: '5mm',
                    boxSizing: 'border-box',
                    pageBreakAfter: 'always',
                    pageBreakInside: 'avoid'
                }}
            >
                <div className="border border-black flex flex-col h-full">
                    {isFirstPage ? <InvoiceHeader /> : <ContinuationHeader pageNum={pageIndex + 1} totalPages={totalPages} />}

                    <div className="flex-1 flex flex-col">
                        <table className="w-full text-center text-[9px] border-collapse">
                            <TableHeader />
                            <tbody>
                                {pageItems.map((item, index) => (
                                    <ItemRow
                                        key={index}
                                        item={item}
                                        index={index}
                                        startIndex={startIndex}
                                    />
                                ))}
                                <EmptyRows count={emptyRowCount} />
                                {isLastPage && <TotalsRow />}
                            </tbody>
                        </table>

                        {!isLastPage && <div className="flex-1"></div>}

                        {!isLastPage && (
                            <div className="border-t border-black p-2 text-center text-xs bg-gray-50">
                                <span className="font-bold">Continued on next page...</span>
                                <span className="ml-4">Page {pageIndex + 1} of {totalPages}</span>
                            </div>
                        )}
                    </div>

                    {isLastPage && <InvoiceFooter />}
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="p-4 flex justify-end gap-4 bg-gray-100 sticky top-0 z-10">
                <button
                    onClick={handleDownloadPDF}
                    disabled={isProcessing}
                    className="flex items-center gap-2 bg-green-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    {isProcessing ? 'Processing...' : 'Download PDF'}
                </button>
                <button
                    onClick={handlePrint}
                    disabled={isProcessing}
                    className="flex items-center gap-2 bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    <PrinterIcon className="w-5 h-5" />
                    {isProcessing ? 'Processing...' : 'Print'}
                </button>
            </div>

            <div
                id={`invoice-print-area-${invoiceData.id}`}
                className="flex flex-col items-center gap-4 p-4 bg-gray-200"
            >
                {paginatedItems.map((pageData, pageIndex) => (
                    <InvoicePage
                        key={pageIndex}
                        pageData={pageData}
                        pageIndex={pageIndex}
                        totalPages={paginatedItems.length}
                    />
                ))}
            </div>

            <style>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    [data-invoice-page] {
                        page-break-after: always;
                        page-break-inside: avoid;
                    }
                    [data-invoice-page]:last-child {
                        page-break-after: auto;
                    }
                }
            `}</style>
        </div>
    );
};

export default InvoicePreview;
