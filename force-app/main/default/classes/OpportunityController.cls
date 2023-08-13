public with sharing class OpportunityController {  
    @AuraEnabled(cacheable=true)  
    public static List<opportunity> fetchOpportunityList(){  
      return [SELECT Id, Name, StageName,Amount From Opportunity LIMIT 100];  
    }  
  }  