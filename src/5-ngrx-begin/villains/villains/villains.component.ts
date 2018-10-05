import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Villain } from '../../core';
import { FilterObserver } from '../../shared/filter';
import { VillainService } from '../villains.service';

@Component({
  selector: 'aw-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.scss'],
  providers: [VillainService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VillainsComponent implements OnInit {
  addingVillain = false;
  selectedVillain: Villain = null;

  filterObserver: FilterObserver;
  filteredVillains$: Observable<Villain[]>;
  loading$: Observable<boolean>;

  constructor(public villainService: VillainService) {
    this.filterObserver = villainService.filterObserver;
    this.filteredVillains$ = villainService.filteredEntities$;
    this.loading$ = this.villainService.loading$;
  }

  ngOnInit() {
    this.getVillains();
  }

  clear() {
    this.addingVillain = false;
    this.selectedVillain = null;
  }

  deleteVillain(villain: Villain) {
    this.unselect();
    this.villainService.delete(villain.id);
  }

  enableAddMode() {
    this.addingVillain = true;
    this.selectedVillain = null;
  }

  getVillains() {
    this.villainService.getAll();
    this.unselect();
  }

  onSelect(villain: Villain) {
    this.addingVillain = false;
    this.selectedVillain = villain;
  }

  update(villain: Villain) {
    this.villainService.update(villain);
  }

  add(villain: Villain) {
    this.villainService.add(villain);
  }

  unselect() {
    this.addingVillain = false;
    this.selectedVillain = null;
  }
}
