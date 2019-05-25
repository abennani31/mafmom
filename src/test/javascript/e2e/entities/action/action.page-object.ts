import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ActionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-action div table .btn-danger'));
  title = element.all(by.css('jhi-action div h2#page-heading span')).first();

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

export class ActionUpdatePage {
  pageTitle = element(by.id('jhi-action-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  typeActionSelect = element(by.id('field_typeAction'));
  libelleActionInput = element(by.id('field_libelleAction'));
  contratSelect = element(by.id('field_contrat'));
  mAFHistorySelect = element(by.id('field_mAFHistory'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTypeActionSelect(typeAction) {
    await this.typeActionSelect.sendKeys(typeAction);
  }

  async getTypeActionSelect() {
    return await this.typeActionSelect.element(by.css('option:checked')).getText();
  }

  async typeActionSelectLastOption(timeout?: number) {
    await this.typeActionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setLibelleActionInput(libelleAction) {
    await this.libelleActionInput.sendKeys(libelleAction);
  }

  async getLibelleActionInput() {
    return await this.libelleActionInput.getAttribute('value');
  }

  async contratSelectLastOption(timeout?: number) {
    await this.contratSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async contratSelectOption(option) {
    await this.contratSelect.sendKeys(option);
  }

  getContratSelect(): ElementFinder {
    return this.contratSelect;
  }

  async getContratSelectedOption() {
    return await this.contratSelect.element(by.css('option:checked')).getText();
  }

  async mAFHistorySelectLastOption(timeout?: number) {
    await this.mAFHistorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mAFHistorySelectOption(option) {
    await this.mAFHistorySelect.sendKeys(option);
  }

  getMAFHistorySelect(): ElementFinder {
    return this.mAFHistorySelect;
  }

  async getMAFHistorySelectedOption() {
    return await this.mAFHistorySelect.element(by.css('option:checked')).getText();
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

export class ActionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-action-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-action'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
