import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { ButtonsComponent } from './buttons/buttons.component';

import { GridComponent } from './grid/grid.component';
import { ListsComponent } from './lists/lists.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import {
  DialogComponent,
  DialogOverviewExampleDialogComponent
} from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';


import { MatAutocompleteModule as AutoComplete } from '@angular/material/autocomplete';
import { MatBadgeModule as Badge } from '@angular/material/badge';
import { MatBottomSheetModule as BottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule as Button } from '@angular/material/button';
import { MatFormFieldModule as FormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule as ButtonToggle } from '@angular/material/button-toggle';
import { MatCardModule as Card } from '@angular/material/card';
import { MatCheckboxModule as Checkbox } from '@angular/material/checkbox';
import { MatChipsModule as Chips } from '@angular/material/chips';
import { MatDatepickerModule as DatePicker } from '@angular/material/datepicker';
import { MatDialogModule as Dialog } from '@angular/material/dialog';
import { MatDividerModule as Divider } from '@angular/material/divider';
import { MatExpansionModule as Expansion } from '@angular/material/expansion';
import { MatGridListModule as GridList } from '@angular/material/grid-list';
import { MatIconModule as Icon } from '@angular/material/icon';
import { MatInputModule as Input, MatInputModule } from '@angular/material/input';
import { MatListModule as List } from '@angular/material/list';
import { MatMenuModule as Menu } from '@angular/material/menu';
import { MatPaginatorModule as Paginator } from '@angular/material/paginator';
import { MatProgressBarModule as ProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule as ProgressSpinner } from '@angular/material/progress-spinner';
import { MatRadioModule as Radio } from '@angular/material/radio';
import { MatSelectModule as Select, MatSelectModule } from '@angular/material/select';
import { MatSidenavModule as Sidenav } from '@angular/material/sidenav';
import { MatSliderModule as Slider } from '@angular/material/slider';
import { MatSlideToggleModule as SlideToggle } from '@angular/material/slide-toggle';
import { MatSnackBarModule as SnackBar } from '@angular/material/snack-bar';
import { MatSortModule as SortModule } from '@angular/material/sort';
import { MatStepperModule as Stepper } from '@angular/material/stepper';
import { MatTableModule as Table } from '@angular/material/table';
import { MatTabsModule as Tabs } from '@angular/material/tabs';
import { MatToolbarModule, MatToolbarModule as Toolbar } from '@angular/material/toolbar';
import { MatTooltipModule as Tooltip } from '@angular/material/tooltip';
import { MatTreeModule as Tree } from '@angular/material/tree';
import { LayoutModule } from '@angular/cdk/layout';
import { MatVideoModule } from 'mat-video';
import { MaterialFileInputModule, FileInputConfig } from 'ngx-material-file-input';
import { AuthService } from 'angularx-social-login';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,    
    
    LazyLoadImageModule,
    PrimengModule
    
  ],
  providers: [AuthService],
  entryComponents: [DialogOverviewExampleDialogComponent],
  declarations: [
    ButtonsComponent,
    GridComponent,
    ListsComponent,
    MenuComponent,
    TabsComponent,
    StepperComponent,
    ExpansionComponent,
    ChipsComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    ProgressComponent,
    DialogComponent,
    DialogOverviewExampleDialogComponent,
    TooltipComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent
    
  ],
  exports: [
    Dialog,
    AutoComplete,
    Badge,
    BottomSheet,    
    Button,
    FormField,
    ButtonToggle,
    Card, 
    Checkbox,
    Chips,    
    DatePicker,
    Divider,
    Expansion,
    GridList,     
    Icon,
    Input,
    List,
    Menu,    
    MatToolbarModule,
    Paginator,
    ProgressBar,
    ProgressSpinner,
    Radio, 
    Select,   
    Sidenav,
    Slider,   
    SlideToggle,
    SnackBar,
    SortModule,
    Stepper,
    Table,    
    Tabs,
    Toolbar, 
    Tooltip,
    Tree,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    LayoutModule,
    MatVideoModule,
    MaterialFileInputModule,
    MatFormFieldModule,       
    LazyLoadImageModule,
    PrimengModule

  ]
})
export class MaterialComponentsModule {}
