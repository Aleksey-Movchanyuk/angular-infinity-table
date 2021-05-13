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

  prevElements: ChemicalElement[] = [];
  currElements: ChemicalElement[] = [];
  nextElements: ChemicalElement[] = [];

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

        this.currElements = response.data;

        this.currentPage = response.navigation.page;
        this.isFirstPage = response.navigation.is_first_page;
        this.isLastPage = response.navigation.is_last_page;

        if (!this.isLastPage) {
          this.chemicalElemetService.getChemicalElementsNextPage(this.currentPage)
            .then(response => {
                this.nextElements = response.data;
    
                this.dataSource = new TableVirtualScrollDataSource(this.prevElements.concat(this.currElements.concat(this.nextElements)));
            });
        }
        else {
          this.dataSource = new TableVirtualScrollDataSource(this.prevElements.concat(this.currElements));
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
    

    // if we on the starting position
    if (scrollLocation <= 10) {
      console.log("Start");

      this.chemicalElemetService.getChemicalElementsPreviousPage(this.currentPage)
        .then(response => {
          this.currElements = response.data;

          this.currentPage = response.navigation.page;
          this.isFirstPage = response.navigation.is_first_page;
          this.isLastPage = response.navigation.is_last_page;
  
          if (!this.isLastPage) {
            this.chemicalElemetService.getChemicalElementsNextPage(this.currentPage)
              .then(response => {
                  this.nextElements = response.data;
      
                  this.dataSource = new TableVirtualScrollDataSource(this.prevElements.concat(this.currElements.concat(this.nextElements)));
              });
          }
          else {
            this.dataSource = new TableVirtualScrollDataSource(this.prevElements.concat(this.currElements));
          }

        });

    }

    // visible height + pixel scrolled >= total height 
    if (tableViewHeight + scrollLocation >= (tableScrollHeight / 2) - 1) {
      console.log("End");

      this.chemicalElemetService.getChemicalElementsNextPage(this.currentPage)
        .then(response => {
          this.currElements = response.data;

          this.currentPage = response.navigation.page;
          this.isFirstPage = response.navigation.is_first_page;
          this.isLastPage = response.navigation.is_last_page;
  
          if (!this.isLastPage) {
            this.chemicalElemetService.getChemicalElementsNextPage(this.currentPage)
              .then(response => {
                  this.nextElements = response.data;
      
                  this.dataSource = new TableVirtualScrollDataSource(this.prevElements.concat(this.currElements.concat(this.nextElements)));
              });
          }
          else {
            this.dataSource = new TableVirtualScrollDataSource(this.prevElements.concat(this.currElements));
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


