import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})
export class ComboBoxComponent implements OnInit {

  @Input() name: String;
  @Input() submitted: boolean;
  @Input() errors: String;
  @Input() items: any;

  constructor() { }

  ngOnInit() {
  }

}
