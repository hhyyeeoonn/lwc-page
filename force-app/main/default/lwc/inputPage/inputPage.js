import { LightningElement, track } from 'lwc';

export default class InputPage extends LightningElement {
    @track tabs = [
        { label: 'Item One', value: 'tab__item-one', content: 'Item One Content' },
        { label: 'Item Two', value: 'tab__item-two', content: 'Item Two Content' },
        { label: 'Item Three', value: 'tab__item-three', content: 'Item Three Content' }
    ];

    selectedTab = 'tab__item-one';

    
    
    get tabItemClass() {
        return 'slds-tabs_default__item tab__items' + (this.selectedTab === this.item.value ? ' slds-is-active' : '');
    }

    get tabIndex() {
        return this.selectedTab === this.item.value ? '0' : '-1';
    }

    get isSelected() {
        return this.selectedTab === this.item.value ? 'true' : 'false';
    }

    get tabContentClass() {
        return 'slds-tabs_default__content' + (this.selectedTab === this.item.value ? ' slds-show' : ' slds-hide');
    }

    handleTabClick(event) {
        this.selectedTab = event.currentTarget.dataset.tabId;
    }
   
}

