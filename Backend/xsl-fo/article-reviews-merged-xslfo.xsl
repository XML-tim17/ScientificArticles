<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:ns1="https://github.com/XML-tim17/ScientificArticles"
    xmlns:fo="http://www.w3.org/1999/XSL/Format" version="2.0">
    
    <xsl:template match="ns1:merged-reviews">
        <fo:root font-family="Josefin Sans">
            <fo:layout-master-set>
                <fo:simple-page-master master-name="article-page">
                    <fo:region-body margin="0.75in"/>
                </fo:simple-page-master>
            </fo:layout-master-set>
            
            <fo:page-sequence master-reference="article-page">
                <fo:flow flow-name="xsl-region-body">
                    <fo:table table-layout="fixed" inline-progression-dimension="100%">
                        <fo:table-body>
                            <fo:table-row background-color="#e0e0e0">
                                <fo:table-cell padding-start="3pt"
                                                padding-end="3pt"
                                                padding-before="3pt"
                                                padding-after="3pt">
                                    <fo:block font-size="21pt"
                                                    line-height="24pt"
                                                    keep-with-next="always"
                                                    space-after="14pt"
                                                    font-family="serif">Grades: </fo:block>
                                                    <fo:block>
                                    <xsl:for-each select="./ns1:grades/ns1:grade">
                                                    <fo:inline font-size="18pt"
                                                            line-height="21pt"
                                                            font-family="serif"><xsl:value-of select="./text()"></xsl:value-of><xsl:text></xsl:text>&#160;&#160;</fo:inline>
                                    </xsl:for-each>           </fo:block>    
                                         
                                </fo:table-cell>     
                                <fo:table-cell text-align="right">
                                    <fo:block font-size="21pt"
                                                    line-height="24pt"
                                                    keep-with-next="always"
                                                    space-after="14pt"
                                                    font-family="serif">Judgments: </fo:block>
                                                    <fo:block>
                                    <xsl:for-each select="./ns1:judgments/ns1:judgment">
                                                    <fo:inline font-size="18pt"
                                                            line-height="21pt"
                                                            font-family="serif">&#160;&#160;<xsl:value-of select="./text()"></xsl:value-of></fo:inline>
                                    </xsl:for-each>          </fo:block>             
                                </fo:table-cell>
                            </fo:table-row>
                            <fo:table-row>
                                <fo:table-cell number-columns-spanned="2">
                                    <fo:block space-after="80pt"
                                                line-height="21pt">
                                        <fo:leader leader-pattern="rule"
                                                    leader-length.maximum="100%"
                                                    leader-length.optimum="100%"/></fo:block>   
                                </fo:table-cell>
                            </fo:table-row>
                            <xsl:apply-templates/>
                            <fo:table-row break-before="page">
                                <fo:table-cell padding-start="3pt"
                                                padding-end="3pt"
                                                padding-before="3pt"
                                                padding-after="3pt"
                                                number-columns-spanned="2">
                            <fo:block font-size="21pt"
                                                    line-height="24pt"
                                                    keep-with-next="always"
                                                    space-after="14pt"
                                                    font-family="serif">Questionaires: </fo:block>
                            

                            <fo:block>
                                <xsl:for-each select="./ns1:questionaires/ns1:questionaire">
                                        <xsl:for-each select="./ns1:questions/ns1:yes-no-question">
                                            <fo:block font-size="18pt"
                                                    line-height="21pt"
                                                    keep-with-next="always"
                                                    space-after="12pt"
                                                    font-family="serif"><xsl:value-of select="./ns1:question-text/text()"></xsl:value-of></fo:block>
                                            
                                            <fo:block font-size="12pt" line-height="15pt" space-after="12pt">
                                            
                                                <xsl:apply-templates/>
                                                <fo:block>
                                                <fo:leader leader-pattern="rule"
                                                            leader-length.maximum="100%"
                                                            leader-length.optimum="100%"/>
                                            </fo:block>
                                            </fo:block>
                                        </xsl:for-each>
                                        
                                        <xsl:for-each select="./ns1:questions/ns1:question">
                                            <fo:block font-size="18pt"
                                                    line-height="21pt"
                                                    keep-with-next="always"
                                                    space-after="12pt"
                                                    font-family="serif"><xsl:value-of select="./ns1:question-text/text()"></xsl:value-of></fo:block>
                                            
                                            <fo:block font-size="12pt" line-height="15pt" space-after="12pt">
                                            
                                                <xsl:apply-templates/>
                                                <fo:block>
                                                <fo:leader leader-pattern="rule"
                                                            leader-length.maximum="100%"
                                                            leader-length.optimum="100%"/>
                                            </fo:block>
                                            </fo:block>
                                        </xsl:for-each>
                                        <hr/>
                                    </xsl:for-each>
                            </fo:block>
                                </fo:table-cell>
                            </fo:table-row>
                            
                        </fo:table-body>
                    </fo:table>
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
    </xsl:template>

    <xsl:template match="ns1:article/ns1:title">
        <fo:table-row>
            <fo:table-cell padding-start="3pt"
                        padding-end="3pt"
                        padding-before="3pt"
                        padding-after="3pt"
                        number-columns-spanned="2">
            <fo:block text-align="center">
                <fo:block font-size="28pt"
                            line-height="32pt"
                            keep-with-next="always"
                            space-after="22pt"
                            >
                            <xsl:apply-templates/>
                </fo:block>
            </fo:block>
            </fo:table-cell>
        </fo:table-row>
    </xsl:template>


    <xsl:template match="ns1:article/ns1:info">
    <fo:table-row break-after="page">
        <fo:table-cell padding-start="3pt"
                       padding-end="3pt"
                       padding-before="3pt"
                       padding-after="3pt"
                       number-columns-spanned="2">
           <fo:block text-align="center">
               
              <fo:block>
                <fo:leader leader-pattern="rule"
                           leader-length.maximum="100%"
                           leader-length.optimum="100%"/>
             </fo:block>
              <fo:table table-layout="fixed" inline-progression-dimension="100%">
                 <fo:table-body>
                    <fo:table-row>
                       <fo:table-cell padding-start="3pt"
                                      padding-end="3pt"
                                      padding-before="3pt"
                                      padding-after="3pt">
                          <fo:block text-align="center">
                                <fo:block font-size="18pt"
                                       line-height="21pt"
                                       keep-with-next="always"
                                       space-after="12pt"
                                       >
                                       <xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:name"></xsl:value-of>
                                </fo:block>
                             <fo:block font-size="12pt" line-height="15pt" space-after="12pt"><xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:email"></xsl:value-of></fo:block>
                             <fo:block font-size="12pt" line-height="15pt" space-after="12pt"><xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:institution"></xsl:value-of></fo:block>
                             <fo:block font-size="12pt" line-height="15pt" space-after="12pt"><xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:address/ns1:city"></xsl:value-of>, <xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:address/ns1:country"></xsl:value-of></fo:block>
                          </fo:block>
                          
                            <fo:block>
                                <fo:leader leader-pattern="rule"
                                            leader-length.maximum="100%"
                                            leader-length.optimum="100%"/>
                            </fo:block>
                       </fo:table-cell>
                       
                        </fo:table-row>
                       <xsl:for-each select="./ns1:authors/ns1:author">
                       
                        <fo:table-row>
                       <fo:table-cell padding-start="3pt"
                                    padding-end="3pt"
                                    padding-before="3pt"
                                    padding-after="3pt">
                        <fo:block text-align="center">
                                <fo:block font-size="18pt"
                                        line-height="21pt"
                                        keep-with-next="always"
                                        space-after="12pt"
                                        >
                                        <xsl:value-of select="ns1:name"></xsl:value-of>
                                </fo:block>
                            <fo:block font-size="12pt" line-height="15pt" space-after="12pt"><xsl:value-of select="ns1:email"></xsl:value-of></fo:block>
                            <fo:block font-size="12pt" line-height="15pt" space-after="12pt"><xsl:value-of select="ns1:institution"></xsl:value-of></fo:block>
                            <fo:block font-size="12pt" line-height="15pt" space-after="12pt"><xsl:value-of select="ns1:address/ns1:city"></xsl:value-of>, <xsl:value-of select="ns1:address/ns1:country"></xsl:value-of></fo:block>
                        </fo:block>
                        
                        <fo:block>
                        <fo:leader leader-pattern="rule"
                                    leader-length.maximum="100%"
                                    leader-length.optimum="100%"/>
                    </fo:block>
                        </fo:table-cell>
                        
                        </fo:table-row>
                        </xsl:for-each>
                 </fo:table-body>
              </fo:table>
              
           </fo:block>
        </fo:table-cell>
     </fo:table-row>
    </xsl:template>


    <xsl:template match="ns1:abstract">
        <fo:table-row>
            <fo:table-cell padding-start="3pt"
                                 padding-end="3pt"
                                 padding-before="3pt"
                                 padding-after="3pt"
                                 number-columns-spanned="2">
                <fo:block text-align="start">
                    <fo:block font-size="12pt" line-height="15pt" space-after="12pt">
                           <fo:inline font-weight="bold">Abstract: </fo:inline>
                           <xsl:apply-templates/>
                    </fo:block>
                </fo:block>
            </fo:table-cell>
        </fo:table-row>
        <tr>
            <td align="left">
                <div class="margin-big">
                    <p><b>Abstract: </b> </p>
                </div>
            </td>
        </tr>
    </xsl:template>

    <xsl:template match="ns1:content">
        <fo:table-row>
            <fo:table-cell padding-start="3pt"
                                 padding-end="3pt"
                                 padding-before="3pt"
                                 padding-after="3pt"
                                 number-columns-spanned="2">
                <fo:block text-align="start">
                    <xsl:apply-templates/>
                </fo:block>
            </fo:table-cell>
        </fo:table-row>
    </xsl:template>

    <xsl:template match="ns1:section/ns1:title"/>

    <xsl:template match="ns1:section[@level='0']">
        <xsl:variable name="id" select="@ns1:id"/>
        <xsl:if test="count(//ns1:comment[@reference-id=$id])>0">
            <xsl:for-each select="//ns1:comment[@reference-id=$id]">
                <fo:block background-color="#FFFF99"
                        padding="5pt"
                        border="0.1mm solid black"
                        margin="10pt">
                    <xsl:value-of select="./text()"></xsl:value-of>
                </fo:block>
            </xsl:for-each>
        </xsl:if>
        <fo:block font-size="24pt"
                                  line-height="28pt"
                                  keep-with-next="always"
                                  space-after="18pt"
                                  font-family="serif"><xsl:value-of select="./ns1:title"></xsl:value-of></fo:block>
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="ns1:section[@level='1']">
        <xsl:variable name="id" select="@ns1:id"/>
        <xsl:if test="count(//ns1:comment[@reference-id=$id])>0">
            <xsl:for-each select="//ns1:comment[@reference-id=$id]">
                <fo:block background-color="#FFFF99"
                        padding="5pt"
                        border="0.1mm solid black"
                        margin="10pt">
                    <xsl:value-of select="./text()"></xsl:value-of>
                </fo:block>
            </xsl:for-each>
        </xsl:if>
        <fo:block font-size="21pt"
                                  line-height="24pt"
                                  keep-with-next="always"
                                  space-after="14pt"
                                  font-family="serif"><xsl:value-of select="./ns1:title"></xsl:value-of></fo:block>
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="ns1:section[@level='2']">
        <xsl:variable name="id" select="@ns1:id"/>
        <xsl:if test="count(//ns1:comment[@reference-id=$id])>0">
            <xsl:for-each select="//ns1:comment[@reference-id=$id]">
                <fo:block background-color="#FFFF99"
                        padding="5pt"
                        border="0.1mm solid black"
                        margin="10pt">
                    <xsl:value-of select="./text()"></xsl:value-of>
                </fo:block>
            </xsl:for-each>
        </xsl:if>
        <fo:block font-size="18pt"
                                  line-height="21pt"
                                  keep-with-next="always"
                                  space-after="12pt"
                                  font-family="serif"><xsl:value-of select="./ns1:title"></xsl:value-of></fo:block>
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="ns1:section[@level='3']">
        <xsl:variable name="id" select="@ns1:id"/>
        <xsl:if test="count(//ns1:comment[@reference-id=$id])>0">
            <xsl:for-each select="//ns1:comment[@reference-id=$id]">
                <fo:block background-color="#FFFF99"
                        padding="5pt"
                        border="0.1mm solid black"
                        margin="10pt">
                    <xsl:value-of select="./text()"></xsl:value-of>
                </fo:block>
            </xsl:for-each>
        </xsl:if>
        <fo:block font-size="16pt"
                                  line-height="19pt"
                                  keep-with-next="always"
                                  space-after="12pt"
                                  font-family="serif"><xsl:value-of select="./ns1:title"></xsl:value-of></fo:block>
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="ns1:section[not(@level='0' or @level='1' or @level='2' or @level='3')]">
        <xsl:variable name="id" select="@ns1:id"/>
        <xsl:if test="count(//ns1:comment[@reference-id=$id])>0">
            <xsl:for-each select="//ns1:comment[@reference-id=$id]">
                <fo:block background-color="#FFFF99"
                        padding="5pt"
                        border="0.1mm solid black"
                        margin="10pt">
                    <xsl:value-of select="./text()"></xsl:value-of>
                </fo:block>
            </xsl:for-each>
        </xsl:if>    
        <fo:block font-size="14pt"
                                  line-height="17pt"
                                  keep-with-next="always"
                                  space-after="12pt"
                                  font-family="serif"><xsl:value-of select="./ns1:title"></xsl:value-of></fo:block>
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="ns1:table">
        <xsl:variable name="id" select="@ns1:id"/>
        <xsl:if test="count(//ns1:comment[@reference-id=$id])>0">
            <xsl:for-each select="//ns1:comment[@reference-id=$id]">
                <fo:block background-color="#FFFF99"
                        padding="5pt"
                        border="0.1mm solid black"
                        margin="10pt">
                    <xsl:value-of select="./text()"></xsl:value-of>
                </fo:block>
            </xsl:for-each>
        </xsl:if>

        <fo:table table-layout="fixed" margin-top="40px" inline-progression-dimension="100%">
            <fo:table-body>
                <xsl:for-each select="./ns1:tr">
                    <fo:table-row>
                        <xsl:for-each select="./ns1:td">
                            <fo:table-cell border="0.1mm solid black" 
                                            padding-start="3pt"
                                            padding-end="3pt"
                                            padding-before="3pt"
                                            padding-after="3pt">
                                <fo:block text-align="start">
                                    <xsl:apply-templates/>
                                <!-- maybe bug -->
                                </fo:block>
                            </fo:table-cell>
                        </xsl:for-each>
                    </fo:table-row>
                </xsl:for-each>
            </fo:table-body>
        </fo:table>
    </xsl:template>

    <xsl:template match="ns1:list">
        <fo:block margin-top="40px">
            <xsl:variable name="id" select="@ns1:id"/>
            <xsl:if test="count(//ns1:comment[@reference-id=$id])>0">
                <xsl:for-each select="//ns1:comment[@reference-id=$id]">
                    <fo:block background-color="#FFFF99"
                            padding="5pt"
                            border="0.1mm solid black"
                            margin="10pt">
                        <xsl:value-of select="./text()"></xsl:value-of>
                    </fo:block>
                </xsl:for-each>
            </xsl:if>
    
            <fo:list-block>
                    <xsl:for-each select="./ns1:item">
                        <fo:list-item>
                            <fo:list-item-label>
                                <fo:block>*</fo:block>
                            </fo:list-item-label>
                            <fo:list-item-body>
                                <fo:block>
                                    &#160;&#160;&#160;&#160;<xsl:apply-templates/>
                                </fo:block>
                            </fo:list-item-body>
                        </fo:list-item>
                    </xsl:for-each>
            </fo:list-block>
        </fo:block>
        
    </xsl:template>

    <xsl:template match="ns1:references">
        <fo:table-row>
            <fo:table-cell padding-start="3pt"
                                 padding-end="3pt"
                                 padding-before="3pt"
                                 padding-after="3pt"
                                 number-columns-spanned="2">
                <fo:block text-align="start">
                    <fo:block font-size="21pt"
                                line-height="24pt"
                                keep-with-next="always"
                                space-after="14pt"
                                font-family="serif">
                    References: 
                    </fo:block>

                    <xsl:for-each select="./ns1:reference">
                        <xsl:variable name="count" select="position()"/>
                        <fo:block font-size="12pt" line-height="15pt" space-after="12pt">
                           <fo:inline font-weight="bold"><xsl:value-of select="count"></xsl:value-of>. </fo:inline>
                           <xsl:for-each select="./ns1:referencedAuthors/ns1:referencedAuthor">
                                <xsl:value-of select="./ns1:name"></xsl:value-of>, 
                            </xsl:for-each>
                            (<xsl:value-of select="./ns1:publication-date"></xsl:value-of>). 
                            <xsl:value-of select="./ns1:title"></xsl:value-of>,
                            <xsl:value-of select="./ns1:publisher/ns1:institution"></xsl:value-of>,
                            <xsl:value-of select="/ns1:publisher/ns1:city"></xsl:value-of>
                        </fo:block>
                    </xsl:for-each>
                </fo:block>
            </fo:table-cell>
        </fo:table-row>
    </xsl:template>

    <xsl:template match="ns1:figure">
        <xsl:variable name="id" select="@ns1:id"/>
        <xsl:if test="count(//ns1:comment[@reference-id=$id])>0">
            <xsl:for-each select="//ns1:comment[@reference-id=$id]">
                <fo:block background-color="#FFFF99"
                        padding="5pt"
                        border="0.1mm solid black"
                        margin="10pt">
                    <xsl:value-of select="./text()"></xsl:value-of>
                </fo:block>
            </xsl:for-each>
        </xsl:if>

        <fo:table table-layout="fixed" inline-progression-dimension="100%">
            <fo:table-body>
                <fo:table-row>
                    <fo:table-cell
                                    padding-start="3pt"
                                    padding-end="3pt"
                                    padding-before="3pt"
                                    padding-after="3pt">
                        <fo:block text-align="center">
                            <fo:block space-after="12pt">
                                <fo:external-graphic>
                                    <xsl:attribute name="src">
                                        data:image/png;base64, <xsl:value-of select="./ns1:image"></xsl:value-of>
                                    </xsl:attribute>
                                </fo:external-graphic>
                            </fo:block>
                        </fo:block>
                    </fo:table-cell>
                </fo:table-row>
                <fo:table-row>
                    <fo:table-cell  border="0.1mm solid black" 
                                    padding-start="3pt"
                                    padding-end="3pt"
                                    padding-before="3pt"
                                    padding-after="3pt">
                        <fo:block text-align="center">
                            <fo:block font-size="12pt" line-height="15pt" space-after="12pt">
                                <xsl:value-of select="./@title"></xsl:value-of>
                            </fo:block>
                        </fo:block>
                    </fo:table-cell>
                </fo:table-row>
            </fo:table-body>
        </fo:table>
    </xsl:template>

    <xsl:template match="ns1:paragraph">
        <fo:block font-size="12pt" line-height="15pt" space-after="12pt">
            <xsl:apply-templates/>
        </fo:block>
    </xsl:template>

    <xsl:template match="ns1:quote">
        <xsl:variable name="id" select="@ns1:id"/>
        <xsl:if test="count(//ns1:comment[@reference-id=$id])>0">
            <xsl:for-each select="//ns1:comment[@reference-id=$id]">
                <fo:inline background-color="#FFFF99"
                        padding="5pt"
                        border="0.1mm solid black"
                        margin="10pt">
                    <xsl:value-of select="./text()"></xsl:value-of>
                </fo:inline>
            </xsl:for-each>
        </xsl:if>
        "<xsl:apply-templates/>"
    </xsl:template>

    <xsl:template match="ns1:bold">
        <fo:inline font-weight="bold"><xsl:apply-templates/></fo:inline>
    </xsl:template>

    <xsl:template match="ns1:italic">
        <fo:inline font-weight="italic"><xsl:apply-templates/></fo:inline>
    </xsl:template>

    <xsl:template match="ns1:underline">
        <fo:inline font-weight="underline"><xsl:apply-templates/></fo:inline>
    </xsl:template>

    <xsl:template match="ns1:ref">
        <fo:basic-link color="blue">
            <xsl:attribute name="external-destination"><xsl:apply-templates/></xsl:attribute>
            <xsl:apply-templates/>
        </fo:basic-link>
    </xsl:template>

    <xsl:template match="ns1:keywords">
        <fo:block font-size="12pt" line-height="15pt" space-after="12pt">
            Keywords: 
            <xsl:for-each select="./ns1:keyword">
            <fo:inline font-weight="bold"><xsl:apply-templates/></fo:inline>, 
            </xsl:for-each>
        </fo:block>
        
    </xsl:template>

    

    <xsl:template match="ns1:comments"/>

    <xsl:template match="ns1:question-text"/>

    <xsl:template match="ns1:questionaires"/>
        

    <xsl:output method="xml" encoding="UTF-8" indent="yes" omit-xml-declaration="yes"/>
</xsl:stylesheet>

