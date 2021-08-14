import http from './http';

export async function getDashboardSummary() {
  return await http.get('/report/dashboard-summary', { limit: 20 });
}

export async function getDailySales() {
  return await http.get('/report/dailySales');
}

export async function getBestSellingItems() {
  return await http.get('/report/best-selling-items');
}

export async function getReportByPaymentType() {
  return await http.get('/report/report-by-payment-type');
}

export async function getLowInventoryReport() {
  return await http.get('/report/low-inventory-report');
}

export async function getRecievesByDateRange() {
  return await http.get('/report/receives-by-date-range');
}

export async function getRecievesReportByPaymentType() {
  return await http.get('/report/receives-report-by-payment-type');
}

export async function getBestProfitGivenCustomers() {
  return await http.get('/report/best-profit-given-customers');
}

export async function getTotalCountOfEntries() {
  return await http.get('/report//total-count-of-entries');
}
