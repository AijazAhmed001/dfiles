export interface CompleteReportExport {
  fileName: string
  generatedAt: string
  inventory: Array<Record<string, string | number | undefined>>
  assetHistory: Array<Record<string, string | undefined>>
  auditLog: Array<Record<string, string | undefined>>
}

const value = (input: unknown) => input == null || input === '' ? '-' : String(input)
const date = (input?: string) => input
  ? new Intl.DateTimeFormat('en-PK', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(input))
  : '-'
const money = (input?: number) => new Intl.NumberFormat('en-PK', {
  style: 'currency', currency: 'PKR', maximumFractionDigits: 0,
}).format(input ?? 0)

export async function downloadCompleteReportPdf(report: CompleteReportExport) {
  const [{ jsPDF }, { default: autoTable }] = await Promise.all([import('jspdf'), import('jspdf-autotable')])
  const document = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  const margin = 34
  const heading = (title: string, subtitle: string) => {
    document.setFillColor(5, 88, 156)
    document.rect(0, 0, document.internal.pageSize.getWidth(), 74, 'F')
    document.setTextColor(255, 255, 255)
    document.setFontSize(19)
    document.setFont('helvetica', 'bold')
    document.text(title, margin, 32)
    document.setFontSize(9)
    document.setFont('helvetica', 'normal')
    document.text(subtitle, margin, 51)
    document.setTextColor(20, 32, 52)
  }
  const table = (title: string, subtitle: string, head: string[][], body: string[][]) => {
    document.addPage()
    heading(title, subtitle)
    autoTable(document, {
      startY: 90, head, body,
      styles: { fontSize: 7, cellPadding: 4, overflow: 'linebreak' },
      headStyles: { fillColor: [5, 88, 156], textColor: 255 },
      alternateRowStyles: { fillColor: [244, 248, 252] },
      margin: { left: margin, right: margin, bottom: 30 },
    })
  }

  heading('EFU IT Hardware Inventory - Complete Report', `${report.fileName}  |  Generated ${date(report.generatedAt)}`)
  document.setFontSize(12)
  document.setFont('helvetica', 'bold')
  document.text('Report summary', margin, 106)
  document.setFontSize(10)
  document.setFont('helvetica', 'normal')
  document.text(`Inventory assets: ${report.inventory.length}`, margin, 130)
  document.text(`Asset history records: ${report.assetHistory.length}`, margin, 149)
  document.text(`Audit log records: ${report.auditLog.length}`, margin, 168)

  table('Inventory', `${report.inventory.length} asset records`,
    [['Asset ID', 'Model', 'Serial number', 'Type', 'Make', 'Vendor', 'Location', 'Status', 'Cost (PKR)']],
    report.inventory.map(row => [value(row.assetCode), value(row.model), value(row.serialNumber), value(row.assetType), value(row.assetMake), value(row.vendor), value(row.location), value(row.status), money(row.purchaseCost as number)]))
  table('Asset History', `${report.assetHistory.length} allocation and return records`,
    [['Asset', 'Employee', 'Department', 'Location', 'Allocated', 'Returned', 'Status', 'Remarks']],
    report.assetHistory.map(row => [`${value(row.assetCode)}\n${value(row.assetModel)}`, `${value(row.employee)}\n${value(row.employeeCode)}`, value(row.department), value(row.location), date(row.allocationDate), date(row.returnedAt), value(row.status), value(row.remarks)]))
  table('Audit Log', `${report.auditLog.length} system activity records`,
    [['Date and time', 'User', 'Action', 'Entity', 'Entity ID', 'IP address']],
    report.auditLog.map(row => [date(row.createdAt), value(row.user), value(row.action), value(row.entity), value(row.entityId), value(row.ipAddress)]))

  const pageCount = document.getNumberOfPages()
  for (let page = 1; page <= pageCount; page += 1) {
    document.setPage(page)
    document.setFontSize(7)
    document.setTextColor(90, 104, 123)
    document.text(report.fileName, margin, document.internal.pageSize.getHeight() - 12)
    document.text(`Page ${page} of ${pageCount}`, document.internal.pageSize.getWidth() - margin, document.internal.pageSize.getHeight() - 12, { align: 'right' })
  }
  document.save(report.fileName)
}
