import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingradient } from '../Shared/ingradients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingradients: Ingradient[];
  ingChanged: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingradients = this.slService.getIngradients();
    this.ingChanged = this.slService.ingradientsChanged.subscribe(
      (ingradient: Ingradient[]) => {
        this.ingradients = ingradient;
      }
    );
  }

  onEditItem(id : number) {
    this.slService.startedEditing.next(id);
  }

  ngOnDestroy() {
    this.ingChanged.unsubscribe();
  }
}
