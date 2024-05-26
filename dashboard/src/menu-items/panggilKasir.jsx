// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const panggilKasir = {
  id: 'panggilKasir',
  title: 'panggilKasir',
  type: 'group',
  children: [
    {
      id: 'panggilKasir',
      title: 'panggilKasir',
      type: 'item',
      url: '/dashboard/panggilankasir',
      icon: icons.ChromeOutlined
    },
  ]
};

export default panggilKasir;
