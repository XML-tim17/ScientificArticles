from flask import Flask, request, jsonify
import lxml.etree as ET
import urllib.parse

import os
import uuid

app = Flask(__name__)

@app.route('/xslt', methods=['POST'])
def hello():
    xmlString = request.get_json()['xmlString']
    xsltString = request.get_json()['xsltString']
    xmlParsed = ET.XML(xmlString.encode('utf-8'))
    xsltParsed = ET.XML(xsltString.encode('utf-8'))
    transformation = ET.XSLT(xsltParsed)
    transformed = transformation(xmlParsed)
    result = ET.tostring(transformed, pretty_print=True)
    print(result)
    return result

@app.route('/fop', methods=['POST'])
def fop():
    xmlString = request.get_json()['xmlString']
    xslString = request.get_json()['xslfoString']

    xmlFileName = str(uuid.uuid4().hex)
    xslFileName = str(uuid.uuid4().hex)
    pdfFileName = str(uuid.uuid4().hex)

    xmlFilePath = 'fop_folder\\' + xmlFileName + '.xml'
    xslFilePath = 'fop_folder\\' + xslFileName + '.xsl'
    pdfFilePath = 'fop_folder\\' + pdfFileName + '.pdf'
    
    xmlFile = open(xmlFilePath, encoding='utf-8', mode='w')
    xslFile = open(xslFilePath, encoding='utf-8', mode='w')

    xmlFile.write(xmlString)
    xslFile.write(xslString)

    xmlFile.close()
    xslFile.close()

    
    command = os.environ["FOP_CMD"] + '\\fop -xml ' + xmlFilePath + ' -xsl ' + xslFilePath + ' -pdf ' + pdfFilePath
    
    exitCode = os.system('cmd /c ' + command)
    print(exitCode)

    os.remove(xmlFilePath)
    os.remove(xslFilePath)

    try:
        pdfFile = open(pdfFilePath, mode='rb')
        pdfString = pdfFile.read()
        pdfFile.close()
        os.remove(pdfFilePath)
        return pdfString
    except:
        response = jsonify({'message': 'Failed conversion. Something went wrong :)'})
        response.status_code = 400
        return response

if __name__ == "__main__":
    app.run(debug=True)
