import { LightningElement, wire, track } from "lwc";  
 import getOpportunities from "@salesforce/apex/OpportunityController.fetchOpportunityList";  
 const COLS = [  
  {  
   label: "Name",  
   fieldName: "recordLink",  
   type: "url",  
   typeAttributes: { label: { fieldName: "Name" }, tooltip:"Name", target: "_blank" }  
  },  
  { label: "Stage", fieldName: "StageName", type: "text" },  
  { label: "Amount", fieldName: "Amount", type: "currency" }  
 ];  
 export default class LWCTableWithHyperlink extends LightningElement {  
  cols = COLS;  
  error;  
  @track oppList = [];  
  @wire(getOpportunities)  
  getOppList({ error, data }) {  
   if (data) {  
    var tempOppList = [];  
    for (var i = 0; i < data.length; i++) {  
     let tempRecord = Object.assign({}, data[i]); 
     tempRecord.recordLink = "/" + tempRecord.Id;  
     tempOppList.push(tempRecord);  
    }  
    this.oppList = tempOppList;  
    this.error = undefined;  
   } else if (error) {  
    this.error = error;  
    this.oppList = undefined;  
   }  
  }  
 }  