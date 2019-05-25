/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContratComponentsPage, ContratDeleteDialog, ContratUpdatePage } from './contrat.page-object';

const expect = chai.expect;

describe('Contrat e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contratUpdatePage: ContratUpdatePage;
  let contratComponentsPage: ContratComponentsPage;
  let contratDeleteDialog: ContratDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Contrats', async () => {
    await navBarPage.goToEntity('contrat');
    contratComponentsPage = new ContratComponentsPage();
    await browser.wait(ec.visibilityOf(contratComponentsPage.title), 5000);
    expect(await contratComponentsPage.getTitle()).to.eq('mafmomApp.contrat.home.title');
  });

  it('should load create Contrat page', async () => {
    await contratComponentsPage.clickOnCreateButton();
    contratUpdatePage = new ContratUpdatePage();
    expect(await contratUpdatePage.getPageTitle()).to.eq('mafmomApp.contrat.home.createOrEditLabel');
    await contratUpdatePage.cancel();
  });

  it('should create and save Contrats', async () => {
    const nbButtonsBeforeCreate = await contratComponentsPage.countDeleteButtons();

    await contratComponentsPage.clickOnCreateButton();
    await promise.all([
      contratUpdatePage.setQueueNameInput('queueName'),
      contratUpdatePage.setDateDemandeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      contratUpdatePage.etatQueueSelectLastOption(),
      contratUpdatePage.mAFSelectLastOption()
    ]);
    expect(await contratUpdatePage.getQueueNameInput()).to.eq('queueName', 'Expected QueueName value to be equals to queueName');
    expect(await contratUpdatePage.getDateDemandeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDemande value to be equals to 2000-12-31'
    );
    await contratUpdatePage.save();
    expect(await contratUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await contratComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Contrat', async () => {
    const nbButtonsBeforeDelete = await contratComponentsPage.countDeleteButtons();
    await contratComponentsPage.clickOnLastDeleteButton();

    contratDeleteDialog = new ContratDeleteDialog();
    expect(await contratDeleteDialog.getDialogTitle()).to.eq('mafmomApp.contrat.delete.question');
    await contratDeleteDialog.clickOnConfirmButton();

    expect(await contratComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
