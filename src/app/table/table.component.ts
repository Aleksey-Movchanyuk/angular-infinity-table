import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import { ChemicalElement } from './models/chemical-element.model'
import { ChemicalElementService } from './services/chemical-element.service'

import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
 
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  @ViewChild('table') table: ElementRef | any;
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport | undefined;

  displayedColumns = ['position', 'name', 'weight', 'symbol'];

  elements: ChemicalElement[] = [];

  dataSource: any = new TableVirtualScrollDataSource();

  currentPage = 1;
  isFirstPage = true;
  isLastPage = false

  start: number = 0;
  limit: number = 20;
  end: number = this.limit + this.start;

  selectedRowIndex: number = 0;

  constructor(
    private chemicalElemetService: ChemicalElementService,
    private scrollDispatcher: ScrollDispatcher, 
    ) {}


  ngOnInit() {
    
    this.chemicalElemetService.getChemicalElements()
      .then(response => {

        this.elements = response.data;

        this.currentPage = response.navigation.page;
        this.isFirstPage = response.navigation.is_first_page;
        this.isLastPage = response.navigation.is_last_page;

        if (!this.isLastPage) {
          this.chemicalElemetService.getChemicalElementsNextPage(this.currentPage)
            .then(response => {
                this.elements = this.elements.concat(response.data);
    
                this.dataSource = new TableVirtualScrollDataSource(this.elements);
            });
        }
        else {
          this.dataSource = new TableVirtualScrollDataSource(this.elements);
        }


      });

  }

  ngAfterViewInit() {
    this.scrollDispatcher.scrolled()
      .subscribe(event => {
        this.onTableScroll(event);
      });
  }

  onTableScroll(e: any) {
    //console.log(e);
    const tableViewHeight = e.elementRef.nativeElement.offsetHeight // viewport
    const tableScrollHeight = e.elementRef.nativeElement.scrollHeight // length of all table

    const scrollLocation = e.elementRef.nativeElement.scrollTop; // how far user scrolled
    

    // visible height + pixel scrolled >= total height 
    if (tableViewHeight + scrollLocation >= tableScrollHeight - 50) {
      console.log("End");

      this.chemicalElemetService.getChemicalElementsNextPage(this.currentPage)
        .then(response => {
          this.currentPage = response.navigation.page;
          this.isFirstPage = response.navigation.is_first_page;
          this.isLastPage = response.navigation.is_last_page;
  
          if (!this.isLastPage) {
            this.chemicalElemetService.getChemicalElementsNextPage(this.currentPage)
              .then(response => {
                this.elements = this.elements.concat(response.data);
    
                this.dataSource = new TableVirtualScrollDataSource(this.elements);
              });
          }
          else {
            this.dataSource = new TableVirtualScrollDataSource(this.elements);
          }

        });

    }
  }


  handleScroll = (scrolled: boolean) => {
    console.log('hello');
  }


  selectedRow(row: any) {
    console.log('selectedRow', row)
  }
}


