export const reviewTemplate = (user, articleId) => `
<ns1:review xmlns:art="https://github.com/XML-tim17/ScientificArticles/Article"
 xmlns:ns1="https://github.com/XML-tim17/ScientificArticles"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="https://github.com/XML-tim17/ScientificArticles ./../../Backend/resources/XMLSchemas/Review.xsd" judgment="accept">
    <ns1:article-id>${articleId}</ns1:article-id>
    <ns1:reviewer>
        <ns1:name>${user.name}</ns1:name>
        <ns1:institution>${user.institution}</ns1:institution>
        <ns1:phone-number>${user.phoneNumber}</ns1:phone-number>
        <ns1:email>${user.email}</ns1:email>
        <ns1:address>
            <ns1:city>${user.address.city}</ns1:city>
            <ns1:country>${user.address.country}</ns1:country>
        </ns1:address>
    </ns1:reviewer>
    <ns1:comments>
    </ns1:comments>
    <ns1:date>2020-01-01</ns1:date>
    <ns1:questionaire>
        <ns1:questions>
            <ns1:yes-no-question>
                <ns1:question-text>Da li je naslov rada dobro izabran?</ns1:question-text>
                <ns1:answer>Yes</ns1:answer>
            </ns1:yes-no-question>
            <ns1:yes-no-question>
                <ns1:question-text>Da li apstrakt sadrži prave podatke o radu?</ns1:question-text>
                <ns1:answer>Yes</ns1:answer>
            </ns1:yes-no-question>
            <ns1:yes-no-question>
                <ns1:question-text>Da li je uvod uspešno privukao Vašu pažnju (generalni koncept je dobro uveden i rad dobro motivisan, a
                    ciljevi rada eksplicitno navedeni)?</ns1:question-text>
                <ns1:answer>Yes</ns1:answer>
            </ns1:yes-no-question>
            <ns1:yes-no-question>
                <ns1:question-text> Da li je struktura rada adekvatna?</ns1:question-text>
                <ns1:answer>Yes</ns1:answer>
            </ns1:yes-no-question>
            <ns1:yes-no-question>
                <ns1:question-text>Da li je rad lak ili težak za čitanje?</ns1:question-text>
                <ns1:answer>Yes</ns1:answer>
            </ns1:yes-no-question>
            <ns1:question>
                <ns1:question-text>Da li je za razumevanje teksta potrebno predznanje i u kolikoj meri?</ns1:question-text>
                <ns1:answer>Insert answer here</ns1:answer>
            </ns1:question>
            <ns1:question>
                <ns1:question-text>Da li je terminologija korektna? Da li su autori demonstrirali poznavanje polja??</ns1:question-text>
                <ns1:answer>Insert answer here</ns1:answer>
            </ns1:question>
        </ns1:questions>
    </ns1:questionaire>
    <ns1:grade>10</ns1:grade>
</ns1:review>
`;