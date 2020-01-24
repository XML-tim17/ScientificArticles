from flask import Flask, request, jsonify
import lxml.etree as ET
import urllib.parse

import os

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
    xsltString = request.get_json()['xslfoString']
    print(os.environ)
    return None
    
if __name__ == "__main__":
    app.run(debug=True)