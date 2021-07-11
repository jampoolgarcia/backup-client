import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busquedaSupply'
})
export class BusquedaSupplyPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    if(arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for(const post of value){
      if(post.hasOwnProperty('user')){
        if(post.user.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ){
          resultPosts.push(post);
        }
      }else{
        if(post.description.toLowerCase().indexOf(arg.toLowerCase()) > -1 ){
          resultPosts.push(post);
        }
      }
      
    }
    return resultPosts;
  }

}
