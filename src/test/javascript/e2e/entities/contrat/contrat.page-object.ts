import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ContratComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-contrat div table .btn-danger'));
  title = element.all(by.css('jhi-contrat div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ContratUpdatePage {
  pageTitle = element(by.id('jhi-contrat-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  queueNameInput = element(by.id('field_queueName'));
  dateDemandeInput = element(by.id('field_dateDemande'));
  etatQueueSelect = element(by.id('field_etatQueue'));
  mAFSelect = element(by.id('field_mAF'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setQueueNameInput(queueName) {
    await this.queueNameInput.sendKeys(queueName);
  }

  async getQueueNameInput() {
    return await this.queueNameInput.getAttribute('value');
  }

  async setDateDemandeInput(dateDemande) {
    await this.dateDemandeInput.sendKeys(dateDemande);
  }

  async getDateDemandeInput() {
    return await this.dateDemandeInput.getAttribute('value');
  }

  async setEtatQueueSelect(etatQueue) {
    await this.etatQueueSelect.sendKeys(etatQueue);
  }

  async getEtatQueueSelect() {
    return await this.etatQueueSelect.element(by.css('option:checked')).getText();
  }

  async etatQueueSelectLastOption(timeout?: number) {
    await this.etatQueueSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mAFSelectLastOption(timeout?: number) {
    await this.mAFSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mAFSelectOption(option) {
    await this.mAFSelect.sendKeys(option);
  }

  getMAFSelect(): ElementFinder {
    return this.mAFSelect;
  }

  async getMAFSelectedOption() {
    return await this.mAFSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ContratDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-contrat-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-contrat'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
