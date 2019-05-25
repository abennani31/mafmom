/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MAFComponentsPage, MAFDeleteDialog, MAFUpdatePage } from './maf.page-object';

const expect = chai.expect;

describe('MAF e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mAFUpdatePage: MAFUpdatePage;
  let mAFComponentsPage: MAFComponentsPage;
  let mAFDeleteDialog: MAFDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MAFS', async () => {
    await navBarPage.goToEntity('maf');
    mAFComponentsPage = new MAFComponentsPage();
    await browser.wait(ec.visibilityOf(mAFComponentsPage.title), 5000);
    expect(await mAFComponentsPage.getTitle()).to.eq('mafmomApp.mAF.home.title');
  });

  it('should load create MAF page', async () => {
    await mAFComponentsPage.clickOnCreateButton();
    mAFUpdatePage = new MAFUpdatePage();
    expect(await mAFUpdatePage.getPageTitle()).to.eq('mafmomApp.mAF.home.createOrEditLabel');
    await mAFUpdatePage.cancel();
  });

  it('should create and save MAFS', async () => {
    const nbButtonsBeforeCreate = await mAFComponentsPage.countDeleteButtons();

    await mAFComponentsPage.clickOnCreateButton();
    await promise.all([mAFUpdatePage.setVersionInput('version')]);
    expect(await mAFUpdatePage.getVersionInput()).to.eq('version', 'Expected Version value to be equals to version');
    const selectedPublie = mAFUpdatePage.getPublieInput();
    if (await selectedPublie.isSelected()) {
      await mAFUpdatePage.getPublieInput().click();
      expect(await mAFUpdatePage.getPublieInput().isSelected(), 'Expected publie not to be selected').to.be.false;
    } else {
      await mAFUpdatePage.getPublieInput().click();
      expect(await mAFUpdatePage.getPublieInput().isSelected(), 'Expected publie to be selected').to.be.true;
    }
    await mAFUpdatePage.save();
    expect(await mAFUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await mAFComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MAF', async () => {
    const nbButtonsBeforeDelete = await mAFComponentsPage.countDeleteButtons();
    await mAFComponentsPage.clickOnLastDeleteButton();

    mAFDeleteDialog = new MAFDeleteDialog();
    expect(await mAFDeleteDialog.getDialogTitle()).to.eq('mafmomApp.mAF.delete.question');
    await mAFDeleteDialog.clickOnConfirmButton();

    expect(await mAFComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
