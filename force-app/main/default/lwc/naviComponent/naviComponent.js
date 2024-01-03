import { LightningElement } from 'lwc'
import { NavigationMixin } from 'lightning/navigation';

export default class NaviComponent extends NavigationMixin(LightningElement) {

    namedPageRef;
    namedPageUrl;

    async connectedCallback() {
    
        this.namedPageRef = {
            type : 'comm__namedPage',
            attributes : {
                name : 'PickList__c'
            },
        }

        
        // 페이지 이동하기 NavigationMixin.GenerateUrl : url 생성됨
        this[NavigationMixin.GenerateUrl](this.namedPageRef).then((url) => (this.namedPageUrl = url));
        console.log('this.namedPageUrl: ' + this.namedPageUrl);
    }

    // 페이지 이동하기 NavigationMixin.Navigate : 페이지로 이동
    navigateToInput() {
        this[NavigationMixin.Navigate]({
            type : 'comm__namedPage',
            attributes : {
                name : 'Home'
            },
        });
    }

    clickPickList() {
        //location.href = this.namedPageUrl; 페이지가 새로고침됨
        this[NavigationMixin.Navigate](this.namedPageRef);

    }

}