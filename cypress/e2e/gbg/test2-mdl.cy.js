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

            
             cy.get('#TreeView2t33').click()
             cy.get('#TreeView2t49').click()
             cy.wait(900)
             cy.iframe('#Target_Frame').find('#txt_MDLFrom').type(`${mdl}{enter}`)
             cy.wait(7000)
         
         
         
             cy.iframe('#Target_Frame').contains('tr', 'Lactobacillus (BV & AV Panel)').find('td a').should('be.visible').click()
         
             // cy.iframe('#Target_Frame').find('#grid_Results').each(function($ele, index, list){
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
         
             //cy.wait(7000)
             //          cy.iframe('#Target_Frame').find('#btn_MapPCR').then($btn => {
         
             //             if ($btn.is(':visible')) {
             //         cy.wait(2000)
             //         cy.iframe('#Target_Frame').xpath('//*[@id="btn_MapPCR"]')
             //         .type("{enter}")
         
             //     cy.get('#Target_Frame')
             //     cy.on('window:alert', () => true)
         
             //     }
             // })
         
             // cy.enter('iframe[id="Target_Frame"]').then(getBody => {
         
             //     const body = getBody();
             //     const win = body.ownerDocument.window;
         
             //     cy.spy(win,'confirm').as('windowConfirm');   // spy not stub
         
             //     body.find('#btn_MapPCR')
             //       .click()
             //       .should(function () {
             //         expect(this.windowConfirm).to.be.calledWith('OK to Map Specimen to Fake PCR Sheet?')
             //       })
             //     }) 
             cy.iframe('#Target_Frame').should('be.visible').then($ots => {
               if ($ots.find('#btn_MapPCR').is(':visible')) {
         
         
         
                 cy.get('#Target_Frame').then(($iframe) => {
                   const $body = $iframe.contents().find('#form1')
                   const $win = $iframe[0].contentWindow
         
                   cy.stub($win, 'confirm', () => true)
                     .as('windowConfirm')
                   cy.stub($win.console, 'log').as('consoleLog')
         
                   cy.wrap($body)
                     .find('#btn_MapPCR').click().should(function () {
                       expect(this.windowConfirm).to.be.calledWith('OK to Map Specimen to Fake PCR Sheet?')
         
                     })
                 })
               }
             })
             cy.wait(5000)
             // cy.on($win, 'confirm', () => true)
             //   .as('windowConfirm')
             // cy.spy($win, 'confirm', (message) => {
             //             // Assert that the correct message was passed to the confirm method
             //             expect(message).to.equal('OK to Map Specimen to Fake PCR Sheet?');
         
             //             // Return a custom value to simulate the user clicking a button
             //             return true;
             //             });
             //   cy.iframe('#Target_Frame').xpath('//*[@id="btn_MapPCR"]')
             //  .type("{enter}")
         
         
         
         
             // cy.window().then((win) => {
             //     cy.stub(win, 'confirm').as('confirm').returns(true)
             //   })
         
         
             //cy.get('@confirm').should('have.been.calledOnce')
         
         
             // cy.wrap($body)
             //   .find('#btn_MapPCR').type("{enter}").should(function () {
             //     cy.once('window:confirm', str => {
             //         expect(str).to.equal(
             //           'OK to Map Specimen to Fake PCR Sheet?'
             //         );
             //         return true
             //       })
         
             //     //return true
             //     expect(this.windowConfirm).to.be.calledWith('OK to Map Specimen to Fake PCR Sheet?')
         
             //   })
         
         
             //    // Get the iframe element
             //         const $iframe = cy.get('#Target_Frame');
         
             //         cy.wait($iframe);
             //         // Get the content of the iframe
             //         const $body = $iframe.find('#form1')
         
             //         // Get the window object of the iframe
             //         const $win = $iframe[0].ownerDocument.window;
         
             //         // Listen for the `confirm` event
             //         cy.on($win, 'confirm', (message) => {
             //         // Assert that the correct message was passed to the confirm method
             //         expect(message).to.equal('Are you sure you want to submit your application?');
         
             //         // Return a custom value to simulate the user clicking a button
             //         return true;
             //         });
         
             //         // Click the button in the iframe that triggers the confirm popup
             //         cy.wrap($body)
             //         .find('#btn_MapPCR')
             //         .click()
             //         .should(function () {
             //             // Assert that the `confirm` event was emitted
             //             expect($win.confirm).to.have.been.calledWith('Are you sure you want to submit your application?');
         
             //             // Assert that the stub returned the expected value
             //             expect($win.confirm.returnValue).to.equal('OK');
             //         });
         
             function getRndInteger(min, max) {
               return Math.floor(Math.random() * (max - min + 1)) + min;
             }
         
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_1').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_2').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_3').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_4').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#Concentration_1').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#Concentration_2').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#Concentration_3').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#Concentration_4').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#CTScore_1').type('90')
             cy.iframe('#Target_Frame').find('#CTScore_2').type('90')
             cy.iframe('#Target_Frame').find('#CTScore_3').type('90')
             cy.iframe('#Target_Frame').find('#CTScore_4').type('90')
         
             cy.iframe('#Target_Frame').find('#btn_Verified').click()
             cy.wait(4000)
             cy.iframe('#Target_Frame').find('#btn_Ok').click()
             cy.wait(4000)
             cy.iframe('#Target_Frame').find('#lbl_Status').should('have.text', 'Verified')
             cy.iframe('#Target_Frame').find('#btn_Done2').click()
         
             cy.wait(5000)
         
         
         
             //       cy.iframe('#Target_Frame').should('be.visible').then($ots => {
             //         if ($ots.find('#btn_MapPCR').is(':visible')) {
         
             //     cy.get('#Target_Frame').then(($iframe) => {
             //         const $body = $iframe.contents().find('#form1')
             //         const $win = $iframe[0].contentWindow
         
             //         cy.stub($win, 'confirm', () => true)
             //           .as('windowConfirm')
             //         cy.stub($win.console, 'log').as('consoleLog')
         
             //         cy.wrap($body)
             //           .find('#btn_MapPCR').click().should(function () {
             //             expect(this.windowConfirm).to.be.calledWith('OK to Map Specimen to Fake PCR Sheet?')
         
             //           })
             //       })
             //     }
             // })
             //       cy.wait(5000)
         
             //test 755
             cy.iframe('#Target_Frame').contains('tr', 'BVPanelPCR1 (Mo.curtisii,B.fragilis, S.anginosus, Sn.sanguine)').find('td a').should('be.visible').click()
             cy.wait(5000)
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_1').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_2').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_3').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_4').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#Concentration_1').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#Concentration_2').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#Concentration_3').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#Concentration_4').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#CTScore_1').type('90')
             cy.iframe('#Target_Frame').find('#CTScore_2').type('90')
             cy.iframe('#Target_Frame').find('#CTScore_3').type('90')
             cy.iframe('#Target_Frame').find('#CTScore_4').type('90')
             //Click verify button
             cy.iframe('#Target_Frame').find('#btn_Verified').click()
             cy.wait(4000)
             cy.iframe('#Target_Frame').find('#btn_Ok').click()
             cy.wait(4000)
             cy.iframe('#Target_Frame').find('#lbl_Status').should('have.text', 'Verified')
             cy.iframe('#Target_Frame').find('#btn_Done2').click()
             cy.wait(5000)
         
         
             //test 756
             cy.iframe('#Target_Frame').contains('tr', 'BVPanelPCR2 (Avag, Mo.mulieris)').find('td a').should('be.visible').click()
             cy.wait(5000)
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_1').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_2').select('Positive').should('have.value', 'P')
            // cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_3').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#Concentration_1').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#Concentration_2').type(getRndInteger(1000, 20000))
           //  cy.iframe('#Target_Frame').find('#Concentration_3').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#CTScore_1').type('90')
             cy.iframe('#Target_Frame').find('#CTScore_2').type('90')
            // cy.iframe('#Target_Frame').find('#CTScore_3').type('90')
             //Click verify button
             cy.iframe('#Target_Frame').find('#btn_Verified').click()
             cy.wait(4000)
             cy.iframe('#Target_Frame').find('#btn_Ok').click()
             cy.wait(4000)
             cy.iframe('#Target_Frame').find('#lbl_Status').should('have.text', 'Verified')
             cy.iframe('#Target_Frame').find('#btn_Done2').click()
             cy.wait(5000)
         
         
             //test 757
             cy.iframe('#Target_Frame').contains('tr', 'BVPanelPCR3 (MegaType1, MegaType2)').find('td a').should('be.visible').click()
             cy.wait(5000)
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_1').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_2').select('Positive').should('have.value', 'P')
            // cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_3').select('Negative').should('have.value', 'N')
             //cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_4').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#Concentration_1').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#Concentration_2').type(getRndInteger(1000, 20000))
            // cy.iframe('#Target_Frame').find('#Concentration_3').type('0')
            // cy.iframe('#Target_Frame').find('#Concentration_4').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#CTScore_1').type('90')
             cy.iframe('#Target_Frame').find('#CTScore_2').type('90')
            // cy.iframe('#Target_Frame').find('#CTScore_3').type('0')
            // cy.iframe('#Target_Frame').find('#CTScore_4').type('90')
             //Click verify button
             cy.iframe('#Target_Frame').find('#btn_Verified').click()
             cy.wait(4000)
             cy.iframe('#Target_Frame').find('#btn_Ok').click()
             cy.wait(4000)
             cy.iframe('#Target_Frame').find('#lbl_Status').should('have.text', 'Verified')
             cy.iframe('#Target_Frame').find('#btn_Done2').click()
             cy.wait(5000)
         
             //test 758
             cy.iframe('#Target_Frame').contains('tr', 'BVPanelPCR4 (Gvag, BifBreve, L.acidophilus, PrevBivia)').find('td a').should('be.visible').click()
             cy.wait(5000)
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_1').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_2').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_3').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_4').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#Concentration_1').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#Concentration_2').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#Concentration_3').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#Concentration_4').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#CTScore_1').type('90')
             cy.iframe('#Target_Frame').find('#CTScore_2').type('90')
             cy.iframe('#Target_Frame').find('#CTScore_3').type('0')
             cy.iframe('#Target_Frame').find('#CTScore_4').type('90')
             //Click verify button
             cy.iframe('#Target_Frame').find('#btn_Verified').click()
             cy.wait(4000)
             cy.iframe('#Target_Frame').find('#btn_Ok').click()
             cy.wait(4000)
             cy.iframe('#Target_Frame').find('#lbl_Status').should('have.text', 'Verified')
             cy.iframe('#Target_Frame').find('#btn_Done2').click()
             cy.wait(5000)
         
             //test 761
             cy.iframe('#Target_Frame').contains('tr', 'BVAB PCR (BVAB1, BVAB2, BVAB3)').find('td a').should('be.visible').click()
             cy.wait(5000)
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_1').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_2').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_3').select('Positive').should('have.value', 'P')
             cy.iframe('#Target_Frame').find('#Concentration_1').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#Concentration_2').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#Concentration_3').type(getRndInteger(1000, 20000))
             cy.iframe('#Target_Frame').find('#CTScore_1').type('90')
             cy.iframe('#Target_Frame').find('#CTScore_2').type('90')
             cy.iframe('#Target_Frame').find('#CTScore_3').type('90')
             //Click verify button
             cy.iframe('#Target_Frame').find('#btn_Verified').click()
             cy.wait(4000)
             cy.iframe('#Target_Frame').find('#btn_Ok').click()
             cy.wait(4000)
             cy.iframe('#Target_Frame').find('#lbl_Status').should('have.text', 'Verified')
             cy.iframe('#Target_Frame').find('#btn_Done2').click()
             cy.wait(5000)
         
           
         
             //end

            
        })
  
    })

///latest 09/19/2023

})
