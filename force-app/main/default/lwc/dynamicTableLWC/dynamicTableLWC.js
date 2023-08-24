import { LightningElement, track, wire, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createQuote from '@salesforce/apex/OpportunityController.CreateQuote';
import getQuote from '@salesforce/apex/OpportunityController.getQuote';
import getQuoteLines from '@salesforce/apex/OpportunityController.getQuoteLines';
import saveQuote from '@salesforce/apex/OpportunityController.saveQuote';
import deleteQuote from '@salesforce/apex/OpportunityController.deleteQuote';
import createQuoteLines from '@salesforce/apex/OpportunityController.createQuoteLines';

export default class dynamicTableLWC extends NavigationMixin(LightningElement) {
hasquotelines;
QuoteId;
recordId;
Quote;
QuoteLines = [];
keyIndex = 0;
@track itemList = [
    {
        id: 0
    }
];

//pull request 3 test
addRow() {
    ++this.keyIndex;
    var newItem = [{ id: this.keyIndex }];
    this.itemList = this.itemList.concat(newItem);
}

removeRow(event) {
    if (this.itemList.length >= 2) {
        this.itemList = this.itemList.filter(function (element) {
			console.log(event.target.accessKey);
			console.log(element.id);
            return parseInt(element.id) !== parseInt(event.target.accessKey);
        });
    }
}

constructor(){
    super();
    if(true){
        this.recordId = 'a015j00000WTXTnAAP';
        getQuote({QuoteId : this.recordId})
                .then(result1 => {
                    this.Quote = result1;
                    
                    getQuoteLines({QuoteId : this.recordId})
                .then(result1 => {
                    alert(JSON.stringify(result1));
                    this.QuoteLines = result1;
                    if(this.QuoteLines){
                        this.hasquotelines = true;
                    }else{
                        this.hasquotelines = false;
                    }
                    alert(this.hasquotelines);
                    console.log('----result3----' ,JSON.stringify(this.QuoteLines));
                })
                .catch(error => {
                    
                    this.error = error;
                })
                })
                .catch(error => {
                    
                    this.error = error;
                })

    }else{
    console.log('----else-------');
    createQuote()                            
            .then(result => {
                this.QuoteId = result;
                
                getQuote({QuoteId : this.QuoteId})
                .then(result1 => {
                    this.Quote = result1;
                    this.hasquotelines = false;
                })
                .catch(error => {
                    this.error = error;
                })                
            })
            .catch(error => {
                this.error = error;
            })

        } 

}

handleSubmit() {
   
    saveQuote({Quote : this.Quote})
    .then(result1 => {
        console.log('-----result----- ' + JSON.stringify(result1));
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Contacts successfully created',
                variant: 'success',
            }),
        );
    })
    .catch(error => {
        this.error = error;
        console.log('-----error----- ' + JSON.stringify(error));
    })
    
    
}

deleteQuote(){
    console.log('----coming inside delete------ '+ JSON.stringify(this.Quote));
    deleteQuote({QuoteId : this.Quote.Id})
    .then(result1 => {
        console.log('-----result----- ' + JSON.stringify(result1));
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Quote Deleted',
                variant: 'success',
            }),
        );
    })
    .catch(error => {
        this.error = error;
        console.log('-----error----- ' + JSON.stringify(error));
    })
}

handleNewSubmit(event) {
    alert(this.QuoteId);
    this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
        alert('coming inside');
        element.submit();
    });

        //console.log('----itemlist------ '+ JSON.stringify(itemList));
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Contacts successfully created',
                variant: 'success',
            }),
        );
        // Navigate to the Account home page
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'home',
            },
        });
    
}


}