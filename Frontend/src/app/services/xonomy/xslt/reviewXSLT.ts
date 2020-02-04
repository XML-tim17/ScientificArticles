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
                                    <tr><td colspan="2" align="center">Date: <xsl:value-of select="./ns1:date"></xsl:value-of></td></tr>
                                    <tr>
                                        <td>
                                            <h2>Grade: </h2>
                                            <xsl:value-of select="./ns1:grade">
                                                    <span font-size="18pt"
                                                            line-height="21pt"
                                                            font-family="serif"><xsl:value-of select="./text()"></xsl:value-of>&#160;&#160;
                                                    </span>
                                            </xsl:value-of>           
                                        </td>
                                           
                                        <td align="right">
                                            
                                            <h2>Judgment: </h2>
                                            <xsl:value-of select="./@judgment">
                                                    <span font-size="18pt"
                                                            line-height="21pt"
                                                            font-family="serif"><xsl:value-of select="./text()"></xsl:value-of>&#160;&#160;
                                                    </span>
                                            </xsl:value-of> 
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center">
                                <h4><xsl:value-of select="./ns1:reviewer/ns1:name"></xsl:value-of></h4>
                                <p><xsl:value-of select="./ns1:reviewer/ns1:email"></xsl:value-of></p>
                                <p><xsl:value-of select="./ns1:reviewer/ns1:institution"></xsl:value-of></p>
                                <p><xsl:value-of select="./ns1:reviewer/ns1:address/ns1:city"></xsl:value-of>, <xsl:value-of select="./ns1:reviewer/ns1:address/ns1:country"></xsl:value-of></p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <hr/>
                                <h2>Comments:</h2>
                                <div class="review-view-questionaire">
                                    <xsl:for-each select="./ns1:comments">
                                        <xsl:for-each select="./ns1:comment">
                                            <h3><xsl:value-of select="./@reference-id"></xsl:value-of>: </h3>
                                            <p class="review-view-margin review-view-block review-view-lp30"><xsl:value-of select="./text()"/></p>
                                        </xsl:for-each>
                                    </xsl:for-each>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <hr/>
                                <h2>Questionaire:</h2>
                                <div class="review-view-questionaire">
                                    <xsl:for-each select="./ns1:questionaire">
                                        <xsl:for-each select="./ns1:questions/ns1:yes-no-question">
                                            <h3><xsl:value-of select="./ns1:question-text/text()"></xsl:value-of></h3>
                                            <p class="review-view-margin review-view-block review-view-lp30"><xsl:value-of select="./ns1:answer"/></p>
                                        </xsl:for-each>
                                        
                                        <xsl:for-each select="./ns1:questions/ns1:question">
                                            <h3><xsl:value-of select="./ns1:question-text/text()"></xsl:value-of></h3>
                                            <p class="review-view-margin review-view-block review-view-lp30"><xsl:value-of select="./ns1:answer"/></p>
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