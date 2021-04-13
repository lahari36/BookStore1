import { Pipe, PipeTransform } from '@angular/core';
import { NotifierService } from './notifier.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  constructor(private notifierservice:NotifierService){}
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
     
      else if(author.length!==0){
        return author;
      }
      else{
        //alert("No data matches your search");
        this.notifierservice.showNotification('No data matches your search','Dismiss')
        return booksArray;
      }
      
    }
  }

}
