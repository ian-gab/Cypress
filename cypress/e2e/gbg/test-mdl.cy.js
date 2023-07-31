/// <reference types="cypress" />



describe('test accessioning page', () => {
  it('create mdl#', () => {
      cy.visit('http://developers.mdlab.com:82/NewBvPanel/dmdltest', {
          auth: {
              username: 'ibulos',
              password: 'P4FaG2PAu6Li',
          },
      })
      const clientID = '10560'
      cy.get('#btn_OKpp', { timeout: 10000 })
          .should('be.visible')
          .and('contain', 'Continue')
          .click()
      cy.get('#rddlUserLocations')
          .select('NJH').should('have.value', '5990|1')
      cy.get('#btnSetLocation').click()
      cy.wait(900)
      cy.get('#TreeView2t78').click()
      cy.wait(900)
      cy.get('#TreeView2t90').click()
      cy.iframe('#Target_Frame')
          .find('#txt_ClientID').type(`${clientID}{enter}`)


      cy.iframe('#Target_Frame')
          .find('#ddl_ReqType').select('Client Requisitions').should('have.value', 'CL')

      cy.wait(2000)

      cy.iframe('#Target_Frame').find('#btn_HL7PendingOrdersCancel').then($el => {
          if ($el.is(':visible')) {
              cy.iframe('#Target_Frame').find('#btn_HL7PendingOrdersCancel').click()
          }
      })

      cy.iframe('#Target_Frame').find('#txt_Specimen_1').click()
      cy.iframe('#Target_Frame').find('#ddlb_Specimens_1').select('Swab').should('have.value', '2').type(`{enter}`)

      cy.iframe('#Target_Frame').find('#imgb_M1_1').click()
      cy.iframe('#Target_Frame').find('#Div3_1').click()

      const testcode = '141'
      cy.iframe('#Target_Frame').find('#Txt_TestCodeFast_1').type(`${testcode}{enter}`)
      cy.iframe('#Target_Frame').find('#btn_AcceptTest_1').click()

     
  })
})
