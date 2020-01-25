
const axios = require('axios');
var fs = require('fs');


module.exports.transform = async (xmlString, xslfoString) => {
    try {
        res = await axios.post('http://localhost:5000/fop', {
            xmlString,
            xslfoString
        }, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        });
        // fs.writeFile("./resources/test.pdf", res.data, "binary",function(err) {
        //     if(err) {
        //         console.log(err);
        //         return false;
        //     } else {
        //         console.log('yes');
        //         return true;
        //     }
        // });

        return res.data;

    } catch (e) {
        console.log(e);
        throw new Error('xsl transformation error');
    }
}