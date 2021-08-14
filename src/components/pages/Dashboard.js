import React, { useEffect, useState } from 'react';
import VisualCard from '../uis/DashboardComponents/VisualCard';
import GridContainer from '../uis/DashboardComponents/Grid/GridContainer';
import { fetchApi } from '../../store/actions/globalAction';
import {
  getBestSellingItems,
  getDailySales,
  getRecievesReportByPaymentType,
  getRecievesByDateRange,
  getReportByPaymentType,
  getLowInventoryReport,
  getBestProfitGivenCustomers,
  getTotalCountOfEntries,
} from '../../http/dashboardApi';
import BestSellingCustomer from './dashboard/BestSellingCustomer';
import DailySales from './dashboard/DailySales';
import MostSellingItems from './dashboard/MostSellingItems';
import PaymentTypeAnalytics from './dashboard/PaymentTypeAnalytics';
import LineGraph from './dashboard/LineGraph';
import LowInventory from './dashboard/LowInventory';
import CountCard from '../uis/DashboardComponents/CountCard';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [entryCountData, setEntryCountData] = useState({});
  useEffect(() => {
    const handleGetBestSelllingItemsResponse = res => {
      console.log(res);
      fetchApi(false);
    };
    const handleBestSellingItemsErr = () => {
      toast.error('Unable to get best selling items');
      fetchApi(false);
    };
    const handleTotalCountOfEntries = response => {
      if (response.data) {
        const {
          customersCount: { CustomersCount },
          salesCount: { SalesCount },
          suppliersCount: { SuppliersCount },
          itemsCount: { ItemsCount },
          employeesCount: { EmployeesCount },
        } = response.data;
        setEntryCountData({
          CustomersCount,
          SalesCount,
          SuppliersCount,
          ItemsCount,
          EmployeesCount,
        });
        console.log(response.data);
      }
    };
    fetchApi(true);
    getBestSellingItems()
      .then(handleGetBestSelllingItemsResponse)
      .catch(handleBestSellingItemsErr);
    getDailySales()
      .then(handleGetBestSelllingItemsResponse)
      .catch(handleBestSellingItemsErr);
    getRecievesReportByPaymentType()
      .then(handleGetBestSelllingItemsResponse)
      .catch(handleBestSellingItemsErr);
    getRecievesByDateRange()
      .then(handleGetBestSelllingItemsResponse)
      .catch(handleBestSellingItemsErr);
    getReportByPaymentType()
      .then(handleGetBestSelllingItemsResponse)
      .catch(handleBestSellingItemsErr);
    getLowInventoryReport()
      .then(handleGetBestSelllingItemsResponse)
      .catch(handleBestSellingItemsErr);
    getBestProfitGivenCustomers()
      .then(handleGetBestSelllingItemsResponse)
      .catch(handleBestSellingItemsErr);
    getTotalCountOfEntries()
      .then(handleTotalCountOfEntries)
      .catch(handleBestSellingItemsErr);
  }, []);

  const dataVisualizationChartPropsArray = [
    {
      component: <DailySales />,
      title: 'Daily Sales',
      desc: 'Desc for daily sales',
    },
    {
      component: <MostSellingItems />,
      title: 'Most Selling Items',
      desc: 'Desc for Most Selling Items',
    },
    {
      component: <BestSellingCustomer />,
      title: 'Best selling customer',
      desc: 'Desc for Best selling customer',
    },
    {
      component: <PaymentTypeAnalytics />,
      title: 'Payment Type Analytics',
      desc: 'Desc for Payment Type Analytics',
    },
    {
      component: <LineGraph />,
      title: 'Line Graph',
      desc: 'Desc for Line Graph',
    },
    {
      component: <LowInventory />,
      title: 'Low Inventory',
      desc: 'Desc for Low Inventory',
    },
  ];
  const {
    CustomersCount,
    SalesCount,
    SuppliersCount,
    ItemsCount,
    EmployeesCount,
  } = entryCountData;
  return (
    <div>
      <GridContainer>
        <CountCard count={SalesCount} description={'TOTAL SALES'} />
        <CountCard count={CustomersCount} description={'TOTAL CUSTOMERS'} />
        <CountCard count={SuppliersCount} description={'TOTAL SUPPLIERS'} />
        <CountCard count={EmployeesCount} description={'TOTAL EMPLOYEES'} />
        <CountCard count={ItemsCount} description={'TOTAL ITEMS'} />
      </GridContainer>
      <hr />
      <GridContainer>
        {dataVisualizationChartPropsArray.map(charts => {
          const { title, desc, component } = charts;
          return (
            <VisualCard title={title} desc={desc} key={title}>
              {component}
            </VisualCard>
          );
        })}
      </GridContainer>
    </div>
  );
};

export default Dashboard;
