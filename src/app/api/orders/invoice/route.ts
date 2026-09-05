import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

function numberToIndianWords(num: number): string {
    const a = [
        '', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ',
        'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '
    ];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const roundNum = Math.floor(num);
    if (roundNum === 0) return 'Zero';

    function inWords(n: number): string {
        let str = '';
        if (n > 9999999) {
            str += inWords(Math.floor(n / 10000000)) + 'Crore ';
            n %= 10000000;
        }
        if (n > 99999) {
            str += inWords(Math.floor(n / 100000)) + 'Lakh ';
            n %= 100000;
        }
        if (n > 999) {
            str += inWords(Math.floor(n / 1000)) + 'Thousand ';
            n %= 1000;
        }
        if (n > 99) {
            str += inWords(Math.floor(n / 100)) + 'Hundred ';
            n %= 100;
        }
        if (n > 0) {
            if (n < 20) {
                str += a[n];
            } else {
                str += b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : ' ');
            }
        }
        return str;
    }

    const rupeesWords = inWords(roundNum).trim();
    const paise = Math.round((num - roundNum) * 100);
    if (paise > 0) {
        return `${rupeesWords} Rupees and ${inWords(paise).trim()} Paise Only`;
    }
    return `${rupeesWords} Rupees Only`;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get('order_id');
        const taxMode = searchParams.get('tax_mode') || 'intra'; // 'intra' (CGST+SGST) or 'inter' (IGST)

        if (!orderId) {
            return new NextResponse(
                `<!DOCTYPE html><html><head><title>Invalid Request</title><style>body{font-family:sans-serif;padding:40px;background:#0d0e12;color:#f3f4f6;text-align:center;}a{color:#8b5cf6;}</style></head><body><h2>Order ID Required</h2><p>Please supply a valid <code>order_id</code> parameter to generate a tax invoice.</p></body></html>`,
                { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
            );
        }

        const adminClient = createAdminClient();

        // 1. Fetch order details
        const { data: order, error: orderError } = await adminClient
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

        if (orderError || !order) {
            return new NextResponse(
                `<!DOCTYPE html><html><head><title>Invoice Not Found</title><style>body{font-family:sans-serif;padding:40px;background:#0d0e12;color:#f3f4f6;text-align:center;}a{color:#8b5cf6;}</style></head><body><h2>Invoice Record Not Found</h2><p>Could not locate an order with ID: <code>${orderId}</code></p></body></html>`,
                { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
            );
        }

        // 2. Fetch order items
        const { data: items } = await adminClient
            .from('order_items')
            .select('*')
            .eq('order_id', orderId);

        // 3. Financial calculations
        // SAC Code: 998313 (Information Technology and Cloud Consultancy Services)
        // Taxable Amount = Total / 1.18
        // CGST (9%) = Taxable Amount * 0.09
        // SGST (9%) = Taxable Amount * 0.09
        // IGST (18%) for interstate clients
        // Total = Taxable + CGST + SGST
        const total = Number(order.total) || 0;
        const taxableAmount = Math.round((total / 1.18) * 100) / 100;
        const totalGst = Math.round((total - taxableAmount) * 100) / 100;
        const cgst = Math.round((totalGst / 2) * 100) / 100;
        const sgst = Math.round((totalGst - cgst) * 100) / 100; // prevents 1 paisa rounding disparity
        const igst = totalGst;

        const isInterstate = taxMode === 'inter';

        const createdYear = order.created_at
            ? String(order.created_at).slice(0, 4)
            : new Date().getFullYear().toString();
        const idPrefix = order.id ? String(order.id).slice(0, 6).toUpperCase() : '000000';
        const invoiceNumber = `NM-INV-${createdYear}-${idPrefix}`;

        const formattedDate = new Date(order.created_at || Date.now()).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

        const invoiceItems = items && items.length > 0 ? items : [
            {
                id: 'item-1',
                product_name: 'NovaMint AI Automation & Viral Content Retainer Package',
                price: total,
                quantity: 1,
            }
        ];

        const wordsTotal = numberToIndianWords(total);

        // Render high-fidelity, printable Indian GST Tax Invoice
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tax Invoice ${invoiceNumber} - NovaMint Networks</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #7c3aed;
            --primary-dark: #5b21b6;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border-color: #e2e8f0;
            --bg-light: #f8fafc;
            --success: #059669;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #0d0f17;
            color: var(--text-main);
            padding: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        }

        /* Interactive Action Toolbar (Hidden during Print) */
        .action-toolbar {
            width: 100%;
            max-width: 860px;
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            background: rgba(22, 27, 34, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 12px 20px;
            border-radius: 14px;
            backdrop-filter: blur(12px);
            color: #f1f5f9;
        }

        .toolbar-title {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 13px;
            font-weight: 600;
        }

        .badge-live {
            background: rgba(16, 185, 129, 0.2);
            color: #10b981;
            border: 1px solid rgba(16, 185, 129, 0.4);
            font-size: 11px;
            padding: 2px 8px;
            border-radius: 20px;
            font-family: 'JetBrains Mono', monospace;
            text-transform: uppercase;
        }

        .toolbar-buttons {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            font-weight: 600;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            border: none;
        }

        .btn-primary {
            background: #ffffff;
            color: #09090b;
        }

        .btn-primary:hover {
            background: #e4e4e7;
            transform: translateY(-1px);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.08);
            color: #f8fafc;
            border: 1px solid rgba(255, 255, 255, 0.16);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.14);
        }

        .tax-toggle {
            font-size: 11px;
            color: #cbd5e1;
            display: flex;
            align-items: center;
            gap: 6px;
            background: rgba(0, 0, 0, 0.3);
            padding: 4px 8px;
            border-radius: 6px;
        }

        .tax-toggle a {
            color: #a78bfa;
            text-decoration: none;
            font-weight: 600;
        }

        .tax-toggle a:hover {
            text-decoration: underline;
        }

        /* Invoice Container */
        .invoice-sheet {
            width: 100%;
            max-width: 860px;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            padding: 48px;
            position: relative;
        }

        /* Header */
        .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 24px;
            margin-bottom: 28px;
        }

        .brand-logo {
            font-size: 26px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: #0f172a;
        }

        .brand-logo span {
            color: #7c3aed;
        }

        .brand-sub {
            font-size: 11px;
            color: var(--text-muted);
            margin-top: 3px;
            font-weight: 500;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .company-details {
            margin-top: 10px;
            font-size: 11px;
            line-height: 1.5;
            color: #475569;
        }

        .company-details strong {
            color: #0f172a;
        }

        .invoice-title-block {
            text-align: right;
        }

        .invoice-heading {
            font-size: 24px;
            font-weight: 800;
            letter-spacing: 1px;
            color: #0f172a;
            text-transform: uppercase;
        }

        .invoice-meta-table {
            margin-top: 8px;
            font-size: 11.5px;
            line-height: 1.6;
            color: #334155;
            font-family: 'JetBrains Mono', monospace;
        }

        .invoice-meta-table strong {
            color: #0f172a;
        }

        /* Billing Grid */
        .billing-grid {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            gap: 24px;
            background: var(--bg-light);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 16px 20px;
            margin-bottom: 28px;
        }

        .bill-block h4 {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-muted);
            margin-bottom: 6px;
            font-weight: 700;
        }

        .bill-block .recipient-name {
            font-size: 14px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 2px;
        }

        .bill-block p {
            font-size: 11.5px;
            line-height: 1.5;
            color: #475569;
        }

        /* Line Items Table */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
        }

        .items-table th {
            background: #0f172a;
            color: #ffffff;
            font-size: 10.5px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            padding: 10px 12px;
            text-align: left;
            font-weight: 600;
        }

        .items-table th.text-right {
            text-align: right;
        }

        .items-table th.text-center {
            text-align: center;
        }

        .items-table td {
            padding: 12px;
            font-size: 12px;
            border-bottom: 1px solid var(--border-color);
            color: #1e293b;
            vertical-align: middle;
        }

        .items-table td.text-right {
            text-align: right;
            font-family: 'JetBrains Mono', monospace;
        }

        .items-table td.text-center {
            text-align: center;
            font-family: 'JetBrains Mono', monospace;
        }

        .items-table tr:last-child td {
            border-bottom: 2px solid #0f172a;
        }

        .item-name {
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 2px;
        }

        .item-desc {
            font-size: 10.5px;
            color: var(--text-muted);
        }

        /* Summary & Tax Breakdown */
        .summary-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 24px;
            margin-bottom: 30px;
        }

        .words-box {
            flex: 1;
            padding: 16px;
            border-radius: 8px;
            background: var(--bg-light);
            border: 1px solid var(--border-color);
            font-size: 11px;
            line-height: 1.6;
        }

        .words-box h5 {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: var(--text-muted);
            margin-bottom: 4px;
        }

        .words-value {
            font-weight: 600;
            color: #0f172a;
        }

        .totals-table-wrap {
            width: 340px;
        }

        .totals-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
        }

        .totals-table td {
            padding: 6px 0;
            color: #334155;
        }

        .totals-table td.amount {
            text-align: right;
            font-family: 'JetBrains Mono', monospace;
            font-weight: 500;
            color: #0f172a;
        }

        .totals-table tr.grand-total td {
            border-top: 2px solid #0f172a;
            padding-top: 10px;
            font-size: 15px;
            font-weight: 800;
            color: #0f172a;
        }

        .totals-table tr.grand-total td.amount {
            color: #7c3aed;
        }

        /* Digital Stamp & Verification */
        .stamp-verification {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px dashed #cbd5e1;
            border-radius: 8px;
            padding: 16px 20px;
            margin-bottom: 24px;
            background: #fafafa;
        }

        .stamp-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px;
            background: #ecfdf5;
            border: 1.5px solid #10b981;
            color: #065f46;
            font-weight: 700;
            font-size: 11px;
            border-radius: 6px;
            letter-spacing: 0.5px;
            font-family: 'JetBrains Mono', monospace;
        }

        .signature-box {
            text-align: right;
        }

        .signature-title {
            font-size: 11px;
            font-weight: 700;
            color: #0f172a;
            text-transform: uppercase;
        }

        .signature-subtitle {
            font-size: 9.5px;
            color: var(--text-muted);
        }

        /* Footer */
        .invoice-footer {
            border-top: 1px solid var(--border-color);
            padding-top: 16px;
            font-size: 10px;
            color: var(--text-muted);
            line-height: 1.6;
            text-align: center;
        }

        /* Print Media Styles */
        @media print {
            body {
                background: #ffffff !important;
                padding: 0 !important;
            }

            .action-toolbar {
                display: none !important;
            }

            .invoice-sheet {
                box-shadow: none !important;
                padding: 24px !important;
                max-width: 100% !important;
                border-radius: 0 !important;
            }

            @page {
                size: A4;
                margin: 12mm 15mm;
            }
        }
    </style>
</head>
<body>

    <!-- On-screen Action Toolbar -->
    <div class="action-toolbar">
        <div class="toolbar-title">
            <span>GST Tax Invoice · ${invoiceNumber}</span>
            <span class="badge-live">${order.status === 'paid' ? 'PAID & VERIFIED' : order.status.toUpperCase()}</span>
        </div>
        <div class="toolbar-buttons">
            <div class="tax-toggle">
                <span>Tax Breakdown:</span>
                ${isInterstate
                    ? `<a href="?order_id=${orderId}&tax_mode=intra">Switch to CGST+SGST (Intra-State)</a>`
                    : `<a href="?order_id=${orderId}&tax_mode=inter">Switch to IGST (Inter-State)</a>`
                }
            </div>
            <button onclick="window.print()" class="btn btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                Print / Save as PDF
            </button>
            <button onclick="window.close()" class="btn btn-secondary">
                Close
            </button>
        </div>
    </div>

    <!-- Official Tax Invoice Document Sheet -->
    <div class="invoice-sheet">
        
        <!-- Header -->
        <div class="invoice-header">
            <div>
                <div class="brand-logo">NovaMint <span>Networks</span></div>
                <div class="brand-sub">NovaMint Networks Private Limited / NovaMint Studios</div>
                <div class="company-details">
                    <strong>Corporate Identification:</strong> U72900DL2025PTC418920<br>
                    <strong>GSTIN:</strong> 07AABCN1234M1Z5<br>
                    <strong>Tax Regime:</strong> Indian Goods and Services Tax (GST)<br>
                    <strong>Principal Place of Business:</strong> Level 5, Cyber Tech Park, DLF Cyber City, Sector 24, Gurugram / New Delhi, 122002<br>
                    <strong>Contact / Support:</strong> billing@novamint.in · www.novamint.in
                </div>
            </div>
            <div class="invoice-title-block">
                <div class="invoice-heading">TAX INVOICE</div>
                <div class="invoice-meta-table">
                    <div><strong>Invoice No:</strong> ${invoiceNumber}</div>
                    <div><strong>Invoice Date:</strong> ${formattedDate}</div>
                    <div><strong>Order Ref:</strong> ${order.id.slice(0, 8).toUpperCase()}</div>
                    <div><strong>Gateway Ref:</strong> ${order.cashfree_order_id || 'CF_DIRECT_UPI'}</div>
                    <div><strong>Payment Mode:</strong> ${order.payment_method ? order.payment_method.toUpperCase() : 'CASHFREE PG'}</div>
                </div>
            </div>
        </div>

        <!-- Billing Grid -->
        <div class="billing-grid">
            <div class="bill-block">
                <h4>Billed To (Client / Consignee):</h4>
                <div class="recipient-name">${order.billing_name || 'NovaMint Client'}</div>
                <p>
                    <strong>Email:</strong> ${order.billing_email || 'client@novamint.in'}<br>
                    <strong>Phone:</strong> ${order.billing_phone || '+91 Not Disclosed'}<br>
                    <strong>Place of Supply:</strong> ${isInterstate ? 'Interstate (Out of State / Export)' : 'Delhi / NCR (07) — Intra-State'}<br>
                    <strong>Status:</strong> Digital Goods & Workflow Fulfillment
                </p>
            </div>
            <div class="bill-block">
                <h4>Service Nature & Classification:</h4>
                <p>
                    <strong>SAC Code:</strong> 998313<br>
                    <strong>Service Category:</strong> Information Technology & Cloud Consultancy Services<br>
                    <strong>Fulfillment Channel:</strong> Automated Production Engine / Digital Cloud Vault<br>
                    <strong>Payment Status:</strong> <span style="color: #059669; font-weight: 700;">${order.status === 'paid' ? 'Fully Settled (Cashfree PG)' : order.status.toUpperCase()}</span>
                </p>
            </div>
        </div>

        <!-- Line Items Table -->
        <table class="items-table">
            <thead>
                <tr>
                    <th style="width: 32px;" class="text-center">#</th>
                    <th>Description of Services / Deliverables</th>
                    <th class="text-center" style="width: 80px;">SAC</th>
                    <th class="text-center" style="width: 50px;">Qty</th>
                    <th class="text-right" style="width: 110px;">Taxable Rate</th>
                    <th class="text-center" style="width: 70px;">GST %</th>
                    <th class="text-right" style="width: 110px;">Total Amount</th>
                </tr>
            </thead>
            <tbody>
                ${invoiceItems.map((item: any, idx: number) => {
                    const itemTotal = Number(item.price) * (Number(item.quantity) || 1);
                    const itemTaxable = Math.round((itemTotal / 1.18) * 100) / 100;
                    return `
                    <tr>
                        <td class="text-center">${idx + 1}</td>
                        <td>
                            <div class="item-name">${item.product_name || 'AI Automation / Retainer Package'}</div>
                            <div class="item-desc">High-Performance Autonomous Content & Growth Engine Fulfillment</div>
                        </td>
                        <td class="text-center">998313</td>
                        <td class="text-center">${item.quantity || 1}</td>
                        <td class="text-right">₹${itemTaxable.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                        <td class="text-center">18%</td>
                        <td class="text-right">₹${itemTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                    `;
                }).join('')}
            </tbody>
        </table>

        <!-- Summary & Tax Calculation Section -->
        <div class="summary-section">
            <div class="words-box">
                <h5>Amount in Words:</h5>
                <div class="words-value">${wordsTotal}</div>
                <div style="margin-top: 8px; color: #64748b; font-size: 10px;">
                    * All digital assets, software workflows, and viral content retainers are delivered under the NovaMint Commercial Single/Enterprise End-User License Agreement.
                </div>
            </div>

            <div class="totals-table-wrap">
                <table class="totals-table">
                    <tr>
                        <td>Taxable Value (Total / 1.18):</td>
                        <td class="amount">₹${taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                    ${isInterstate ? `
                    <tr>
                        <td>Integrated GST (IGST @ 18%):</td>
                        <td class="amount">₹${igst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                    ` : `
                    <tr>
                        <td>Central GST (CGST @ 9%):</td>
                        <td class="amount">₹${cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                    <tr>
                        <td>State GST (SGST @ 9%):</td>
                        <td class="amount">₹${sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                    `}
                    <tr class="grand-total">
                        <td>Total Value (INR):</td>
                        <td class="amount">₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                </table>
            </div>
        </div>

        <!-- Digital Stamp & Signature Block -->
        <div class="stamp-verification">
            <div class="stamp-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                DIGITALLY VERIFIED TAX RECORD · CASHFREE RBI-REGULATED GATEWAY
            </div>
            <div class="signature-box">
                <div style="height: 36px; display: flex; align-items: center; justify-content: flex-end;">
                    <span style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: 22px; color: #5b21b6; font-weight: bold;">NovaMint Networks</span>
                </div>
                <div class="signature-title">Authorized Signatory</div>
                <div class="signature-subtitle">NovaMint Networks Private Limited</div>
            </div>
        </div>

        <!-- Footer -->
        <div class="invoice-footer">
            This is a computer-generated tax invoice issued in terms of Section 31 of the CGST Act, 2017. It has been digitally authenticated and requires no physical ink signature. For any clarification regarding SAC Code 998313 or input tax credits, please contact our accounts bureau at <a href="mailto:billing@novamint.in" style="color: #7c3aed; text-decoration: none;">billing@novamint.in</a>.
        </div>

    </div>

</body>
</html>`;

        return new NextResponse(html, {
            status: 200,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch (error) {
        console.error('Invoice generation error:', error);
        return new NextResponse(
            `<!DOCTYPE html><html><head><title>Internal Server Error</title><style>body{font-family:sans-serif;padding:40px;background:#0d0e12;color:#f3f4f6;text-align:center;}a{color:#8b5cf6;}</style></head><body><h2>Invoice Generation Failed</h2><p>An unexpected error occurred while generating your tax invoice. Please try again later.</p></body></html>`,
            { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
    }
}
