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
                        background: #e2e1e0;
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

                    .margin {
                        margin-top: 5px;
                        margin-bottom: 5px;
                    }

                    .margin-big {
                        margin-top: 10px;
                        margin-bottom: 10px;
                    }

                    .card {
                        background: #fff;
                        border-radius: 2px;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
                      }
                      
                    .card:hover {
                      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
                    }
                    .authorColumn {
                      width: 1%;
                    }

                </style>
            </head>

            <body>
                <div class="article card">
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
                <h3><xsl:apply-templates/></h3>
            </td>
        </tr>
    </xsl:template>

    <xsl:template match="ns1:article/ns1:info">
        <tr>
            <td align="center">
                <hr/>
                <table class="authors">
                    <tr>
                        <td align="center" class="authorColumn">
                                <h4><xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:name"></xsl:value-of></h4>
                                <p><xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:email"></xsl:value-of></p>
                                <p><xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:institution"></xsl:value-of></p>
                                <p><xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:address/ns1:city"></xsl:value-of>, <xsl:value-of select="./ns1:authors/ns1:corresponding-author/ns1:address/ns1:country"></xsl:value-of></p>
                        </td>
                        <xsl:for-each select="./ns1:authors/ns1:author">
                            <td align="center" class="authorColumn">
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
                    <p><xsl:apply-templates/></p>
                </div>
            </td>
        </tr>
    </xsl:template>

    <xsl:template match="ns1:content"/>

    <xsl:template match="ns1:section/ns1:title"/>

    <xsl:template match="ns1:section[@level='0']"/>

    <xsl:template match="ns1:section[@level='1']"/>

    <xsl:template match="ns1:section[@level='2']"/>

    <xsl:template match="ns1:section[@level='3']"/>

    <xsl:template match="ns1:section[not(@level='0' or @level='1' or @level='2' or @level='3')]"/>

    <xsl:template match="ns1:table"/>


    <xsl:template match="ns1:references"/>

    <xsl:template match="ns1:figure"/>

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