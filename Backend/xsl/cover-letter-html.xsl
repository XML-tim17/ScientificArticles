<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:ns1="https://github.com/XML-tim17/ScientificArticles"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    version="2.0">
    <xsl:template match="ns1:cover-letter">
                <div class="coverletter-detail-coverletter">
                    <table class="coverletter-detail-content">
                        <tr class="coverletter-detail-heading">
                            <td align="center">
                                <h1 class="coverletter-detail-h1">Cover letter</h1>
                            </td>
                        </tr>
                        <xsl:apply-templates/>
                    </table>
                </div>
    </xsl:template>

    <xsl:template match="ns1:cover-letter/ns1:info">
        <tr>
            <td align="center">
                <table class="coverletter-detail-authors">
                    <tr>
                        <td align="center" width="33%">
                                <h4><xsl:value-of select="./ns1:author/ns1:name"></xsl:value-of></h4>
                                <p><xsl:value-of select="./ns1:author/ns1:email"></xsl:value-of></p>
                                <p><xsl:value-of select="./ns1:author/ns1:institution"></xsl:value-of></p>
                                <p><xsl:value-of select="./ns1:author/ns1:address/ns1:city"></xsl:value-of>, <xsl:value-of select="./ns1:author/ns1:address/ns1:country"></xsl:value-of></p>
                        </td>
                    </tr>
                </table>
                <hr/>
            </td>
        </tr>
    </xsl:template>

    <xsl:template match="ns1:content">
        <tr>
            <td align="left">
                <div class="coverletter-detail-margin-big">
                    <xsl:apply-templates/>
                </div>
            </td>
        </tr>
    </xsl:template>

    <xsl:template match="ns1:list">
        <ul class="coverletter-detail-margin-big">
            <xsl:for-each select="./ns1:item">
                <li>
                    <xsl:apply-templates/>
                </li>
            </xsl:for-each>
        </ul>
    </xsl:template>
        

    <xsl:template match="ns1:signature">
        <tr>
            <td align="left">
                <hr></hr>
                <table class="coverletter-detail-margin coverletter-detail-leftmargin">
                    <tr>
                        <td align="left">
                            <img>
                                <xsl:attribute name="src">
                                    data:image/png;base64, <xsl:value-of select="./ns1:image"></xsl:value-of>
                                </xsl:attribute>
                            </img>
                        </td>
                    </tr>
                    <tr>
                        <td align="left">
                            <p>
                                <xsl:value-of select="./ns1:title"></xsl:value-of> <xsl:value-of select="./ns1:name"></xsl:value-of>
                            </p>
                            <p>
                                <xsl:value-of select="./ns1:institution"></xsl:value-of>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </xsl:template>

    <xsl:template match="ns1:paragraph">
        <p class="coverletter-detail-margin"><xsl:apply-templates/></p>
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

    <xsl:output method="xml" omit-xml-declaration="yes"/>
</xsl:stylesheet>