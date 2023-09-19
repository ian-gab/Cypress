/// <reference types="cypress" />



describe('results entry by mdl#', () => {
    let text;
  
  
    it('open mdl# in qc view reqs', () => {
  
  
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
  
  
  
      //reflex tests
      cy.iframe('#Target_Frame').contains('tr', 'Mycoplasma genitalium Azithromycin Resistance by Pyrosequencing').find('td a').should('be.visible').click()
      cy.wait(7000)
      cy.iframe('#Target_Frame').find('#btn_AllNeg2').click()
      cy.wait(5000)
      //cy.iframe('#Target_Frame').find('#btn_Interpret').click()
      cy.iframe('#Target_Frame').should('be.visible').then($interpret => {
        if ($interpret.find('#btn_Interpret').is(':visible')) {
  
          cy.get('#Target_Frame').then(($iframe) => {
            const $body = $iframe.contents().find('#form1')
            const $win = $iframe[0].contentWindow
  
            cy.stub($win, 'confirm', () => true)
              .as('windowConfirm')
            cy.stub($win.console, 'log').as('consoleLog')
  
            cy.wrap($body)
              .find('#btn_Interpret').click().should(function () {
                expect(this.windowConfirm).to.be.calledWith('OK to Interpret?')
  
              })
          })
        }
      })
  
      cy.wait(3000)
      cy.iframe('#Target_Frame').find('#btn_Verified').click()
      cy.wait(6000)
      // cy.iframe('#Target_Frame').find('#btn_Ok').click()
      // cy.wait(4000)
      cy.iframe('#Target_Frame').should('be.visible').then($commentalert => {
        if ($commentalert.find('#btn_Ok').is(':visible')) {
  
          cy.get('#Target_Frame').then(($iframe) => {
            const $body = $iframe.contents().find('#form1')
            const $win = $iframe[0].contentWindow
  
            // cy.stub($win, 'alert').as('windowAlert')
            // cy.stub('window:alert').as('windowAlert1')
              
    

            cy.stub($win, 'alert').as('alertShown')
            cy.wrap($body)
              .find('#btn_Ok').click().should(function () {
                    expect(this.alertShown).to.be.calledWith('Alert! You may have to enter comment on the core test.')
      
                  })
            

            //cy.on($win, 'alert', $stub).as('windowAlert3')
    
            //cy.stub($win.console, 'log').as('consoleLog')
          
            // cy.wrap($body)
            //   .find('#btn_Ok').click().should(function () {
            //     //expect(this.windowAlert).to.be.calledWith('Alert! You may have to enter comment on the core test.')
  
            //   })
            // cy.stub($win, 'alert')
            //   .as('windowConfirm')
            // cy.stub($win.console, 'log').as('consoleLog')
  
            // cy.wrap($body)
            //   .find('#btn_Ok').click().should(function () {
            //     expect(this.windowConfirm).to.be.calledWith('Alert! You may have to enter comment on the core test.')
  
            //   })
          })
        }
      })
  
      cy.iframe('#Target_Frame').find('#lbl_Status').should('have.text', 'Verified')
      cy.iframe('#Target_Frame').find('#btn_Done2').click()
      cy.wait(5000)
  
  
      ///second reflex
      cy.iframe('#Target_Frame').contains('tr', 'Mycoplasma genitalium Fluoroquinolone Resistance by Pyrosequencing').find('td a').should('be.visible').click()
      cy.wait(7000)
      cy.iframe('#Target_Frame').find('#btn_AllNeg2').click()
      cy.wait(5000)
      //cy.iframe('#Target_Frame').find('#btn_Interpret').click()
      cy.iframe('#Target_Frame').should('be.visible').then($interpret => {
        if ($interpret.find('#btn_Interpret').is(':visible')) {
  
          cy.get('#Target_Frame').then(($iframe) => {
            const $body = $iframe.contents().find('#form1')
            const $win = $iframe[0].contentWindow
  
            cy.stub($win, 'confirm', () => true)
              .as('windowConfirm')
            cy.stub($win.console, 'log').as('consoleLog')
  
            cy.wrap($body)
              .find('#btn_Interpret').click().should(function () {
                expect(this.windowConfirm).to.be.calledWith('OK to Interpret?')
  
              })
          })
        }
      })
  
      cy.wait(3000)
      cy.iframe('#Target_Frame').find('#btn_Verified').click()
      cy.wait(4000)
      // cy.iframe('#Target_Frame').find('#btn_Ok').click()
      // cy.wait(4000)
  
      cy.iframe('#Target_Frame').should('be.visible').then($corecomment => {
        if ($corecomment.find('#btn_Ok').is(':visible')) {
  
          cy.get('#Target_Frame').then(($iframe) => {
            const $body = $iframe.contents().find('#form1')
            const $win = $iframe[0].contentWindow
  
            cy.stub($win, 'alert', () => true)
              .as('windowAlert')
            cy.stub($win.console, 'log').as('consoleLog')
  
            cy.wrap($body)
              .find('#btn_Ok').click().should(function () {
                
               // expect(this.windowAlert).to.be.calledWith('Alert! You may have to enter comment on the core test.')
  
              })
          })
        }
      })
  
  
      cy.iframe('#Target_Frame').find('#lbl_Status').should('have.text', 'Verified')
      cy.iframe('#Target_Frame').find('#btn_Done2').click()
      cy.wait(5000)
  
      //end
    })
  
  
  
  })
  