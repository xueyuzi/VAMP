import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomRoutingModule } from './custom-routing.module';

import { ThemeModule } from '../@theme/theme.module';
import { CustomComponent } from './custom.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [CustomComponent],
  imports: [
    CommonModule,
    CustomRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
  ]
})
export class CustomModule { }
