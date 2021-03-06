import { Component, OnInit, Input } from '@angular/core';
import { Cocktailbox } from 'src/app/_model/cocktailbox.model';

@Component({
  selector: 'app-boxwrapper',
  templateUrl: './boxwrapper.component.html',
  styleUrls: ['./boxwrapper.component.css']
})
export class BoxwrapperComponent implements OnInit {
  @Input() cocktailbox : Cocktailbox;

  constructor() { }

  ngOnInit(): void {
  }
}
