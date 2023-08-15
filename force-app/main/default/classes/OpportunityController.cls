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
    public static List<opportunity> CreateQuote(){  
      return [SELECT Id from quote where id =: QuoteId];  
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