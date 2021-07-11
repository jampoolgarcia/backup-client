import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicineRoutingModule } from './medicine-routing.module';
import { StockComponent } from './pages/stock/stock.component';
import { KardexComponent } from './pages/kardex/kardex.component';
import { IncomeRecordComponent } from './pages/income-record/income-record.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryComponent } from './components/category/category.component';
import { FormMedicineComponent } from './components/form-medicine/form-medicine.component';


@NgModule({
  declarations: [StockComponent, KardexComponent,  IncomeRecordComponent, CategoryComponent, FormMedicineComponent],
  imports: [
    CommonModule,
    MedicineRoutingModule,
    SharedModule
  ]
})
export class MedicineModule { }
