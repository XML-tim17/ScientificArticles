export const reviewXSLT = `    
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ns1="https://github.com/XML-tim17/ScientificArticles"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    version="2.0">
    <xsl:template match="ns1:review">
                 <div class="review-view-article">
                    <table class="review-view-content">
                        <tr>
                            <td>
                                <table class="review-view-content">
                                    <tr>
                                        <td>
                                            <h2>Grades: </h2>
                                            <xsl:for-each select="./ns1:grades/ns1:grade">
                                                    <span font-size="18pt"
                                                            line-height="21pt"
                                                            font-family="serif"><xsl:value-of select="./text()"></xsl:value-of>&#160;&#160;
                                                    </span>
                                            </xsl:for-each>           
                                        </td>
                                           
                                        <td align="right">
                                            
                                            <h2>Judgments: </h2>
                                            <xsl:for-each select="./ns1:judgments/ns1:judgment">
                                                    <span font-size="18pt"
                                                            line-height="21pt"
                                                            font-family="serif"><xsl:value-of select="./text()"></xsl:value-of>&#160;&#160;
                                                    </span>
                                            </xsl:for-each> 
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <xsl:apply-templates/>

                        <tr>
                            <td>
                                
                                <hr/>
                                <hr/>
                                <h2>Questionaire:</h2>
                                <div class="review-view-questionaire">
                                    <xsl:for-each select="./ns1:questionaires/ns1:questionaire">
                                        <xsl:for-each select="./ns1:questions/ns1:yes-no-question">
                                            <h3><xsl:value-of select="./ns1:question-text/text()"></xsl:value-of></h3>
                                            <p class="review-view-margin review-view-block review-view-lp30"><xsl:apply-templates/></p>
                                        </xsl:for-each>
                                        
                                        <xsl:for-each select="./ns1:questions/ns1:question">
                                            <h3><xsl:value-of select="./ns1:question-text/text()"></xsl:value-of></h3>
                                            <p class="review-view-margin review-view-block review-view-lp30"><xsl:apply-templates/></p>
                                        </xsl:for-each>
                                        <hr/>
                                    </xsl:for-each>
                                </div>
                            </td>
                        </tr>
                        
                    </table>
                </div>
    </xsl:template
</xsl:stylesheet>`