// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const repanggilKasil = {
  id: 'repanggilKasir',
  title: 'repanggilKasil',
  type: 'group',
  children: [
    {
      id: 'repanggilKasir',
      title: 'has been called',
      type: 'item',
      url: '/dashboard/repanggilankasir',
      icon: icons.ChromeOutlined
    },
  ]
};

export default repanggilKasil;
