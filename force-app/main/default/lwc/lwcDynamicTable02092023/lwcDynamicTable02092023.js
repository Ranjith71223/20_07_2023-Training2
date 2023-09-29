import {LightningElement, track, wire, api} from 'lwc';

import deleteAccounts from '@salesforce/apex/OpportunityController.deleteAccounts'
import getAccounts from '@salesforce/apex/OpportunityController.getAccounts'
import insertAccounts from '@salesforce/apex/OpportunityController.insertAccounts'
import {ShowToastEvent} from "lightning/platformShowToastEvent";
import getQuote from '@salesforce/apex/OpportunityController.getQuote';
import getQuoteLines from '@salesforce/apex/OpportunityController.getQuoteLines';

export default class LwcDynamicTable02092023 extends LightningElement {
    @api recordId;
    QuoteId
    QuoteName;
    QuoteComment;
    @track listOfAccounts;
    
        connectedCallback() {
            
            this.initData();
        }
    
        initData() {
            let listOfAccounts = [];
            this.recordId = 'Chemicals';
            
            if(this.recordId){
                //this.QuoteId = this.recordId;
                //do another call to get Quote 
                //and then call getQuoteline apex method to get all lines
                /*getQuote({QuoteId : this.recordId})
                    .then(resultQuote => {
                        this.QuoteComment = resultQuote[0].comment__c;
                        this.QuoteName = resultQuote[0].Name__c;
                    })
                    .catch(error =>{

                    })*/
                getAccounts({Industry : this.recordId})
                    .then(result1 => {
                        
                        this.createinitialRows(listOfAccounts, result1, true);

                    })
                    .catch(error => {
                        
                        this.error = error;
                        console('----e1- ' , JSON.stringify(error));
                    })
            }else{
                console.log('---inside if2-----');
                this.createinitialRows(listOfAccounts, null, false);
            }
            
        }

        SendEmailandSubmitforApproval{
            
        }
    
        createinitialRows(listOfAccounts, result , hasData) {
            let accountObject = {};
            if(hasData){
                console.log('---inside if-----');
                result.forEach((element, index, fullArray) => {
                accountObject = [];
                       
                accountObject.index = index;
                accountObject.Id = element.Id;
                accountObject.Name = element.Name;
                accountObject.Website = element.Website;
                accountObject.Phone = element.Phone;
                listOfAccounts.push(accountObject);
                }); 
            }else{
                console.log('---inside else-----');
                accountObject.index = 0;
                accountObject.Id = 0;
                accountObject.Name = null;
                accountObject.Website = null;
                accountObject.Phone = null;
                listOfAccounts.push(accountObject);
                
            }
            this.listOfAccounts = listOfAccounts;

        }

        createRow(listOfAccounts) {
            let accountObject = {};
            if(listOfAccounts.length > 0) {
                accountObject.index = listOfAccounts[listOfAccounts.length - 1].index + 1;
            } else {
                accountObject.index = 0;
            }
            accountObject.Name = null;
            accountObject.Website = null;
            accountObject.Phone = null;
            listOfAccounts.push(accountObject);
        }
    
    
        /**
         * Adds a new row
         */
        addNewRow() {

            this.createRow(this.listOfAccounts);
        }

        removeRowOriginal(event) {
            let toBeDeletedRowIndex = event.target.name;
            let listOfAccounts = [];
            for(let i = 0; i < this.listOfAccounts.length; i++) {
                let tempRecord = Object.assign({}, this.listOfAccounts[i]); //cloning object
                if(tempRecord.index !== toBeDeletedRowIndex) {
                    listOfAccounts.push(tempRecord);
                }
            }
            for(let i = 0; i < listOfAccounts.length; i++) {
                listOfAccounts[i].index = i + 1;
            }
            this.listOfAccounts = listOfAccounts;
        }
    
        /**
         * Removes the selected row
         */
        removeRow(event) {
            
            
            let toBeDeletedRowIndex = event.target.name;
            let toBeDeletedRowid = event.target.value;
            if(toBeDeletedRowid.startsWith("001")){
                deleteAccounts({
                    Id: toBeDeletedRowIndex
                })
                    .then(data => {
                        this.initData();
                        let event = new ShowToastEvent({
                            message: "Accounts deleted successfully!",
                            variant: "success",
                            duration: 2000
                        });
                        this.dispatchEvent(event); 
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    this.removeRowOriginal(event);
            }else{
                this.removeRowOriginal(event);
            }
             
        }
    
        /**
         * Removes all rows
         */
        removeAllRows() {
            let listOfAccounts = [];
            this.createRow(listOfAccounts);
            this.listOfAccounts = listOfAccounts;
        }
    
        handleInputChange(event) {
            let index = event.target.dataset.id;
            let fieldName = event.target.name;
            let value = event.target.value;
            
            //console.log('coming inside create account',JSON.stringify(this.listOfAccounts));
            
            for(let i = 0; i < this.listOfAccounts.length; i++) {

                
                if(this.listOfAccounts[i].index === parseInt(index)) {


                    this.listOfAccounts[i][fieldName] = value;  
                    console.log('---1--- ' , this.listOfAccounts[i][fieldName]); 
                    console.log('---2--- ' , value);
                    console.log('---3--- ' , JSON.stringify(this.listOfAccounts));
                }
            }
        }
    
        createAccounts() {
            

            for(let i = 0; i < this.listOfAccounts.length; i++) {

            // pass quote ID also  and in apex if quoteid null then create quote record
            // and then create quotelines. If not just create/update quotelines    
            insertAccounts({
                Name: this.listOfAccounts[i].Name,
                Id: this.listOfAccounts[i].Id,
                Website: this.listOfAccounts[i].Website,
                Phone: this.listOfAccounts[i].Phone 
            })
                .then(data => {
                    
                })
                .catch(error => {
                    console.log(error);
                });
            }
                this.initData();
                    let event = new ShowToastEvent({
                        message: "Accounts successfully created!",
                        variant: "success",
                        duration: 2000
                    });
                    this.dispatchEvent(event);
        }
    
    }