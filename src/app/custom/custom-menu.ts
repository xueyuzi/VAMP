import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "DashBoard",
    icon: "nb-home",
    children: []
  },
  {
    title:"数据管理",
    icon:"nb-gear",
    children:[
      {
        title:"预定义图表管理",
      },
      {
        title:"数据源管理",
      }
    ]
  },
  {
    title: "系统管理",
    icon: "nb-gear",
    children: [
      {
        title: '用户管理',
        icon: 'nb-gear',
        link: '/custom/user',
      },
      {
        title: '权限管理',
      },
      {
        title: '部门管理',
      },
      {
        title: "Dashboard管理",
        icon: "nb-gear",
        link: "/custom/menus",
      }
    ]
  }

];
