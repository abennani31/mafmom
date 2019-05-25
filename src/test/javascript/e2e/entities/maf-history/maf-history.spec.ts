/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MAFHistoryComponentsPage, MAFHistoryDeleteDialog, MAFHistoryUpdatePage } from './maf-history.page-object';

const expect = chai.expect;

describe('MAFHistory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mAFHistoryUpdatePage: MAFHistoryUpdatePage;
  let mAFHistoryComponentsPage: MAFHistoryComponentsPage;
  let mAFHistoryDeleteDialog: MAFHistoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MAFHistories', async () => {
    await navBarPage.goToEntity('maf-history');
    mAFHistoryComponentsPage = new MAFHistoryComponentsPage();
    await browser.wait(ec.visibilityOf(mAFHistoryComponentsPage.title), 5000);
    expect(await mAFHistoryComponentsPage.getTitle()).to.eq('mafmomApp.mAFHistory.home.title');
  });

  it('should load create MAFHistory page', async () => {
    await mAFHistoryComponentsPage.clickOnCreateButton();
    mAFHistoryUpdatePage = new MAFHistoryUpdatePage();
    expect(await mAFHistoryUpdatePage.getPageTitle()).to.eq('mafmomApp.mAFHistory.home.createOrEditLabel');
    await mAFHistoryUpdatePage.cancel();
  });

  it('should create and save MAFHistories', async () => {
    const nbButtonsBeforeCreate = await mAFHistoryComponentsPage.countDeleteButtons();

    await mAFHistoryComponentsPage.clickOnCreateButton();
    await promise.all([
      mAFHistoryUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      mAFHistoryUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);
    expect(await mAFHistoryUpdatePage.getStartDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startDate value to be equals to 2000-12-31'
    );
    expect(await mAFHistoryUpdatePage.getEndDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected endDate value to be equals to 2000-12-31'
    );
    await mAFHistoryUpdatePage.save();
    expect(await mAFHistoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await mAFHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MAFHistory', async () => {
    const nbButtonsBeforeDelete = await mAFHistoryComponentsPage.countDeleteButtons();
    await mAFHistoryComponentsPage.clickOnLastDeleteButton();

    mAFHistoryDeleteDialog = new MAFHistoryDeleteDialog();
    expect(await mAFHistoryDeleteDialog.getDialogTitle()).to.eq('mafmomApp.mAFHistory.delete.question');
    await mAFHistoryDeleteDialog.clickOnConfirmButton();

    expect(await mAFHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
