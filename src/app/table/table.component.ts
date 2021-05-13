import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  start: number = 0;
  limit: number = 15;
  end: number = this.limit + this.start;
  selectedRowIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.dataSource = this.getTableData(this.start, this.end);
    this.updateIndex();
  }

  onTableScroll(e: any) {
    console.log(e)
    const tableViewHeight = e.target.offsetHeight // viewport
    const tableScrollHeight = e.target.scrollHeight // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled
    
    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;    
    if (scrollLocation > limit) {
      let data = this.getTableData(this.start, this.end);;
      this.dataSource = this.dataSource.concat(data);
      this.updateIndex();
    }
  }

  getTableData(start: number, end: number) {
    return ELEMENT_DATA.filter((value, index) => index >= start && index < end)
  }

  updateIndex() {
    this.start = this.end;
    this.end = this.limit + this.start;
  }

  selectedRow(row: any) {
    console.log('selectedRow', row)
  }
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  age: number;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', age: 25},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', age: 25},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', age: 25},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', age: 25},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', age: 25},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', age: 25},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', age: 25},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', age: 25},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', age: 25},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', age: 25},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', age: 25},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', age: 25},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', age: 25},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', age: 25},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', age: 25},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', age: 25},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', age: 25},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', age: 25},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', age: 25},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', age: 25},
  {position: 21, name: 'Hydrogen', weight: 1.0079, symbol: 'H', age: 25},
  {position: 22, name: 'Helium', weight: 4.0026, symbol: 'He', age: 25},
  {position: 23, name: 'Lithium', weight: 6.941, symbol: 'Li', age: 25},
  {position: 24, name: 'Beryllium', weight: 9.0122, symbol: 'Be', age: 25},
  {position: 25, name: 'Boron', weight: 10.811, symbol: 'B', age: 25},
  {position: 26, name: 'Carbon', weight: 12.0107, symbol: 'C', age: 25},
  {position: 27, name: 'Nitrogen', weight: 14.0067, symbol: 'N', age: 25},
  {position: 28, name: 'Oxygen', weight: 15.9994, symbol: 'O', age: 25},
  {position: 29, name: 'Fluorine', weight: 18.9984, symbol: 'F', age: 25},
  {position: 30, name: 'Neon', weight: 20.1797, symbol: 'Ne', age: 25},
  {position: 31, name: 'Sodium', weight: 22.9897, symbol: 'Na', age: 25},
  {position: 32, name: 'Magnesium', weight: 24.305, symbol: 'Mg', age: 25},
  {position: 33, name: 'Aluminum', weight: 26.9815, symbol: 'Al', age: 25},
  {position: 34, name: 'Silicon', weight: 28.0855, symbol: 'Si', age: 25},
  {position: 35, name: 'Phosphorus', weight: 30.9738, symbol: 'P', age: 25},
  {position: 36, name: 'Sulfur', weight: 32.065, symbol: 'S', age: 25},
  {position: 37, name: 'Chlorine', weight: 35.453, symbol: 'Cl', age: 25},
  {position: 38, name: 'Argon', weight: 39.948, symbol: 'Ar', age: 25},
  {position: 39, name: 'Potassium', weight: 39.0983, symbol: 'K', age: 25},
  {position: 40, name: 'Calcium', weight: 40.078, symbol: 'Ca', age: 25},
  {position: 41, name: 'Hydrogen', weight: 1.0079, symbol: 'H', age: 25},
  {position: 42, name: 'Helium', weight: 4.0026, symbol: 'He', age: 25},
  {position: 43, name: 'Lithium', weight: 6.941, symbol: 'Li', age: 25},
  {position: 44, name: 'Beryllium', weight: 9.0122, symbol: 'Be', age: 25},
  {position: 45, name: 'Boron', weight: 10.811, symbol: 'B', age: 25},
  {position: 46, name: 'Carbon', weight: 12.0107, symbol: 'C', age: 25},
  {position: 47, name: 'Nitrogen', weight: 14.0067, symbol: 'N', age: 25},
  {position: 48, name: 'Oxygen', weight: 15.9994, symbol: 'O', age: 25},
  {position: 49, name: 'Fluorine', weight: 18.9984, symbol: 'F', age: 25},
  {position: 50, name: 'Neon', weight: 20.1797, symbol: 'Ne', age: 25},
  {position: 51, name: 'Sodium', weight: 22.9897, symbol: 'Na', age: 25},
  {position: 52, name: 'Magnesium', weight: 24.305, symbol: 'Mg', age: 25},
  {position: 53, name: 'Aluminum', weight: 26.9815, symbol: 'Al', age: 25},
  {position: 54, name: 'Silicon', weight: 28.0855, symbol: 'Si', age: 25},
  {position: 55, name: 'Phosphorus', weight: 30.9738, symbol: 'P', age: 25},
  {position: 56, name: 'Sulfur', weight: 32.065, symbol: 'S', age: 25},
  {position: 57, name: 'Chlorine', weight: 35.453, symbol: 'Cl', age: 25},
  {position: 58, name: 'Argon', weight: 39.948, symbol: 'Ar', age: 25},
  {position: 59, name: 'Potassium', weight: 39.0983, symbol: 'K', age: 25},
  {position: 60, name: 'Calcium', weight: 40.078, symbol: 'Ca', age: 25},
];
