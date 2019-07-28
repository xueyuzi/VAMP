import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';

import { SystemManageRoutingModule } from "./system-manage-routing-module"
import { NbSelectModule, NbInputModule, NbCardModule, NbButtonModule, NbCheckboxModule, NbRadioModule, NbIconModule, NbIconComponent, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DialogModule } from 'primeng/dialog';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    MenuComponent,
    RoleComponent,
    UserComponent,
  ],
  entryComponents: [
    NbIconComponent
  ],
  providers: [
    ConfirmationService
  ],
  imports: [
    CommonModule,
    SystemManageRoutingModule,
    NbSelectModule,
    NbInputModule,
    FormsModule,
    NbCardModule,
    Ng2SmartTableModule,
    DialogModule,
    NbButtonModule,
    NbCheckboxModule,
    CheckboxModule,
    NbRadioModule,
    NbEvaIconsModule,
    NbIconModule,
    TreeTableModule,
    TreeModule,
    ConfirmDialogModule
  ]
})
export class SystemManageModule { }
