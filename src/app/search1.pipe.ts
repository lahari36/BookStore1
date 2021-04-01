import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search1'
})
export class Search1Pipe implements PipeTransform {

  transform(booksArray: any[], search: string): any[] {
    
    if(!search){
      
      return booksArray;
    }
    
    else {
      let category= booksArray.filter(obj=>obj.category.toLowerCase().indexOf(search.toLowerCase())!==-1);
      let author=booksArray.filter(obj=>obj.author.toLowerCase().indexOf(search.toLowerCase())!==-1);
      if(category.length!==0){
        return category;
      }
      else{
        return author;
      }
      
    }
  }

}
