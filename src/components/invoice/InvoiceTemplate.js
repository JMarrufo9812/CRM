import JsPDF from 'jspdf';
import 'jspdf-autotable';
import { Roboto } from '@/assets/fonts/Roboto-Regular-normal';
import { RobotoBold } from '@/assets/fonts/Roboto-Bold-bold';

export const InvoiceTemplate = function InvoiceTemplate(invoice, columns) {
  // Data Company
  const company = {
    name: 'CERVUS',
  };

  // const companyLogo = {
  //   src1: '',
  //   src: '',
  //   w: 80,
  //   h: 50,
  // };

  // Config fonts
  const fontSizes = {
    HeadTitleFontSize: 18,
    Head2TitleFontSize: 16,
    TitleFontSize: 14,
    SubTitleFontSize: 12,
    NormalFontSize: 10,
    SmallFontSize: 8,
  };
  // Config spacing between lines down
  const lineSpacing = {
    NormalSpacing: 12,
  };

  // Create PDF
  const doc = new JsPDF('p', 'pt', 'letter');

  const rightStartCol1 = 390;
  const rightStartCol2 = 480;
  const startX = 40;
  const InitialstartY = 50;
  let startY = 0;
  let tempY = InitialstartY;

  // Helper to align the texts
  doc.textAlign = function textAlign(txt, options = {}, xPar, y) {
    let x = xPar;
    // Use the options align property to specify desired text alignment
    // Param x will be ignored if desired text alignment is 'center'.
    // Usage of options can easily extend the function to apply different text
    // styles and sizes

    // Get current font size
    const fontSize = this.internal.getFontSize();

    // Get page width
    const pageWidth = this.internal.pageSize.width;

    // Get the actual text's width
    // You multiply the unit width of your string by your font size and divide
    // by the internal scale factor. The division is necessary
    // for the case where you use units other than 'pt' in the constructor
    // of jsPDF.

    const txtWidth =
      (this.getStringUnitWidth(txt) * fontSize) / this.internal.scaleFactor;

    if (options.align === 'center') {
      // Calculate text's x coordinate
      x = (pageWidth - txtWidth) / 2;
    } else if (options.align === 'centerAtX') {
      // center on X value
      x -= txtWidth / 2;
    } else if (options.align === 'right') {
      x -= txtWidth;
    }

    // Draw text at x,y
    this.text(txt, x, y);
  };

  // Start configuration of our PDF
  doc.addFileToVFS('Roboto-Regular.ttf', Roboto);
  doc.addFileToVFS('Roboto-Bold.ttf', RobotoBold);
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
  doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
  doc.setFont('Roboto');

  /* Company name */
  // Logo Company
  // doc.addImage(
  //   companyLogo.src,
  //   'PNG',
  //   startX,
  //   (startY += 50),
  //   companyLogo.w,
  //   companyLogo.h,
  // );
  // Styles name Company
  doc.setFontSize(fontSizes.HeadTitleFontSize);
  doc.setFontType('bold');
  doc.setTextColor(143, 32, 21);
  doc.textAlign(company.name, { align: 'left' }, startX, (startY += 15 + 50));

  /* Data Invoice */
  // Styles name PDF
  doc.setFontSize(fontSizes.Head2TitleFontSize);
  doc.setFontType('bold');
  doc.textAlign(
    'Factura',
    { align: 'left' },
    rightStartCol2,
    (tempY += lineSpacing.NormalSpacing),
  );

  // Styles number invoice
  doc.setFontSize(fontSizes.NormalFontSize);
  doc.setFontType('bold');
  doc.textAlign(
    'Numero de factura',
    { align: 'left' },
    rightStartCol1,
    (tempY += lineSpacing.NormalSpacing + 10),
  );

  doc.setFontType('normal');
  doc.setTextColor(0, 0, 0);
  doc.textAlign(
    invoice.invoiceNumber,
    { align: 'left' },
    rightStartCol2,
    tempY,
  );

  // Styles date invoice
  doc.setFontType('bold');
  doc.setTextColor(143, 32, 21);
  doc.textAlign(
    'Fecha de pago: ',
    { align: 'left' },
    rightStartCol1,
    (tempY += lineSpacing.NormalSpacing),
  );

  doc.setFontType('normal');
  doc.setTextColor(0, 0, 0);
  doc.textAlign(invoice.dateDue, { align: 'left' }, rightStartCol2, tempY);

  /* Customer */
  // Init position Y
  let startCustomerY = startY;
  // Styles customer data
  doc.setFontType('bold');
  doc.setTextColor(143, 32, 21);
  doc.textAlign(
    'Facturado a',
    { align: 'left' },
    startX,
    (startCustomerY += 75),
  );

  doc.setFontType('normal');
  doc.setTextColor(0, 0, 0);
  doc.textAlign(
    invoice.customer.name,
    { align: 'left' },
    startX,
    (startCustomerY += lineSpacing.NormalSpacing),
  );

  doc.textAlign(
    invoice.customer.city,
    { align: 'left' },
    startX,
    (startCustomerY += lineSpacing.NormalSpacing),
  );

  doc.textAlign(
    invoice.customer.email,
    { align: 'left' },
    startX,
    (startCustomerY += lineSpacing.NormalSpacing),
  );

  doc.textAlign(
    invoice.customer.phone,
    { align: 'left' },
    startX,
    (startCustomerY += lineSpacing.NormalSpacing),
  );

  doc.setFontSize(fontSizes.HeadTitleFontSize);
  doc.setTextColor(143, 32, 21);
  doc.setFontType('bold');
  doc.textAlign(
    '$8000 MXN el 9 de Julio de 2020',
    { align: 'center' },
    startX,
    (startCustomerY += 50),
  );

  doc.setFontSize(fontSizes.NormalFontSize);
  doc.setTextColor(143, 32, 21);
  doc.setFontType('bold');
  doc.textAlign(
    '¡Gracias por tu compra!',
    { align: 'center' },
    startX,
    (startCustomerY += 25),
  );

  // Table of products

  // Init columns
  let rightcol1 = 340;
  let rightcol2 = 400;
  // Init position Y after info custumer
  startY = startCustomerY;

  // Options to connfig autoTable
  const options = {
    // Position to init the table in Y
    startY: (startY += 50),
    tableWidth: 'auto',
    margin: {
      top: 50,
    },
    headStyles: {
      fontSize: 10,
      halign: 'right',
    },
    head: [
      [
        {
          content: 'Descripción',
          styles: { halign: 'left' },
        },
        {
          content: 'Cantidad',
          styles: { halign: 'left' },
        },
        { content: 'Precio por usuario', styles: { halign: 'left' } },
        { content: 'Monto', styles: { halign: 'right' } },
      ],
    ],
    styles: {
      fillColor: [255, 255, 255],
      overflow: 'linebreak',
      fontSize: 9,
      minCellHeight: 'auto',
      cellWidth: 'auto',
      cellPadding: 10,
      textColor: [0, 0, 0],
    },
    columnStyles: {
      description: { cellWidth: 'auto', halign: 'left', valign: 'middle' },
      quantity: { cellWidth: 80, halign: 'left', valign: 'middle' },
      priceUnit: { cellWidth: 100, halign: 'left', valign: 'middle' },
      amount: {
        cellWidth: 100,
        halign: 'right',
        valign: 'middle',
      },
    },
    alternateRowStyles: {
      fillColor: [245, 248, 250],
    },
  };

  // Create a autoTable dynamic
  doc.autoTable(columns, invoice.products, options);

  /* Invoice Footer */
  // Init columns
  rightcol1 = 400;
  rightcol2 = 563;
  // Init position in Y after autoTable
  startY = doc.previousAutoTable.finalY + 10;

  // Styles to Data SubTotal  and Total
  doc.setFontSize(fontSizes.NormalFontSize);
  doc.setFontType('normal');
  doc.setTextColor(0, 0, 0);
  doc.textAlign(
    'Subtotal',
    { align: 'left' },
    rightcol1,
    (startY += lineSpacing.NormalSpacing),
  );
  doc.textAlign(invoice.subTotal, { align: 'right' }, rightcol2, startY);

  doc.setFontType('bold');
  doc.setTextColor(143, 32, 21);
  doc.textAlign(
    'Total',
    { align: 'left' },
    rightcol1,
    (startY += lineSpacing.NormalSpacing + 10),
  );

  doc.textAlign(invoice.total, { align: 'right' }, rightcol2, startY);

  /* Footer Page */
  doc.textAlign(
    `${company.name}`,
    { align: 'center' },
    rightcol2,
    (startY += lineSpacing.NormalSpacing + 51),
  );

  // Save PDF and Download
  doc.save(invoice.name);
};
