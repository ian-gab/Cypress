/// <reference types="cypress" />



describe('test accessioning page', () => {
 let text;

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
        cy.iframe('#Target_Frame').find('#ddlb_Specimens_1').scrollTo('bottom')
        cy.iframe('#Target_Frame').find('#ddlb_Specimens_1').select('Swab').should('have.value', '2').type(`{enter}`)
       
        // cy.iframe('#Target_Frame').find('#ddlb_Specimens_1').each(function($ele, index, list){
        //     cy.log($ele.text())

        //     if($ele.text() === 'Swab'){
        //         cy.log("found swab")
        //     cy.wrap($ele).click()

        //     } else{
        //         cy.log("cant find swab")

        //         cy.iframe('#Target_Frame').xpath('//*[@id="ddlb_Specimens_1"]/option[30]').click()
        //     }

        // }
        // )

        cy.wait(1000)
        cy.iframe('#Target_Frame').find('#btn_HL7PendingOrdersCancel').then($el => {
            if ($el.is(':visible')) {
                cy.iframe('#Target_Frame').find('#btn_HL7PendingOrdersCancel').click()
            }
        })
       
      ////  cy.iframe('#Target_Frame').find('#txt_Specimen_1').click()
       ///// cy.iframe('#Target_Frame').find('#ddlb_Specimens_1').select('Swab').should('have.value', '2').type(`{enter}`)
       
       
        cy.wait(1000)
        cy.iframe('#Target_Frame').find('#Div3_1').click()

        const testcode = '759'
        cy.iframe('#Target_Frame').find('#Txt_TestCodeFast_1').click()
        cy.wait(2000)
        cy.iframe('#Target_Frame').find('#Txt_TestCodeFast_1').type(`${testcode}`)
        cy.iframe('#Target_Frame').find('#btn_AcceptTest_1').click()
        cy.wait(1000)

            cy.iframe('#Target_Frame').find('#ddlb_OnePID_1_1').click()
          cy.iframe('#Target_Frame').find('#imgb_M1_1').click()
        cy.iframe('#Target_Frame').find('#txt_Qty_1').type('1')
        cy.iframe('#Target_Frame').find('#btn_Save_1').click()
        cy.wait(4000)

       
        cy.iframe('#Target_Frame')
        .find('#lbl_MDLNumber')
        
        .then(($mdl) => {
          expect($mdl).to.have.length(1)
    
        })

    
        cy.iframe('#Target_Frame')
        .find('#lbl_MDLNumber').invoke('text')
        .then(text => {
            cy.log(text) //logs the text
             cy.wrap(text).as('txt')
          })

       
          
         
          cy.get('@txt').then(mdl =>{
            cy.log(mdl)
          })

          ///Pass CHVIC on the generated MDLnum by updating tblreqpcrs
        cy.get('@txt').then(($mdlnum) =>{

        const mdl = $mdlnum

            cy.task('queryDb', `UPDATE tblreqpcrs SET Txt_rMDLCHVICresult = '1' WHERE Guid_mdlnumber=` + mdl).then((result) => {
               expect(result.changedRows).to.equal(6)
            })
            cy.task('queryDb', `SELECT Txt_rMDLCHVICresult FROM tblreqpcrs WHERE Guid_mdlnumber=` + mdl).then((result) => {
                expect(result[0].Txt_rMDLCHVICresult).to.equal('1')
            })

            cy.task('queryDb', `UPDATE tblreqpcrs SET Guid_pcrsheetid = '78' WHERE Guid_testcode = 179 and Guid_mdlnumber=` + mdl).then((result) => {
                expect(result.changedRows).to.equal(1)
             })
             cy.task('queryDb', `UPDATE tblreqpcrs SET Guid_pcrsheetid = '71' WHERE Guid_testcode = 755 and Guid_mdlnumber=` + mdl).then((result) => {
                expect(result.changedRows).to.equal(1)
             })
             cy.task('queryDb', `UPDATE tblreqpcrs SET Guid_pcrsheetid = '72' WHERE Guid_testcode = 756 and Guid_mdlnumber=` + mdl).then((result) => {
                expect(result.changedRows).to.equal(1)
             })
             cy.task('queryDb', `UPDATE tblreqpcrs SET Guid_pcrsheetid = '73' WHERE Guid_testcode = 757 and Guid_mdlnumber=` + mdl).then((result) => {
                expect(result.changedRows).to.equal(1)
             })
             cy.task('queryDb', `UPDATE tblreqpcrs SET Guid_pcrsheetid = '74' WHERE Guid_testcode = 758 and Guid_mdlnumber=` + mdl).then((result) => {
                expect(result.changedRows).to.equal(1)
             })
             cy.task('queryDb', `UPDATE tblreqpcrs SET Guid_pcrsheetid = '75' WHERE Guid_testcode = 761 and Guid_mdlnumber=` + mdl).then((result) => {
                expect(result.changedRows).to.equal(1)
             })

            
        })
  
    })



})
