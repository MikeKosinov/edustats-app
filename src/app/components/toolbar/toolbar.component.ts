import { Component, EventEmitter, Output } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(private menuService: MenuService) {}

  toggleSideMenu() {
    this.menuService.toggleMenu();
  }
}
