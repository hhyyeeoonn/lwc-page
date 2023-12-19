import { LightningElement, track } from 'lwc';

export default class LwcPage extends LightningElement {

    clickTab(e) {
        const $tabs = document.querySelectorAll('.tab__item');
        console.log(':::$tabs: ' + $tabs + ':::');
        let clickTabItem = [...e.currentTarget.parentElement.children];
        let clickTabItemIndex = clickTabItem.indexOf(e.currentTarget);

        console.log(':::clickTabItem: ' + clickTabItem + ', clickTabItemIndex: ' + clickTabItemIndex + ':::');

        for(let i = 0; i < $tabs.length; ++i) {
            if($tabs.contains('.slds-is-active')) {
                this.$tabs.remove('.slds-is-active');
                e.currentTarget.add('.slds-is-active');
            }
            break;
        }
    }


}