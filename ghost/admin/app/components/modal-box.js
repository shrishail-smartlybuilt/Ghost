import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ModalBoxComponent extends Component {
    @action
    handleClose() {
        if (this.args.onClose) {
            this.args.onClose();
        }
    }
}
