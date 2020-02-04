export const coverLetterTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<ns1:cover-letter xmlns:ns1="https://github.com/XML-tim17/ScientificArticles"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="https://github.com/XML-tim17/ScientificArticles ./../../coverLetter.xsd">
    <ns1:info>
        <ns1:author>
            <ns1:name>Insert your name</ns1:name>
            <ns1:institution>Insert your institution</ns1:institution>
            <ns1:phone-number>Insert your number</ns1:phone-number>
            <ns1:email>Insert your email</ns1:email>
            <ns1:address>
                <ns1:city>Insert your city</ns1:city>
                <ns1:country>Insert your country</ns1:country>
            </ns1:address>
        </ns1:author>
        <ns1:date>2020-01-01</ns1:date>
    </ns1:info>
    <ns1:content>
    </ns1:content>
    <ns1:signature>
        <ns1:image>Click to insert image</ns1:image>
        <ns1:name>Insert signature name</ns1:name>
        <ns1:title>Insert signature title</ns1:title>
        <ns1:institution>Insert signature institution</ns1:institution>
    </ns1:signature>
</ns1:cover-letter>
`;