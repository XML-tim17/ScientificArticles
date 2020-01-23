<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ns1="https://github.com/XML-tim17/ScientificArticles"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    version="2.0">
    <xsl:template match="ns1:article">
        <html>
            <head>
                <style>

                    body {
                        background: #e0e0e0;
                    }

                    .article {
                        max-width: 75%;
                        margin: auto;
                        background: white;
                        padding: 10px;
                    }
                    
                    .content {
                        width: 100%;
                    }
    
                    h1 {
                        margin-bottom: 40px;
                    }
    
                    .authors {
                        width: 100%;
                    }

                    .margin {
                        margin-top: 20px;
                        margin-bottom: 20px;
                    }

                    .margin-big {
                        margin-top: 40px;
                        margin-bottom: 40px;
                    }

                    .child-padding5 * {
                        padding: 5px;
                    }
                </style>
            </head>

            <body>
                <div class="article">
                    <table class="content">
                        <xsl:apply-templates/>
                    </table>
                </div>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="ns1:article/ns1:title">
        <tr class="heading">
            <td align="center">
                <h1><xsl:apply-templates/></h1>
            </td>
        </tr>
    </xsl:template>

    <xsl:template match="ns1:article/ns1:info">
        <tr>
            <td align="center">
                <table class="authors">
                    <tr>
                        <td align="center" width="33%">
                                <h4><xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:name"></xsl:value-of></h4>
                                <p><xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:email"></xsl:value-of></p>
                                <p><xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:institution"></xsl:value-of></p>
                                <p><xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:address/ns1:city"></xsl:value-of>, <xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:address/ns1:country"></xsl:value-of></p>
                        </td>
                        <xsl:for-each select="./ns1:authors/ns1:author">
                            <td align="center" width="33%">
                                <h4><xsl:value-of select="ns1:name"></xsl:value-of></h4>
                                <p><xsl:value-of select="ns1:email"></xsl:value-of></p>
                                <p><xsl:value-of select="ns1:institution"></xsl:value-of></p>
                                <p><xsl:value-of select="ns1:address/ns1:city"></xsl:value-of>, <xsl:value-of select="ns1:address/ns1:country"></xsl:value-of></p>
                            </td>
                        </xsl:for-each>
                    </tr>
                </table>
                <hr/>
            </td>
        </tr>
    </xsl:template>

    <xsl:template match="ns1:abstract">
        <tr>
            <td align="left">
                <div class="margin-big">
                    <p><b>Abstract: </b> <xsl:apply-templates/></p>
                </div>
            </td>
        </tr>
    </xsl:template>

    <xsl:template match="ns1:content">
        <tr>
            <td align="left">
                <div class="margin-big">
                    <xsl:apply-templates/>
                </div>
            </td>
        </tr>
    </xsl:template>

    <xsl:template match="ns1:section/ns1:title"/>

    <xsl:template match="ns1:section[@level='0']">
        <h2><xsl:value-of select="./ns1:title"></xsl:value-of></h2> <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="ns1:section[@level='1']">
        <h3><xsl:value-of select="./ns1:title"></xsl:value-of></h3> <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="ns1:section[@level='2']">
        <h4><xsl:value-of select="./ns1:title"></xsl:value-of></h4> <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="ns1:section[@level='3']">
        <h5><xsl:value-of select="./ns1:title"></xsl:value-of></h5> <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="ns1:section[not(@level='0' or @level='1' or @level='2' or @level='3')]">
        <h6><xsl:value-of select="./ns1:title"></xsl:value-of></h6><xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="ns1:table">
        <table border="1px" class="margin-big child-padding5">
            <xsl:for-each select="./ns1:tr">
                <tr>
                    <xsl:for-each select="./ns1:td">
                        <td>
                            <xsl:apply-templates/>
                        </td>
                    </xsl:for-each>
                </tr>
            </xsl:for-each>
        </table>
    </xsl:template>


    <xsl:template match="ns1:references">
        <tr>
            <td>
                <h3>
                    References: 
                </h3>
                    <xsl:for-each select="./ns1:reference">
                    
                        <xsl:variable name="count" select="position()"/>
                        <p class="margin">
                            
                            <b><xsl:value-of select="count"></xsl:value-of>. </b>
                            <xsl:for-each select="./ns1:referencedAuthors/ns1:referencedAuthor">
                                <xsl:value-of select="./ns1:name"></xsl:value-of>, 
                            </xsl:for-each>
                            
                            (<xsl:value-of select="./ns1:publication-date"></xsl:value-of>). 
                            <xsl:value-of select="./ns1:title"></xsl:value-of>,
                            <xsl:value-of select="./ns1:publisher/ns1:institution"></xsl:value-of>,
                            <xsl:value-of select="/ns1:publisher/ns1:city"></xsl:value-of>,
        
                        </p>
                    </xsl:for-each>
            </td>
        </tr>
        
    </xsl:template>

    <xsl:template match="ns1:figure">
        <table border="1px" class="margin child-padding5">
            <tr>
                <td align="center">
                    <img>
                        <xsl:attribute name="src">
                            data:image/png;base64, <xsl:value-of select="./ns1:image"></xsl:value-of>
                        </xsl:attribute>
                        <xsl:attribute name="alt">
                            <xsl:value-of select="./@title"></xsl:value-of>
                        </xsl:attribute>
                    </img>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <p>
                        <xsl:value-of select="./@title"></xsl:value-of>
                    </p>
                </td>
            </tr>
        </table>
    </xsl:template>

    <xsl:template match="ns1:paragraph">
        <p class="margin"><xsl:apply-templates/></p>
    </xsl:template>

    <xsl:template match="ns1:quote">
        "<xsl:apply-templates/>"
    </xsl:template>

    <xsl:template match="ns1:bold">
        <b><xsl:apply-templates/></b>
    </xsl:template>

    <xsl:template match="ns1:italic">
        <i><xsl:apply-templates/></i>
    </xsl:template>

    <xsl:template match="ns1:underline">
        <u><xsl:apply-templates/></u>
    </xsl:template>

    <xsl:template match="ns1:ref">
        <a>
            <xsl:attribute name="href"><xsl:apply-templates/></xsl:attribute>
            <xsl:apply-templates/>
        </a>
    </xsl:template>

    <xsl:template match="ns1:keywords">
        <p>
            Keywords: 
            <xsl:for-each select="./ns1:keyword">
                <b><xsl:apply-templates/></b>, 
            </xsl:for-each>
        </p>
        
    </xsl:template>

    <xsl:output method="xml" omit-xml-declaration="yes"/>
</xsl:stylesheet>