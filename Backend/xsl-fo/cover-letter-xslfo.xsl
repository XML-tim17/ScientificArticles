<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:ns1="https://github.com/XML-tim17/ScientificArticles"
    xmlns:fo="http://www.w3.org/1999/XSL/Format" version="2.0">
    
    <xsl:template match="ns1:cover-letter">
        <fo:root font-family="Josefin Sans">
            <fo:layout-master-set>
                <fo:simple-page-master master-name="coverletter-page">
                    <fo:region-body margin="0.75in"/>
                </fo:simple-page-master>
            </fo:layout-master-set>
            
            <fo:page-sequence master-reference="coverletter-page">
                <fo:flow flow-name="xsl-region-body">
                    <fo:table table-layout="fixed" inline-progression-dimension="100%">
                        <fo:table-body>
                            <fo:table-row>
                                <fo:table-cell padding-start="3pt"
                                            padding-end="3pt"
                                            padding-before="3pt"
                                            padding-after="3pt">
                                <fo:block text-align="center">
                                    <fo:block font-size="28pt"
                                                line-height="32pt"
                                                keep-with-next="always"
                                                space-after="22pt"
                                                >
                                                Cover letter
                                    </fo:block>
                                </fo:block>
                                </fo:table-cell>
                            </fo:table-row>
                            <xsl:apply-templates/>
                        </fo:table-body>
                    </fo:table>
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
    </xsl:template>

    <xsl:template match="ns1:cover-letter/ns1:info">
    <fo:table-row>
        <fo:table-cell padding-start="3pt"
                       padding-end="3pt"
                       padding-before="3pt"
                       padding-after="3pt">
           <fo:block text-align="center">
               
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
                                <fo:block font-size="12pt" line-height="15pt" space-after="12pt"><xsl:value-of select="./ns1:author/ns1:name"></xsl:value-of></fo:block>
                             <fo:block font-size="12pt" line-height="15pt" space-after="12pt"><xsl:value-of select="./ns1:author/ns1:email"></xsl:value-of></fo:block>
                             <fo:block font-size="12pt" line-height="15pt" space-after="12pt"><xsl:value-of select="./ns1:author/ns1:institution"></xsl:value-of></fo:block>
                             <fo:block font-size="12pt" line-height="15pt" space-after="12pt"><xsl:value-of select="./ns1:author/ns1:address/ns1:city"></xsl:value-of>, <xsl:value-of select="./ns1:author/ns1:address/ns1:country"></xsl:value-of></fo:block>
                          </fo:block>
                          
                            <fo:block>
                                <fo:leader leader-pattern="rule"
                                            leader-length.maximum="100%"
                                            leader-length.optimum="100%"/>
                            </fo:block>
                       </fo:table-cell>
                       
                        </fo:table-row>
                 </fo:table-body>
              </fo:table>
              
           </fo:block>
        </fo:table-cell>
     </fo:table-row>
    </xsl:template>


    <xsl:template match="ns1:content">
        <fo:table-row>
            <fo:table-cell padding-start="3pt"
                                 padding-end="3pt"
                                 padding-before="3pt"
                                 padding-after="3pt">
                <fo:block text-align="start">
                    <xsl:apply-templates/>
                </fo:block>
            </fo:table-cell>
        </fo:table-row>
    </xsl:template>

    <xsl:template match="ns1:list">
        <fo:block margin-top="40px">
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

    <xsl:template match="ns1:signature">
        <fo:table-row>
            <fo:table-cell>
                <fo:table table-layout="fixed" inline-progression-dimension="100%">
                    <fo:table-body>
                        <fo:table-row>
                            <fo:table-cell
                                            padding-start="3pt"
                                            padding-end="3pt"
                                            padding-before="3pt"
                                            padding-after="3pt">
                                <fo:block text-align="left">
                                    <fo:block>
                                        <fo:leader leader-pattern="rule"
                                                leader-length.maximum="100%"
                                                leader-length.optimum="100%"/>
                                    </fo:block>
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
                            <fo:table-cell
                                            padding-start="3pt"
                                            padding-end="3pt"
                                            padding-before="3pt"
                                            padding-after="3pt">
                                <fo:block text-align="left">
                                    <fo:block font-size="12pt" line-height="15pt" space-after="12pt">
                                        <xsl:value-of select="./ns1:title"></xsl:value-of> <xsl:value-of select="./ns1:name"></xsl:value-of>
                                    </fo:block>
                                    <fo:block font-size="12pt" line-height="15pt" space-after="12pt">
                                        <xsl:value-of select="./ns1:institution"></xsl:value-of>
                                    </fo:block>
                                </fo:block>
                            </fo:table-cell>
                        </fo:table-row>
                    </fo:table-body>
                </fo:table>
            </fo:table-cell>
        </fo:table-row>
    </xsl:template>

    <xsl:template match="ns1:paragraph">
        <fo:block font-size="12pt" line-height="15pt" space-after="12pt">
            <xsl:apply-templates/>
        </fo:block>
    </xsl:template>

    <xsl:template match="ns1:quote">
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

    <xsl:output method="xml" encoding="UTF-8" indent="yes" omit-xml-declaration="yes"/>
</xsl:stylesheet>

