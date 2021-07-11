import { NgModule } from '@angular/core';

/** pipes  */
import { FilterPipe } from './filter.pipe';
import { BusquedaSupplyPipe } from './busqueda-supply.pipe';
import { BusquedaFacturaPipe } from './busqueda-factura.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';
import { PaginatePipe } from './paginate.pipe';
import { BusquedaPipe } from './busqueda.pipe';
import { ImagePipe } from './image.pipe';


@NgModule({
  declarations: [
    FilterPipe,
    BusquedaSupplyPipe,
    BusquedaFacturaPipe,
    TruncateTextPipe,
    PaginatePipe,
    BusquedaPipe,
    ImagePipe,
  ],
  exports: [
    FilterPipe,
    BusquedaSupplyPipe,
    BusquedaFacturaPipe,
    TruncateTextPipe,
    PaginatePipe,
    BusquedaPipe,
    ImagePipe,
  ]
})
export class PipesModule { }
