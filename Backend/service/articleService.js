const xsltProcessor = require('xslt-processor');
const fs = require('fs');
var articlesRepository = require('../repository/articlesRepository');
const grddlPath = "./xsl/grddl.xsl";

module.exports.saveXML = async (xml) => {
    console.log('udjoh');
    // var a = xsltProcessor.xmlParse("<test>sss</test>");
    // var dom = new DOMParser().parseFromString(xml, 'text/xml');
    await fs.readFile(grddlPath, async (err, data) => {
        if (err) throw err;
        console.log(data.toString());
        var xslt = `<?xml version="1.0" encoding="UTF-8"?>
<stylesheet
    xmlns:xsl  ="http://www.w3.org/1999/XSL/Transform" version="1.0"
    xmlns:h    ="http://www.w3.org/1999/xhtml"
    xmlns      ="http://www.w3.org/1999/XSL/Transform"
    xmlns:rdf  ="http://www.w3.org/1999/02/22-rdf-syntax-ns#">


<!-- Version 0.8 by Fabien.Gandon@sophia.inria.fr -->


<output indent="yes" method="xml" media-type="application/rdf+xml" encoding="UTF-8" omit-xml-declaration="yes"/>

<!-- base of the current XHTML page -->
<variable name='base' select="//*/@xml:base[position()=1]"/>

<!-- url of the current XHTML page if provided by the XSLT engine -->
<param name='url' select="''"/>

<!-- this contains the URL of the source document whether it was provided by the base or as a parameter e.g. http://example.org/bla/file.html-->
<variable name='this' >
	<choose>
		<when test="string-length($base)>0"><value-of select="$base"/></when>
		<otherwise><value-of select="$url"/></otherwise>
	</choose>
</variable>

<!-- this_location contains the location the source document e.g. http://example.org/bla/ -->
<variable name='this_location' >
	<call-template name="get-location"><with-param name="url" select="$this"/></call-template>
</variable>

<!-- this_root contains the root location of the source document e.g. http://example.org/ -->
<variable name='this_root' >
	<call-template name="get-root"><with-param name="url" select="$this"/></call-template>
</variable>


<!-- templates for parsing - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!--Start the RDF generation-->
<template match="/">
<rdf:RDF xmlns:rdf ="http://www.w3.org/1999/02/22-rdf-syntax-ns#" >
  <apply-templates />
</rdf:RDF>
</template>



<!-- match RDFa element -->
<template match="*[attribute::property or attribute::rel or attribute::rev]">

   <!-- identify suject -->
   <variable name="subject"> 
    <choose>
    	
     <!-- an attribute about was specified on the node -->
     <when test="self::*/attribute::about">
       <call-template name="expand-curie-or-uri"><with-param name="curie_or_uri" select="@about"/></call-template>
     </when>

     <!-- current node is a meta or a link in the body and with no about attribute -->
     <when test="(self::h:link or self::h:meta) and not( ancestor::h:head ) and not(attribute::about)">
     	<call-template name="self-curie-or-uri"><with-param name="node" select="parent::*"/></call-template>
     </when>

     <!-- current node is a meta or a link in the body and with no about attribute -->
     <when test="(self::h:link or self::h:meta) and not( ancestor::h:head ) and not(attribute::about)">
     	<call-template name="self-curie-or-uri"><with-param name="node" select="parent::*"/></call-template>
     </when>

     <!-- current node is a meta or a link in the head and with no about attribute -->
     <when test="(self::h:link or self::h:meta) and ( ancestor::h:head ) and not(attribute::about)">
     	<value-of select="$this"/>
     </when>
     
     <!-- current has a parent with an id 
     <when test="parent::*/attribute::id"> 
      <value-of select="concat($this,'#',parent::*/attribute::id)"/>
     </when> -->
     
     <!-- an about was specified on its ancestors or the ancestor had a rel or a rev attribute but no href. -->
     <when test="ancestor::*[attribute::about or ( not(attribute::href) and ( attribute::rel or attribute::rev) )][position()=1]"> 
     	<variable name="selected_ancestor" select="ancestor::*[attribute::about or ( not(attribute::href) and (attribute::rel or attribute::rev) )][position()=1]"/> 
     	<choose>
     		<when test="$selected_ancestor//*[position()=1]/attribute::about">
     			<call-template name="expand-curie-or-uri"><with-param name="curie_or_uri" select="$selected_ancestor/attribute::about"/></call-template>
     		</when>
     		<otherwise>
     			<call-template name="self-curie-or-uri"><with-param name="node" select="$selected_ancestor"/></call-template>
     		</otherwise>
     	</choose>	
     </when>
     
     <otherwise> <!-- it must be about the current document -->
     	<value-of select="$this"/>
     </otherwise>

    </choose>
   </variable>
   
   
   <!-- identify object -->
   <if test="@rel or @rev">
     <variable name="object">
       <choose>
	     <when test="@href"> 
		   <call-template name="expand-curie-or-uri"><with-param name="curie_or_uri" select="@href"/></call-template>
	     </when>
	     <otherwise>
	     	<call-template name="self-curie-or-uri"><with-param name="node" select="."/></call-template>
	     </otherwise>
       </choose>
     </variable>
   
     <if test="@rel">
       <call-template name="relation">
        <with-param name="subject" select ="$subject" />
        <with-param name="object" select ="$object" />
        <with-param name="predicate" select ="@rel"/>
       </call-template>       
     </if>

     <if test="@rev">
       <call-template name="relation">
        <with-param name="subject" select ="$object" />
        <with-param name="object" select ="$subject" />
        <with-param name="predicate" select ="@rev"/>
       </call-template>      
     </if>
   </if>

   
   <!-- we have a property -->
   <if test="@property">
   	
   	 <!-- identify language -->
   	 <variable name="language" select="string(ancestor-or-self::*/attribute::xml:lang[position()=1])" />
   	 
     <variable name="expended-pro"><call-template name="expand-ns"><with-param name="qname" select="@property"/></call-template></variable>

      <choose>
       <when test="@content"> <!-- there is a specific content -->
         <call-template name="property">
          <with-param name="subject" select ="$subject" />
          <with-param name="object" select ="@content" />
          <with-param name="datatype" select ="@datatype" />
          <with-param name="predicate" select ="@property"/>
          <with-param name="attrib" select ="'true'"/>
          <with-param name="language" select ="$language"/>
         </call-template>   
       </when>
       <otherwise> <!-- there is no specific content; we use the value of element -->
         <call-template name="property">
          <with-param name="subject" select ="$subject" />
          <with-param name="object" select ="." />
          <with-param name="datatype" select ="@datatype" />
          <with-param name="predicate" select ="@property"/>
          <with-param name="attrib" select ="'false'"/>
          <with-param name="language" select ="$language"/>
         </call-template> 
       </otherwise>
      </choose>
   </if>

   <!-- we have a class 
   <if test="@class"> 
     <variable name="expended-class"><call-template name="expand-ns"><with-param name="qname" select="@class"/></call-template></variable>        
		 <element name = "rdf:Description">
		   <attribute name="rdf:about"><value-of select="$expanded-about" /></attribute>
		   <element name = "rdf:type">
		     <attribute name="rdf:resource"><value-of select="$expended-class" /></attribute>
		   </element>     
		 </element>
	 </if> -->

   <apply-templates /> 
   
</template>



<!-- named templates to process URIs - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

  <!-- tokenize a string using space as a delimiter -->
  <template name="tokenize">
    <param name="string" />
  	<if test="string-length($string)>0">
  		<choose>
  			<when test="contains($string,' ')">
				<value-of select="normalize-space(substring-before($string,' '))"/>
				<call-template name="tokenize"><with-param name="string" select="normalize-space(substring-after($string,' '))"/></call-template>  	  				
  			</when>
  			<otherwise><value-of select="$string"/></otherwise>
  		</choose>
  	</if>
  </template>

  <!-- get file location from URL -->
  <template name="get-location">
    <param name="url" />
  	<if test="string-length($url)>0 and contains($url,'/')">
  		<value-of select="concat(substring-before($url,'/'),'/')"/>
  		<call-template name="get-location"><with-param name="url" select="substring-after($url,'/')"/></call-template>
  	</if>
  </template>

  <!-- get root location from URL -->
  <template name="get-root">
    <param name="url" />
	<choose>
		<when test="contains($url,'//')">
			<value-of select="concat(substring-before($url,'//'),'//',substring-before(substring-after($url,'//'),'/'),'/')"/>
		</when>
		<otherwise>UNKOWN ROOT</otherwise>
	</choose>    
  </template>

  <!-- return namespace of a qname -->
  <template name="return-ns" >
    <param name="qname" />
    <variable name="ns_prefix" select="substring-before($qname,':')" />
    <variable name="name" select="substring-after($qname,':')" />
    <value-of select="ancestor-or-self::*/namespace::*[name()=$ns_prefix][position()=1]" />
  </template>


  <!-- expand namespace of a qname -->
  <template name="expand-ns" >
    <param name="qname" />
    <variable name="ns_prefix" select="substring-before($qname,':')" />
    <variable name="name" select="substring-after($qname,':')" />
    <variable name="ns_uri" select="ancestor-or-self::*/namespace::*[name()=$ns_prefix][position()=1]" />
    <value-of select="concat($ns_uri,$name)" />
  </template>

  <!-- determines the CURIE / URI of a node -->
  <template name="self-curie-or-uri" >
    <param name="node" />
    <choose>
     <when test="$node/attribute::about"> <!-- we have an about attribute to extend -->
       <call-template name="expand-curie-or-uri"><with-param name="curie_or_uri" select="$node/attribute::about"/></call-template>
     </when>
     <when test="$node/attribute::id"> <!-- we have an id attribute to extend -->
       <value-of select="concat($this,'#',$node/attribute::id)" />
     </when>
     <otherwise>blank node <value-of select="concat('#',generate-id($node))" /></otherwise>
    </choose>
  </template>  



  <!-- expand CURIE / URI -->
  <template name="expand-curie-or-uri" >
    <param name="curie_or_uri" />
    <choose>
     <when test="starts-with($curie_or_uri,'[_:')"> <!-- we have a CURIE blank node -->
      <value-of select="concat('blank node ',substring-after(substring-before($curie_or_uri,']'),'[_:'))"/>
     </when>
     <when test="starts-with($curie_or_uri,'[')"> <!-- we have a CURIE between square brackets -->
      <call-template name="expand-ns"><with-param name="qname" select="substring-after(substring-before($curie_or_uri,']'),'[')"/></call-template>
     </when>
     <when test="starts-with($curie_or_uri,'#')"> <!-- we have an anchor -->
      <value-of select="concat($this,$curie_or_uri)" />
     </when>
     <when test="string-length($curie_or_uri)=0"> <!-- empty anchor means the document itself -->
      <value-of select="$this" />
     </when>
     <when test="not(starts-with($curie_or_uri,'[')) and contains($curie_or_uri,':')"> <!-- it is a URI -->
      <value-of select="$curie_or_uri" />
     </when>     
     <when test="not(contains($curie_or_uri,'://')) and not(starts-with($curie_or_uri,'/'))"> <!-- relative URL -->
      <value-of select="concat($this_location,$curie_or_uri)" />
     </when>
     <when test="not(contains($curie_or_uri,'://')) and (starts-with($curie_or_uri,'/'))"> <!-- URL from root domain -->
      <value-of select="concat($this_root,substring-after($curie_or_uri,'/'))" />
     </when>
     <otherwise>UNKNOWN CURIE URI</otherwise>
    </choose>
  </template>  
  
  <!-- returns the first predicate in a list separated by spaces -->
  <template name="get-first-predicate">
  	<param name="predicate" />
	<if test="string-length($predicate)>0">
		<choose>
			<when test="contains($predicate,' ')">
				<value-of select="normalize-space(substring-before($predicate,' '))"/>			
			</when>
			<otherwise><value-of select="$predicate" /></otherwise>
		</choose>
	</if>
  </template>

<!-- named templates to generate RDF - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

  <template name="recursive-copy">
    <copy>
	 <for-each select="node()">
		<call-template name="recursive-copy" />
	 </for-each>
    </copy>
  </template>
  
  <!-- generate an RDF statement for a relation -->
  <template name="relation" >
    <param name="subject" />
    <param name="predicate" />
    <param name="object" />
  
    <!-- test for multiple predicates -->
    <variable name="single-predicate"><call-template name="get-first-predicate"><with-param name="predicate" select="$predicate"/></call-template></variable>
    
    <!-- get namespace of the predicate -->
    <variable name="predicate-ns"><call-template name="return-ns"><with-param name="qname" select="$single-predicate"/></call-template></variable>
    
    <choose>
     <when test="string-length($predicate-ns)>0"> <!-- there is a known namespace for the predicate -->
	    <element name = "rdf:Description">
	      <choose>
	      	<when test="starts-with($subject,'blank node ')"><attribute name="rdf:nodeID"><value-of select="substring-after($subject,'blank node ')" /></attribute></when>
	      	<otherwise><attribute name="rdf:about"><value-of select="$subject" /></attribute></otherwise>
	      </choose>
	      <element name = "{$single-predicate}" namespace="{$predicate-ns}">
	        <choose>
	      	  <when test="starts-with($object,'blank node ')"><attribute name="rdf:nodeID"><value-of select="substring-after($object,'blank node ')" /></attribute></when>
	      	  <otherwise><attribute name="rdf:resource"><value-of select="$object" /></attribute></otherwise>
	        </choose>
	      </element>     
	    </element>
     </when>
     <otherwise> <!-- generate a comment for debug -->
       <xsl:comment>Could not produce the triple for: <value-of select="$subject" /> - <value-of select="$single-predicate" /> - <value-of select="$object" /></xsl:comment>
     </otherwise>
    </choose>

    <!-- recursive call for multiple predicates -->
    <variable name="other-predicates" select="normalize-space(substring-after($predicate,' '))" />
    <if test="string-length($other-predicates)>0">
		<call-template name="relation">
			<with-param name="subject" select="$subject"/>
			<with-param name="predicate" select="$other-predicates"/>
			<with-param name="object" select="$object"/>
		</call-template>    	
    </if>

  </template>


  <!-- generate an RDF statement for a property -->
  <template name="property" >
    <param name="subject" />
    <param name="predicate" />
    <param name="object" />
    <param name="datatype" />
    <param name="attrib" /> <!-- is the content from an attribute ? true /false -->
    <param name="language" />

    <!-- test for multiple predicates -->
    <variable name="single-predicate"><call-template name="get-first-predicate"><with-param name="predicate" select="$predicate"/></call-template></variable>
     
    <!-- get namespace of the predicate -->    
    <variable name="predicate-ns"><call-template name="return-ns"><with-param name="qname" select="$single-predicate"/></call-template></variable>

    <choose>
     <when test="string-length($predicate-ns)>0"> <!-- there is a known namespace for the predicate -->
	    <element name = "rdf:Description">
	      <choose>
	      	<when test="starts-with($subject,'blank node ')"><attribute name="rdf:nodeID"><value-of select="substring-after($subject,'blank node ')" /></attribute></when>
	      	<otherwise><attribute name="rdf:about"><value-of select="$subject" /></attribute></otherwise>
	      </choose>
	      <element name = "{$single-predicate}" namespace="{$predicate-ns}">
	      <if test="string-length($language)>0"><attribute name="xml:lang"><value-of select="$language" /></attribute></if>
	      <choose>
	        <when test="$datatype='plainliteral'">
	         <choose>
	         	<when test="$attrib='true'"> <!-- content is in an attribute -->
	         	  <value-of select="string($object)" />
	            </when>
	         	<otherwise> <!-- content is in the element -->
				 <value-of select="$object" />
				</otherwise>
			 </choose>
	        </when>
	        <when test="string-length($datatype)>0">
	        	<!-- there is a datatype other than XMLLiteral -->
	         <variable name="expended-datatype"><call-template name="expand-ns"><with-param name="qname" select="$datatype"/></call-template></variable>
	         <attribute name="rdf:datatype"><value-of select="$expended-datatype" /></attribute>
	         <choose>
	         	<when test="$attrib='true'"> <!-- content is in an attribute -->
	         	  <value-of select="string($object)" />
	            </when>
	         	<otherwise> <!-- content is in the element -->
				 <value-of select="$object" />
				</otherwise>
			 </choose>
	        </when>
	        <otherwise> <!-- there is no datatype -->
	         <choose>
	         	<when test="$attrib='true'"> <!-- content is in an attribute -->
	         	  <attribute name="rdf:datatype"><value-of select="'http://www.w3.org/2000/01/rdf-schema#Literal'" /></attribute>
	         	  <value-of select="string($object)" />
	            </when>
	         	<otherwise> <!-- content is in the element -->
	         	 <attribute name="rdf:datatype"><value-of select="'http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral'" /></attribute>
				 <for-each select="$object/node()"> 
					<call-template name="recursive-copy" />
				 </for-each>
				</otherwise>
			 </choose>	 
	        </otherwise>
	      </choose>
	      </element>        
	    </element>
     </when>
     <otherwise> <!-- generate a comment for debug -->
       <xsl:comment>Could not produce the triple for: <value-of select="$subject" /> - <value-of select="$single-predicate" /> - <value-of select="$object" /></xsl:comment>
     </otherwise>
    </choose>

    <!-- recursive call for multiple predicates -->
    <variable name="other-predicates" select="normalize-space(substring-after($predicate,' '))" />
    <if test="string-length($other-predicates)>0">
		<call-template name="property">
			<with-param name="subject" select="$subject"/>
			<with-param name="predicate" select="$other-predicates"/>
			<with-param name="object" select="$object"/>
			<with-param name="datatype" select="$datatype"/>
			<with-param name="attrib" select="$attrib"/>
			<with-param name="language" select="$language"/>
		</call-template>    	
    </if>
     
  </template>


<!-- ignore the rest of the DOM -->
<template match="text()|@*|*"><apply-templates /></template>


</stylesheet>
`;
        var xmlll = `<?xml version="1.0" encoding="UTF-8"?>
<ns1:article 
 xmlns="https://github.com/XML-tim17/ScientificArticles"
 xmlns:ns1="https://github.com/XML-tim17/ScientificArticles"
 xmlns:vc="http://www.w3.org/2007/XMLSchema-versioning"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="https://github.com/XML-tim17/ScientificArticles file:/E:/Mi/Alex/Faks/Moji%20predmeti/Sedmi%20semestar/XML%20i%20veb%20servisi/ScientificArticles/XMLSchemas/Article.xsd" vocab="http://schema.org/">
    <ns1:title property="headline">title0</ns1:title>
    <ns1:info>
        <ns1:authors>
            <ns1:author property="author" href="author_1">
                <ns1:name property="name" about="author_1">name0</ns1:name>
                <ns1:institution property="memberOf" about="author_1">institution0</ns1:institution>
                <ns1:phone-number property="telephone" about="author_1">0</ns1:phone-number>
                <ns1:email property="email" about="author_1"> @ .a</ns1:email>
                <ns1:address property="address" href="author_1/address" about="author_1">
                    <ns1:city property="addressLocality" about="author_1/address">city0</ns1:city>
                    <ns1:country property="addressCountry" about="author_1/address">country0</ns1:country>
                </ns1:address>
            </ns1:author>
        </ns1:authors>
        <ns1:received property="dateCreated">2006-05-04</ns1:received>
        <ns1:revised property="dateModified">2006-05-04</ns1:revised>
        <ns1:accepted property="datePublished ">2006-05-04</ns1:accepted>
        <ns1:status property="creativeWorkStatus">accepted</ns1:status>
        <ns1:version property="version">1.0</ns1:version>
    </ns1:info>
    <ns1:abstract>
        <ns1:paragraph>
            <ns1:bold>
                <ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                </ns1:bold>
                <ns1:bold>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                </ns1:bold>
                <ns1:underline>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:underline>
                <ns1:underline>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                </ns1:underline>
            </ns1:bold>
            <ns1:bold>
                <ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:bold>
                <ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                </ns1:bold>
                <ns1:underline>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                </ns1:underline>
                <ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:underline>
            </ns1:bold>
            <ns1:italic>
                <ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:italic>
                <ns1:italic>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:italic>
                <ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                </ns1:underline>
                <ns1:underline>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                </ns1:underline>
            </ns1:italic>
            <ns1:italic>
                <ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:italic>
                <ns1:italic>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                </ns1:italic>
                <ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:bold>
                <ns1:bold>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:bold>
            </ns1:italic>
            <ns1:italic>
                <ns1:bold>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                </ns1:bold>
                <ns1:bold>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                </ns1:bold>
                <ns1:bold>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                </ns1:bold>
                <ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:bold>
            </ns1:italic>
            <ns1:italic>
                <ns1:italic>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                </ns1:italic>
                <ns1:italic>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                </ns1:italic>
                <ns1:bold>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:bold>
                <ns1:bold>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:bold>
            </ns1:italic>
            <ns1:italic>
                <ns1:underline>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:underline>
                <ns1:underline>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                </ns1:underline>
                <ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:italic>
                <ns1:italic>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                </ns1:italic>
            </ns1:italic>
            <ns1:italic>
                <ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:italic>
                <ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                </ns1:italic>
                <ns1:underline>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:underline>
                <ns1:underline>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                </ns1:underline>
            </ns1:italic>
        </ns1:paragraph>
        <ns1:paragraph>
            <ns1:list ns1:id="">
                <ns1:item>
                    <ns1:formule>formule0</ns1:formule>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:item>
                <ns1:item>
                    <ns1:quote ns1:id="">
                    </ns1:quote>
                    <ns1:list ns1:id="">
                        <ns1:item>
                            <ns1:ref>http://www.oxygenxml.com/</ns1:ref>
                            <ns1:quote ns1:id="">
                            </ns1:quote>
                        </ns1:item>
                        <ns1:item>
                            <ns1:quote ns1:id="">
                            </ns1:quote>
                            <ns1:ref>http://www.oxygenxml.com/</ns1:ref>
                        </ns1:item>
                    </ns1:list>
                </ns1:item>
            </ns1:list>
            <ns1:italic>
                <ns1:underline>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:underline>
                <ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:underline>
                <ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:italic>
                <ns1:italic>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:italic>
            </ns1:italic>
            <ns1:italic>
                <ns1:bold>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                </ns1:bold>
                <ns1:bold>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                </ns1:bold>
                <ns1:underline>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                </ns1:underline>
                <ns1:underline>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:underline>
            </ns1:italic>
            <ns1:italic>
                <ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                </ns1:underline>
                <ns1:underline>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                </ns1:underline>
                <ns1:bold>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:bold>
                <ns1:bold>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:bold>
            </ns1:italic>
            <ns1:italic>
                <ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:italic>
                <ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                </ns1:italic>
                <ns1:bold>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                </ns1:bold>
                <ns1:bold>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:italic>
                    </ns1:italic>
                    <ns1:underline>
                    </ns1:underline>
                    <ns1:underline>
                    </ns1:underline>
                </ns1:bold>
            </ns1:italic>
        </ns1:paragraph>
        <ns1:keywords>
            <ns1:keyword property="keywords">keyword0</ns1:keyword>
            <ns1:keyword property="keywords">keyword1</ns1:keyword>
        </ns1:keywords>
    </ns1:abstract>
    <ns1:content>
        <ns1:section ns1:id="" level="5">
            <ns1:title>title1</ns1:title>
            <ns1:figure ns1:id="" title="title0">
                <ns1:image>ZGVmYXVsdA==</ns1:image>
            </ns1:figure>
            <ns1:figure ns1:id="" title="title1">
                <ns1:image>ZGVmYXVsdA==</ns1:image>
            </ns1:figure>
        </ns1:section>
        <ns1:section ns1:id="" level="5">
            <ns1:title>title2</ns1:title>
            <ns1:table ns1:id="">
                <ns1:tr>
                    <ns1:td>
                    </ns1:td>
                    <ns1:td>
                    </ns1:td>
                </ns1:tr>
                <ns1:tr>
                    <ns1:td>
                    </ns1:td>
                    <ns1:td>
                    </ns1:td>
                </ns1:tr>
            </ns1:table>
            <ns1:paragraph>
                <ns1:list ns1:id="">
                    <ns1:item>
                        <ns1:ref>http://www.oxygenxml.com/</ns1:ref>
                        <ns1:quote ns1:id="">
                        </ns1:quote>
                    </ns1:item>
                    <ns1:item>
                        <ns1:list ns1:id="">
                            <ns1:item>
                                <ns1:formule>formule1</ns1:formule>
                                <ns1:quote ns1:id="">
                                </ns1:quote>
                            </ns1:item>
                            <ns1:item>
                            </ns1:item>
                        </ns1:list>
                        <ns1:ref>http://www.oxygenxml.com/</ns1:ref>
                    </ns1:item>
                </ns1:list>
                <ns1:quote ns1:id="">
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                    <ns1:bold>
                    </ns1:bold>
                </ns1:quote>
            </ns1:paragraph>
        </ns1:section>
    </ns1:content>
    <ns1:references>
        <ns1:reference>
            <ns1:referencedAuthors>
                <ns1:referencedAuthor>
                    <ns1:name>name2</ns1:name>
                    <ns1:institution>institution2</ns1:institution>
                    <ns1:phone-number>0</ns1:phone-number>
                    <ns1:email> @ .a</ns1:email>
                    <ns1:address>
                        <ns1:city>city2</ns1:city>
                        <ns1:country>country2</ns1:country>
                    </ns1:address>
                </ns1:referencedAuthor>
                <ns1:referencedAuthor>
                    <ns1:name>name3</ns1:name>
                    <ns1:institution>institution3</ns1:institution>
                    <ns1:phone-number>0</ns1:phone-number>
                    <ns1:email> @ .a</ns1:email>
                    <ns1:address>
                        <ns1:city>city3</ns1:city>
                        <ns1:country>country3</ns1:country>
                    </ns1:address>
                </ns1:referencedAuthor>
            </ns1:referencedAuthors>
            <ns1:publication-date>2006-05-04</ns1:publication-date>
            <ns1:title>title3</ns1:title>
            <ns1:publisher>
                <ns1:institution>institution4</ns1:institution>
                <ns1:city>city4</ns1:city>
            </ns1:publisher>
        </ns1:reference>
        <ns1:reference>
            <ns1:referencedAuthors>
                <ns1:referencedAuthor>
                    <ns1:name>name4</ns1:name>
                    <ns1:institution>institution5</ns1:institution>
                    <ns1:phone-number>0</ns1:phone-number>
                    <ns1:email> @ .a</ns1:email>
                    <ns1:address>
                        <ns1:city>city5</ns1:city>
                        <ns1:country>country4</ns1:country>
                    </ns1:address>
                </ns1:referencedAuthor>
                <ns1:referencedAuthor>
                    <ns1:name>name5</ns1:name>
                    <ns1:institution>institution6</ns1:institution>
                    <ns1:phone-number>0</ns1:phone-number>
                    <ns1:email> @ .a</ns1:email>
                    <ns1:address>
                        <ns1:city>city6</ns1:city>
                        <ns1:country>country5</ns1:country>
                    </ns1:address>
                </ns1:referencedAuthor>
            </ns1:referencedAuthors>
            <ns1:publication-date>2006-05-04</ns1:publication-date>
            <ns1:title>title4</ns1:title>
            <ns1:publisher>
                <ns1:institution>institution7</ns1:institution>
                <ns1:city>city7</ns1:city>
            </ns1:publisher>
        </ns1:reference>
    </ns1:references>
</ns1:article>
`;
        var parsedXml = xsltProcessor.xmlParse(xmlll);
        var parsedXslt = xsltProcessor.xmlParse(xslt);
        const outXmlString = xsltProcessor.xsltProcess(
            parsedXml,
            parsedXslt
        );
        console.log(outXmlString);
    });
    return articlesRepository.saveXML(xml);
}

module.exports.readXML = async (articleId) => {
    return articlesRepository.readXML(articleId);
}

