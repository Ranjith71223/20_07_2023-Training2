public with sharing class OpportunityController {  
    @AuraEnabled(cacheable=true)  
    public static List<opportunity> fetchOpportunityList(){  
      return [SELECT Id, Name, StageName,Amount From Opportunity LIMIT 100];  
    }  
    /*
    @AuraEnabled(cacheable=true)  
    public static List<opportunity> getAllQuoteLines(String QuoteId){  
      return [SELECT Id from quote where id =: QuoteId];  
    } */

    @AuraEnabled(cacheable=false)  
    public static String CreateQuote(){  
      Custom_quote__c quote = new Custom_quote__c();
      quote.name__c = null;
      quote.status__c = 'New';
      insert quote;

      Custom_quote__c returnQuote = [SELECT Id,name,name__c from Custom_quote__c where id =: quote.id];  
      return returnQuote.Id;
    } 

    @AuraEnabled(cacheable=true)  
    public static Custom_quote__c getQuote(String QuoteId){  
      Custom_quote__c returnQuote = [SELECT Id,Name,Name__c from Custom_quote__c where id =: QuoteId];  
      return returnQuote;
    } 

    @AuraEnabled(cacheable=true)  
    public static List<Custom_Quote_Line__c> getQuoteLines(String QuoteId){ 
      return [select Id,field1__c,field2__c,field3__c,Custom_Quote__c from Custom_Quote_Line__c where Custom_Quote__c =: QuoteId]; 
      
    }
    
    @AuraEnabled(cacheable=false)  
    public static String saveQuote(Custom_Quote__c Quote){  

       update Quote;
       
       return 'Success';
    }

    
    @AuraEnabled(cacheable=false)  
    public static String deleteQuote(String QuoteId){  
      
      delete [select Id,field1__c,field2__c,field3__c,Custom_Quote__c from Custom_Quote_Line__c where Custom_Quote__c =: QuoteId];
      
      delete [SELECT Id from Custom_Quote__c where id =: QuoteId];  
      return 'success';
    }

    /*@AuraEnabled(cacheable=true)  
    public static List<opportunity> SubmitRequest(String QuoteId){  
      return [SELECT Id from quote where id =: QuoteId];  
    }*/
  }  