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
    public static List<Custom_Quote__c> getQuote(String QuoteId){  
      List<Custom_Quote__c> returnQuote = [SELECT Id,Name,Name__c,status__c from Custom_quote__c 
      where id =: QuoteId];  
      return returnQuote;
    } 

    @AuraEnabled(cacheable=true)  
    public static List<Custom_Quote_Line__c> getQuoteLines(String QuoteId){ 
      system.debug('quote id ----- '+ QuoteId);
      List<Custom_Quote_Line__c> lineList = [select Id,field1__c,field2__c,field3__c,Custom_Quote__c from Custom_Quote_Line__c 
      where Custom_Quote__c =: QuoteId]; 
      system.debug('lines ----- '+ lineList);
      return lineList;
    }

    @AuraEnabled
    public static void insertAccounts(String Name, String Id, String Website, String Phone) {
      if(id.startswith('001')){
        Account acc = new Account();
        acc.id = Id;
        acc.name = Name;
        acc.phone = Phone;
        acc.website = Website;
        update acc;
      }else{
        Account acc = new Account();
        acc.name = name;
        acc.phone = phone;
        acc.website = Website;
        acc.Industry = 'Chemicals';
        insert acc;
      }  
      
    }

    
    @AuraEnabled(cacheable=false)
    public static String deleteAccounts(String Id) {
      List<Account> accList = [SELECT Id,Name,Phone,Website from Account where Id =: Id];  
      delete accList;
      return 'Deleted';
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String Industry) {
      List<Account> accList = [SELECT Id,Name,Phone,Website from Account where Industry =: Industry];  
      return accList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsScreen1() {
      List<Account> accList = [SELECT Id,Name,Phone,Website from Account limit 10];  
      return accList;
    }
    
    @AuraEnabled(cacheable=false)  
    public static String saveQuote(Custom_Quote__c Quote){  

       update Quote;
       
       return 'Success';
    }

    @AuraEnabled(cacheable=true)  
    public static String createQuoteLines(String QuoteId, List<String> lineList){  

       system.debug('-----QuoteId----- ' + QuoteId);
       system.debug('-----lineList----- ' + lineList);
       return 'Success';
    }

    
    @AuraEnabled(cacheable=false)  
    public static String deleteQuote(String QuoteId){  
      system.debug('----- ' + QuoteId);
      delete [select Id,field1__c,field2__c,field3__c,Custom_Quote__c from Custom_Quote_Line__c where Custom_Quote__c =: QuoteId];
      
      delete [SELECT Id from Custom_Quote__c where id =: QuoteId];  
      return 'success';
    }

    /*@AuraEnabled(cacheable=true)  
    public static List<opportunity> SubmitRequest(String QuoteId){  
      return [SELECT Id from quote where id =: QuoteId];  
    }*/
  }  