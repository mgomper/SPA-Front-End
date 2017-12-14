import {
  Directive,
  HostBinding,
  HostListener } from '@angular/core';

@Directive({
  selector: '[noteDirective]'
})
export class NoteDirective {
  colors = [
    'BlanchedAlmond', 'DarkOrange', 'IndianRed', 'Lavender', 'LavenderBlush',
    'Navy', 'Sienna', 'Yellow', 'Thistle', 'SteelBlue', 'MediumPurple'
  ];

  @HostBinding('style.color') color: string;

  @HostListener('click') pickRandomColor() {
    const chosenColor = Math.floor(Math.random() * this.colors.length);

    this.color = this.colors[chosenColor];
  }
}
