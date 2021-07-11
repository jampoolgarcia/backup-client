import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const url_base = environment.url_base;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string): string {

    if(img == null || img.length <= 0) {
      return `${url_base}/files/${type}/no-image`;
    }

    return `${url_base}/files/${type}/${img}`;
  }

}
