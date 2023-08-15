public with sharing class OpportunityController {  
    @AuraEnabled(cacheable=true)  
    public static List<opportunity> fetchOpportunityList(){  
      return [SELECT Id, Name, StageName,Amount From Opportunity LIMIT 100];  
    }  

    @AuraEnabled(cacheable=true)  
    public static List<opportunity> getAllQuoteLines(String QuoteId){  
      return [SELECT Id from quote where id =: QuoteId];  
    } 

    @AuraEnabled(cacheable=true)  
    public static Custom_quote__c CreateQuote(){  
      Custom_quote__c quote = new Custom_quote__c();
      quote.name__c = null;
      quote.status__c = 'New';
      insert quote;

      Custom_quote__c returnQuote = [SELECT Id,name,name__c from Custom_quote__c where id =: quote.id];  
      return returnQuote;
    } 

    @AuraEnabled(cacheable=true)  
    public static List<opportunity> updateQuote(String QuoteId){  
      return [SELECT Id from quote where id =: QuoteId];  
    }

    @AuraEnabled(cacheable=true)  
    public static List<opportunity> createQuoteLines(String QuoteId){  
      return [SELECT Id from quote where id =: QuoteId];  
    }

    @AuraEnabled(cacheable=true)  
    public static List<opportunity> deleteQuoteLine(String QuoteLineId){  
      return [SELECT Id from quote where id =: QuoteId];  
    }

    @AuraEnabled(cacheable=true)  
    public static List<opportunity> SubmitRequest(String QuoteId){  
      return [SELECT Id from quote where id =: QuoteId];  
    }
  }  