import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

const states = ['Bordeaux', 'Lille', 'Lyon', 'Marseille', 'Paris', 'Strasbourg'];

@Component({
  selector: 'app-search-replacement',
  templateUrl: './search-replacement.component.html',
  styleUrls: ['./search-replacement.component.scss']
})
export class SearchReplacementComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {
  }
  searchInput = '';
  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  selectedCategory: string | null = null;
  selectedSpecificCategory: string | null = null;
  allCategories = ['Gaming', 'Sport', 'Musique', 'Aide à domicile'];
  specificGamingCategories = [
    { img: 'assets/img/arcade.svg', label: 'Arcade'},
    { img: 'assets/img/competitif.svg', label: 'Compétitif'},
    { img: 'assets/img/chill.svg', label: 'Détente'},
    { img: 'assets/img/vr.svg', label: 'VR'}
  ];
  specificSportCategories = [
    { img: 'assets/img/football.svg', label: 'Football'},
    { img: 'assets/img/basketball.svg', label: 'Basketball'},
    { img: 'assets/img/coach.svg', label: 'Coach sportif'},
    { img: 'assets/img/golf.svg', label: 'Golf'}
  ];
  specificMusicCategories = [
    { img: 'assets/img/singer.svg', label: 'Chanteur'},
    { img: 'assets/img/guitarist.svg', label: 'Guitariste'},
    { img: 'assets/img/pianist.svg', label: 'Pianiste'},
    { img: 'assets/img/drum.svg', label: 'Batteur'}
  ];
  specificHomeHelpCategories = [
    { img: 'assets/img/assistance.svg', label: 'Auxiliaire de vie'},
    { img: 'assets/img/school.svg', label: 'Soutien scolaire'},
    { img: 'assets/img/dog.svg', label: 'Garde d\'animaux'},
    { img: 'assets/img/children.svg', label: 'Garde d\'enfant'}
  ];
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  ngOnInit(): void {
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  selectSpecificCategory(specificCategory: string) {
    this.selectedSpecificCategory = specificCategory;
  }

  onSubmit() {
    const form = {
      address: this.searchInput,
      category: this.selectedCategory,
      specificCategory: this.selectedSpecificCategory
    };
    console.warn(form);
    this.activeModal.close();
  }
}
