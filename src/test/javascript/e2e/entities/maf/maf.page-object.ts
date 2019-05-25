import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class MAFComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-maf div table .btn-danger'));
  title = element.all(by.css('jhi-maf div h2#page-heading span')).first();

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

export class MAFUpdatePage {
  pageTitle = element(by.id('jhi-maf-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  versionInput = element(by.id('field_version'));
  publieInput = element(by.id('field_publie'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setVersionInput(version) {
    await this.versionInput.sendKeys(version);
  }

  async getVersionInput() {
    return await this.versionInput.getAttribute('value');
  }

  getPublieInput(timeout?: number) {
    return this.publieInput;
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

export class MAFDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-mAF-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-mAF'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
