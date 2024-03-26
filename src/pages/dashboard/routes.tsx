import { RiMoneyDollarCircleLine, RiBankLine, RiMoneyEuroCircleLine, RiBarChartHorizontalLine, RiDashboardLine, RiFileList3Line, RiMoneyCnyCircleLine } from 'react-icons/ri';

const routes = [
  {
    href: '/dashboard/budgets',
    title: 'Budgets',
    icon: <RiFileList3Line size={15} />,
  },
  {
    href: '/dashboard/savings',
    title: 'Savings',
    icon: <RiMoneyDollarCircleLine size={15} />,
  },
  {
    href: '/dashboard/incomes',
    title: 'Income',
    icon: <RiBankLine size={15} />,
  },
  {
    href: '/dashboard/expenses',
    title: 'Expenses',
    icon: <RiMoneyEuroCircleLine size={15} />,
  },
  {
    href: '/dashboard/debt-mgts',
    title: 'Debt Mgt',
    icon: <RiMoneyCnyCircleLine size={15} />, // You can choose another suitable debt management icon here
  },
  {
    href: '/dashboard/overview',
    title: 'Overview',
    icon: <RiDashboardLine size={15} />,
  }
];

export default routes;
