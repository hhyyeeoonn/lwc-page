import { LightningElement } from 'lwc';

export default class NaviComponent extends NavigationMixin(LightningElement) {

    namedPageRef;
    namedPageUrl;

    async connectedCallback() {
        let result = await getSearchList();
        console.log('result:', JSON.parse(JSON.stringify(result)));
        
        this.resultList = result;
        
        this.namedPageRef = {
            type : 'comm__namedPage',
            attributes : {
                name : 'cafe__c'
            },
        }

        
        // 페이지 이동하기 NavigationMixin.GenerateUrl : url 생성됨
        this[NavigationMixin.GenerateUrl](this.namedPageRef).then((url) => (this.namedPageUrl = url));
        console.log('this.namedPageUrl: ' + this.namedPageUrl);
    }

    // 페이지 이동하기 NavigationMixin.Navigate : 페이지로 이동
    navigateToCafePage() {
        this[NavigationMixin.Navigate]({
            type : 'comm__namedPage',
            attributes : {
                name : 'cafe__c'
            },
        });
    }

    clickCafe() {
        //location.href = this.namedPageUrl; 페이지가 새로고침됨
        this[NavigationMixin.Navigate](this.namedPageRef);

    }

}