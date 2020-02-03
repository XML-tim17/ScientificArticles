export const articleTemplate = `<ns1:article xmlns:vc="http://www.w3.org/2007/XMLSchema-versioning" xmlns:ns1="https://github.com/XML-tim17/ScientificArticles" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="https://github.com/XML-tim17/ScientificArticles ./../../Backend/resources/XMLSchemas/Article.xsd">
    <ns1:id>1</ns1:id>
    <ns1:title>Insert title here</ns1:title>
    <ns1:info>
        <ns1:authors>
            <ns1:corresponding-author>
                <ns1:name>Insert your name</ns1:name>
                <ns1:institution>Insert your institution</ns1:institution>
                <ns1:phone-number>Insert your number</ns1:phone-number>
                <ns1:email>Insert your email</ns1:email>
                <ns1:address>
                    <ns1:city>Insert your city</ns1:city>
                    <ns1:country>Insert your country</ns1:country>
                </ns1:address>
            </ns1:corresponding-author>
        </ns1:authors>
        <ns1:received>2020-01-01</ns1:received>
        <ns1:accepted>2020-01-01</ns1:accepted>
        <ns1:status>toBeReviewed</ns1:status>
    </ns1:info>
    <ns1:abstract>
        <ns1:keywords>
            <ns1:keyword>Insert first keyword</ns1:keyword>
        </ns1:keywords>
    </ns1:abstract>
    <ns1:content>
    </ns1:content>
    <ns1:references>
    </ns1:references>
</ns1:article>`;