/// <reference types="cypress" />

it('Update pass CHVIC on the generated MDL#', function () {
    cy.task('queryDb', `UPDATE tblreqpcrs SET Txt_rMDLCHVICresult = '1' WHERE Guid_mdlnumber=10089511`).then((result) => {
       /// expect(result.changedRows).to.equal(1)
    })
    cy.task('queryDb', `SELECT Txt_rMDLCHVICresult FROM tblreqpcrs WHERE Guid_mdlnumber=10089511`).then((result) => {
        expect(result[0].Txt_rMDLCHVICresult).to.equal('1')
    })
})