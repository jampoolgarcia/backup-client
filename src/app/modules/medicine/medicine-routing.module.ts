import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomeRecordComponent } from './pages/income-record/income-record.component';
import { KardexComponent } from './pages/kardex/kardex.component';
import { StockComponent } from './pages/stock/stock.component';

const routes: Routes = [
  {
    path: 'stock',
    component: StockComponent
  },
  {
    path: 'kardex',
    component: KardexComponent
  },
  {
    path: 'incomeRecord',
    component: IncomeRecordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineRoutingModule { }
