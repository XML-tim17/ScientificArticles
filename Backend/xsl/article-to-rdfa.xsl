<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:ns1="https://github.com/XML-tim17/ScientificArticles" 
    version="2.0">

    <xsl:output indent="yes" method="xml"/>

    <!-- IdentityTransform -->
    <xsl:template match="/ | @* | node()">
        <xsl:copy>
            <xsl:apply-templates select="@* | node()"/>
        </xsl:copy>
    </xsl:template>


    <xsl:template match="ns1:article">
        <ns1:article  xmlns="http://www.w3.org/ns/rdfa#" xmlns:xsd="http://www.w3.org/2001/XMLSchema#">
            <xsl:attribute name="vocab">https://schema.org/</xsl:attribute>
            <xsl:attribute name="about">https://github.com/XML-tim17/ScientificArticles/<xsl:value-of select="./ns1:id"/>/<xsl:value-of select="./ns1:info/ns1:version"/></xsl:attribute>
            <xsl:attribute name="typeof">ScholarlyArticle</xsl:attribute>
            <xsl:apply-templates select="node() | @*"/>
        </ns1:article>
    </xsl:template>
    
    <xsl:template match="ns1:article/ns1:id">
        <xsl:copy>
            <xsl:attribute name="property">identifier</xsl:attribute>
            <xsl:apply-templates select="node() | @*"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="ns1:article/ns1:title">
        <xsl:copy>
            <xsl:attribute name="property">headline</xsl:attribute>
            <xsl:apply-templates select="node() | @*"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="ns1:article/ns1:info/ns1:authors/ns1:corresponding-author/ns1:name | ns1:article/ns1:info/ns1:authors/ns1:author/ns1:name">
        <xsl:copy>
            <xsl:attribute name="property">author</xsl:attribute>
            <xsl:apply-templates select="node() | @*"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="ns1:article/ns1:info/ns1:received">
        <xsl:copy>
            <xsl:attribute name="property">dateCreated</xsl:attribute>
            <xsl:attribute name="datatype">xsd:dateTime</xsl:attribute>
            <xsl:apply-templates select="node() | @*"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="ns1:article/ns1:info/ns1:accepted">
        <xsl:copy>
            <xsl:attribute name="property">datePublished</xsl:attribute>
            <xsl:attribute name="datatype">xsd:dateTime</xsl:attribute>
            <xsl:apply-templates select="node() | @*"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="ns1:article/ns1:info/ns1:status">
        <xsl:copy>
            <xsl:attribute name="property">creativeWorkStatus</xsl:attribute>
            <xsl:apply-templates select="node() | @*"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="ns1:article/ns1:abstract">
        <xsl:copy>
            <xsl:attribute name="property">abstract</xsl:attribute>
            <xsl:attribute name="content">
                <xsl:for-each select="./ns1:paragraph">
                    <xsl:value-of select="."/>
                    <xsl:text>; </xsl:text>
                </xsl:for-each>
            </xsl:attribute>
            <xsl:apply-templates select="node() | @*"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="ns1:article/ns1:abstract/ns1:keywords">
        <xsl:copy>
            <xsl:attribute name="property">keywords</xsl:attribute>
            <xsl:attribute name="content">
                <xsl:for-each select="./ns1:keyword">
                    <xsl:value-of select="."/>
                    <xsl:text>; </xsl:text>
                </xsl:for-each>
            </xsl:attribute>
            <xsl:apply-templates select="node() | @*"/>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="ns1:references/ns1:reference/ns1:website-id">
        <xsl:copy>
            <xsl:attribute name="property">citation</xsl:attribute>
            <xsl:apply-templates select="node() | @*"/>
        </xsl:copy>
    </xsl:template>
    
    

</xsl:stylesheet>
