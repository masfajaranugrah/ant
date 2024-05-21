// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const Cetak = {
  id: 'cetak',
  title: 'Cetak',
  type: 'group',
  children: [
    {
      id: 'Cetak',
      title: 'Cetak Laporan',
      type: 'item',
      url: '/dashboard/cetak-document',
      icon: icons.ChromeOutlined
    },
  ]
};

export default Cetak;
