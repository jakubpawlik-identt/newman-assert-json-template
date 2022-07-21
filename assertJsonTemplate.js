(function () {
    var chai = require("chai");

    chai.use(function(chai, _) {
        chai.Assertion.addMethod('equalRespectingEmpty', function(value, field_name) {
            var obj = this._obj;
            this.assert(value === null ? [null, ""].indexOf(obj) !== -1 : value === obj, `check response data (${field_name})`);
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
                pm.expect(jsonData[k]).to.eql(assertData[k]);
            };
        });
    };
}) ();
