/// <reference types="cypress" />



describe('results entry by mdl#', () => {
    let text;

   
       it('open mdl# in qc view reqs',  () => {
   
  
           cy.visit('http://developers.mdlab.com:82/NewBvPanel/dmdltest', {
               auth: {
                   username: 'ibulos',
                   password: 'P4FaG2PAu6Li',
               },
           })
   
           const mdlnum = '10089517'
           cy.get('#btn_OKpp', { timeout: 10000 })
               .should('be.visible')
               .and('contain', 'Continue')
               .click()
           cy.get('#rddlUserLocations')
               .select('NJH').should('have.value', '5990|1')
             
           cy.get('#btnSetLocation').click()
           cy.wait(1500)
           cy.get('#TreeView2t33').click()
           cy.get('#TreeView2t49').click()
           cy.wait(900)
           cy.iframe('#Target_Frame').find('#txt_MDLFrom').type(`${mdlnum}{enter}`)
           cy.wait(7000)


          
           cy.iframe('#Target_Frame').contains('tr', 'Lactobacillus (BV & AV Panel) by Real Time PCR').find('td a').click()
           
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
           
        cy.wait(7000)
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
        cy.iframe('#Target_Frame').then($ots => {
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
                return Math.floor(Math.random() * (max - min + 1) ) + min;
              }
              
              cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_1').select('Positive').should('have.value', 'P')
              cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_2').select('Positive').should('have.value', 'P')
              cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_3').select('Positive').should('have.value', 'P')
              cy.iframe('#Target_Frame').find('#ddlb_SubtypeResult_4').select('Positive').should('have.value', 'P')
              cy.iframe('#Target_Frame').find('#Concentration_1').type(getRndInteger(1000,20000))
              cy.iframe('#Target_Frame').find('#Concentration_2').type(getRndInteger(1000,20000))
              cy.iframe('#Target_Frame').find('#Concentration_3').type(getRndInteger(1000,20000))
              cy.iframe('#Target_Frame').find('#Concentration_4').type(getRndInteger(1000,20000))
              cy.iframe('#Target_Frame').find('#CTScore_1').type('90')
              cy.iframe('#Target_Frame').find('#CTScore_2').type('90')
              cy.iframe('#Target_Frame').find('#CTScore_3').type('90')
              cy.iframe('#Target_Frame').find('#CTScore_4').type('90')
            
              cy.iframe('#Target_Frame').find('#btn_Verified').click()
            cy.wait(2000)
            cy.iframe('#Target_Frame').find('#btn_Ok').click()
            cy.wait(2000)
            cy.iframe('#Target_Frame').find('#lbl_Status').should('have.text', 'Verified')
            
            

       })
   
   
   
   })
   