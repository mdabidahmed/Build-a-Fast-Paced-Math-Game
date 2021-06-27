import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map, filter } from 'rxjs/operators';
@Directive({
  selector: '[appAnswerHighlight]',
})
export class AnswerHighlightDirective {
  constructor(private el: ElementRef, private controlName: NgControl) {}
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.controlName.control.parent.valueChanges
      .pipe(
        map(({ a, b, answer }) => 
          Math.abs((a + b - answer) / (a + b))
        )
      )
      .subscribe((value) => {
        if(value < 0.2){
          this.el.nativeElement.classList.add('close');
        }
        else{
          this.el.nativeElement.classList.remove('close');
        }
      });
  }
}
