import { Component, Input, OnInit } from '@angular/core';
import { Option } from '../../../models/option.interface';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit {

  @Input() placeholder: string = ''
  @Input() options: Option[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
