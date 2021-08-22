import { Component, Input, OnInit } from '@angular/core';
import { Menu } from '../../models/menu.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() menu: Array<Menu> = []
  constructor() { }

  ngOnInit(): void {
  }

}
