import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProposalsNewController extends Controller {
  @tracked isModalOpen = false;
  @tracked currentStep = 1;
  @tracked activeTab = 'references';

   
  @action openModal() {
    this.isModalOpen = true;
    this.currentStep = 1;
  }

  @action closeModal() {
    this.isModalOpen = false;
  }

  @action nextStep() {
    this.currentStep++;
  }

  @action prevStep() {
    this.currentStep--;
  }
  @action setTab(tab) {
      this.activeTab = tab;
  }
}
