export const reviewTemplate = `
<ns1:review xmlns:art="https://github.com/XML-tim17/ScientificArticles/Article"
 xmlns:ns1="https://github.com/XML-tim17/ScientificArticles"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="https://github.com/XML-tim17/ScientificArticles ./../../Backend/resources/XMLSchemas/Review.xsd" judgment="accept">
    <ns1:article-id>article14/v2</ns1:article-id>
    <ns1:reviewer>
        <ns1:name>Insert your name</ns1:name>
        <ns1:institution>Insert your institution</ns1:institution>
        <ns1:phone-number>Insert your number</ns1:phone-number>
        <ns1:email>Insert your email</ns1:email>
        <ns1:address>
            <ns1:city>Insert your city</ns1:city>
            <ns1:country>Insert your country</ns1:country>
        </ns1:address>
    </ns1:reviewer>
    <ns1:comments>
    </ns1:comments>
    <ns1:date>2020-01-01</ns1:date>
    <ns1:questionaire>
        <ns1:questions>
            <ns1:yes-no-question>
                <ns1:question-text>Je l Vam se dopao rad?</ns1:question-text>
                <ns1:answer>Yes</ns1:answer>
            </ns1:yes-no-question>
            <ns1:yes-no-question>
                <ns1:question-text>Je l Vas je rad intelektualno uzbudio?</ns1:question-text>
                <ns1:answer>Yes</ns1:answer>
            </ns1:yes-no-question>
            <ns1:question>
                <ns1:question-text>Opišite svoje osećanje dok ste čitali rad!</ns1:question-text>
                <ns1:answer>
                    Pera je bio vaistinu <ns1:bold>UZBUĐEN</ns1:bold> i <ns1:bold><ns1:italic>USHIĆEN</ns1:italic></ns1:bold>!
                    <ns1:formule>2 + 2 = 9</ns1:formule>
                </ns1:answer>
            </ns1:question>
        </ns1:questions>
    </ns1:questionaire>
    <ns1:grade>10</ns1:grade>
</ns1:review>


`;