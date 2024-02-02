import { FaHome, FaInfoCircle, FaEnvelope, FaUber, FaUsers, FaUser, FaGrinHearts, FaMobile, FaGlobeAmericas, FaWallet, FaChartBar } from 'react-icons/fa';

const routes = [
  {
    href: '/dashboard/budgets',
    title: 'Budgets',
    icon: <FaHome size={15}/>,
  },
  {
    href: '/dashboard/savings',
    title: 'Savings',
    icon: <FaInfoCircle size={15} />,
  },
  {
    href: '/dashboard/incomes',
    title: 'Income',
    icon: <FaEnvelope size={15} />,
  },
  {
    href: '/dashboard/expenses',
    title: 'Expenses',
    icon: <FaUser size={15} />,
  },
  {
    href: '/dashboard/debt-mgts',
    title: 'Debt Mgt',
    icon: <FaChartBar size={15} />,
  },
  {
    href: '/dashboard/overview',
    title: 'Overview',
    icon: <FaMobile size={15} />,
  },
  {
    href: '/dashboard/username',
    title: '회원관리',
    icon: <FaWallet size={15} />,
  },
  {
    href: '/dashboard/username',
    title: '회원관리',
    icon: <FaUsers size={15} />,
  },
  {
    href: '/dashboard/username',
    title: '회원관리',
    icon: <FaGlobeAmericas size={15} />,
  }
];

export default routes;