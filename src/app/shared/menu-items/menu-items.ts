import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;  
}

const MENUITEMSADMIN = [
  { state: '/spot/filtro', name: 'Spots', type: 'link', icon: 'view_list' },
  { state: '/report-admin', name: 'Relatórios Admin', type: 'link', icon: 'view_list' },
  { state: '/noticia/novo', name: 'Notícias', type: 'link', icon: 'view_list' },
  { state: '/marcas/filtro', name: 'Marcas', type: 'link', icon: 'view_list' },
  { state: '/modelos/filtro', name: 'Modelos', type: 'link', icon: 'view_list' }

 /* { state: '/spot/filtro', name: 'Usuários', type: 'link', icon: 'view_list' },
  { state: '/spot/filtro', name: 'Anúncios', type: 'link', icon: 'view_list' },
  { state: '/spot/filtro', name: 'Equipamentos', type: 'link', icon: 'view_list' },
  { state: '/spot/filtro', name: 'Spots', type: 'link', icon: 'view_list' }, */
  //{ state: '/parceiro/filtro', name: 'Parceiros', type: 'link', icon: 'view_list' }, 
  //{ state: '/spot/filtro', name: 'Noticias', type: 'link', icon: 'view_list' },

];


const MENUITEMS = [  
  { state: 'dashboard', name: 'Anúncios', type: 'link', icon: 'view_list' },
  { state: 'dashboard', name: 'Spots', type: 'link', icon: 'view_list' },  
  { state: 'equipamento-proprietario', name: 'Registre Seu Equipamento', type: 'link', icon: 'view_list' } 
  /*{ state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
  { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
  { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
  { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
  {
    state: 'expansion',
    type: 'link',
    name: 'Expansion Panel',
    icon: 'vertical_align_center'
  },
  { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
  { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  {
    state: 'progress-snipper',
    type: 'link',
    name: 'Progress snipper',
    icon: 'border_horizontal'
  },
  {
    state: 'progress',
    type: 'link',
    name: 'Progress Bar',
    icon: 'blur_circular'
  },
  {
    state: 'dialog',
    type: 'link',
    name: 'Dialog',
    icon: 'assignment_turned_in'
  },
  { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  {
    state: 'slide-toggle',
    type: 'link',
    name: 'Slide Toggle',
    icon: 'all_inclusive'
  }*/
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }

  getMenuAdminItem(): Menu[]{
    return MENUITEMSADMIN;
  }
}
