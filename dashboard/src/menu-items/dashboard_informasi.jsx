// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard_informasi = {
  id: 'dashboard_informasi',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard_informasi',
      title: 'dashboard_informasi',
      type: 'item',
      url: '/dashboard/informasi',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard_informasi;
