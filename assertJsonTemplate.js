(function () {
    var chai = require("chai");

    chai.use(function(chai, _) {
        chai.Assertion.addMethod('equalRespectingEmpty', function(value, field_name) {
            const obj = this._obj;
            const allowedEmptyValues = [null, ''];
            const is_equal = value === obj;

            this.assert(!is_equal ? allowedEmptyValues.includes(value) && allowedEmptyValues.includes(obj) : is_equal, `Check response data ${field_name}, expected ${obj} to deeply equal ${value}`);
        });
    });  
    
    return (responseData, assertData) => {
        const documentKeys = Object.keys(assertData);
        const jsonData = responseData;
        documentKeys.forEach(k => {
            if (typeof assertData[k] === 'object' && assertData[k] !== null ) {
                const innerKeys = Object.keys(assertData[k]).filter(ik => ik !== null);
                innerKeys.forEach(ik => pm.expect(jsonData[k][ik]).to.be.a.equalRespectingEmpty(assertData[k][ik], `${k}.${ik}`));
            } else {
                pm.expect(jsonData[k]).to.be.a.equalRespectingEmpty(assertData[k], `${k}`);
            };
        });
    };
}) ();
