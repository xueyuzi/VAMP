import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "DashBoard",
    icon: "nb-home",
    children: []
  },
  {
    title: "安全态势",
    icon: "nb-home",
  },
  {
    title: "安全运维",
    icon: "nb-home",
  },
  {
    title: "数据管理",
    icon: "nb-gear",
    children: [
      {
        title: "预定义图表管理",
        icon: "nb-gear",
        link: "/custom/data/chart-template"
      },
      {
        title: "数据源管理",
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
        link: '/custom/system/user',
      },
      {
        title: "Dashboard管理",
        icon: "nb-gear",
        link: "/custom/system/menu",
      },
      {
        title: '角色管理',
        icon: "nb-gear",
        link: "/custom/system/role"
      },
      {
        title: '日志管理',
      },
      {
        title: '登录管理',
      },
      {
        title: "探头管理",
      },
      {
        title: "配置管理"
      }
    ]
  }

];
