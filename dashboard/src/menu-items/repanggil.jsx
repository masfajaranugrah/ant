// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const repangil = {
  id: 'repanggilan',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'repanggilan',
      title: 'Data antrian Selesai',
      type: 'item',
      url: '/dashboard/repanggilan',
      icon: icons.ChromeOutlined
    },
  ]
};

export default repangil;
