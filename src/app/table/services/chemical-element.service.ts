import { Injectable } from '@angular/core';

import { ELEMENT_DATA as ELEMENT_DATA_PAGE_1 }  from './mock-chemical-elements-page-1';
import { ELEMENT_DATA as ELEMENT_DATA_PAGE_2 }  from './mock-chemical-elements-page-2';
import { ELEMENT_DATA as ELEMENT_DATA_PAGE_3 }  from './mock-chemical-elements-page-3';

@Injectable()
export class ChemicalElementService {

    getChemicalElements() {
        let response = {
            navigation: {
                page: 1, 
                is_first_page: true,
                is_last_page: false
            }, 
            data: ELEMENT_DATA_PAGE_1
        };

        return Promise.resolve(response);
    }

  getChemicalElementsNextPage(currentPage: number) {
    switch(currentPage) { 
        case 1: { 
            let response = {
                navigation: {
                    page: 2, 
                    is_first_page: false,
                    is_last_page: false
                }, 
                data: ELEMENT_DATA_PAGE_2
            };
            return Promise.resolve(response);
        } 
        case 2: { 
            let response = {
                navigation: {
                    page: 3, 
                    is_first_page: false,
                    is_last_page: true
                }, 
                data: ELEMENT_DATA_PAGE_3
            };
            return Promise.resolve(response);
        } 
        case 3: { 
            let response = {
                navigation: {
                    page: 3, 
                    is_first_page: false,
                    is_last_page: true
                }, 
                data: ELEMENT_DATA_PAGE_3
            };
            return Promise.resolve(response);
        } 
        default: { 
            let response = {
                navigation: {
                    page: 3, 
                    is_first_page: false,
                    is_last_page: true
                }, 
                data: ELEMENT_DATA_PAGE_3
            };
            return Promise.resolve(response);
        } 
     } 

  }

  getChemicalElementsPreviousPage(currentPage: number) {
    switch(currentPage) { 
        case 1: { 
            let response = {
                navigation: {
                    page: 1, 
                    is_first_page: true,
                    is_last_page: false
                }, 
                data: ELEMENT_DATA_PAGE_1
            };
            return Promise.resolve(response);
        } 
        case 2: { 
            let response = {
                navigation: {
                    page: 1, 
                    is_first_page: true,
                    is_last_page: false
                }, 
                data: ELEMENT_DATA_PAGE_1
            };
            return Promise.resolve(response);
        } 
        case 3: { 
            let response = {
                navigation: {
                    page: 2, 
                    is_first_page: false,
                    is_last_page: false
                }, 
                data: ELEMENT_DATA_PAGE_2
            };
            return Promise.resolve(response);
        } 
        default: { 
            let response = {
                navigation: {
                    page: 1, 
                    is_first_page: true,
                    is_last_page: false
                }, 
                data: ELEMENT_DATA_PAGE_1
            };
            return Promise.resolve(response);
        } 
     } 
  }  

}