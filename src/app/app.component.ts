import { Component, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})


export class AppComponent  {
  title = 'frontTest';
  


  click(opcion){
    $(".lineL").hide();
    $(".lineR").hide();
    $(".active").removeClass("active");

    switch(opcion){
      case 1:
      $("#option1").addClass("active");
      $(".lineL").show();
        break;
      case 2:
        $("#option2").addClass("active");
        $(".lineR").show();
   
        break;
    } 

  }

}


