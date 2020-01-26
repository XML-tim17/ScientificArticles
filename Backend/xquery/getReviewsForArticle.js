module.exports.query = (articleId, version) => `
    xquery version "3.1";
    declare namespace ns1 = "https://github.com/XML-tim17/ScientificArticles";
    declare function local:getAllComments()
    {
    for $review in collection("/db/scientificArticles/reviews/")/ns1:review
        where $review/ns1:article-id = "article${articleId}/v${version}"
        return $review/ns1:comments/ns1:comment
    };
    declare function local:getAllQuestionaires()
    {
    for $review in collection("/db/scientificArticles/reviews/")/ns1:review
        where $review/ns1:article-id = "article${articleId}/v${version}"
        return $review/ns1:questionaire
    };
    declare function local:getAllGrades()
    {
    for $review in collection("/db/scientificArticles/reviews/")/ns1:review
        where $review/ns1:article-id = "article${articleId}/v${version}"
        return $review/ns1:grade
    };
    declare function local:getAllJudgments()
    {
    for $review in collection("/db/scientificArticles/reviews/")/ns1:review
        where $review/ns1:article-id = "article${articleId}/v${version}"
        return <ns1:judgment>{data($review//@judgment)}</ns1:judgment>
    };
    let $article := doc("/db/scientificArticles/articles/article${articleId}/v${version}.xml")/ns1:article
    return 
        <ns1:merged-reviews>
            {$article}
            <ns1:comments>
                {local:getAllComments()}
            </ns1:comments>
            <ns1:questionaires>
                {local:getAllQuestionaires()}
            </ns1:questionaires>
            <ns1:grades>
                {local:getAllGrades()}
            </ns1:grades>
            <ns1:judgments>
                {local:getAllJudgments()}
            </ns1:judgments>
        </ns1:merged-reviews>
    `;