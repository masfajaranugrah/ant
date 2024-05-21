// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const panggil = {
  id: 'pangil',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'panggilan',
      title: 'Calling',
      type: 'item',
      url: '/dashboard/panggilan',
      icon: icons.ChromeOutlined
    },
  ]
};

export default panggil;
