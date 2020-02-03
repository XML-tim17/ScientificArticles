import { Injectable } from '@angular/core';
import { articleTemplate } from './templates/articleTemplate';
import { coverLetterTemplate } from './templates/coverLetterTemplate';
import { articleXSLT } from './xslt/articleXSLT';
import { coverLetterXSLT } from './xslt/coverLetterXSLT';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';

declare const Xonomy: any;
const xsltProcessor = new XSLTProcessor();
const domParser = new DOMParser();
const xmlSerializer = new XMLSerializer();
const ns = `xmlns:ns1='https://github.com/XML-tim17/ScientificArticles'`;


const imageAsker = (imagesStore) => (_, __, elem) =>
  `<form onsubmit="
      let key = this.val.value + '-${uuid()}';
      let reader = new FileReader();  
      reader.onload = (e) => {
        Xonomy.${imagesStore}[key] = reader.result.split(',')[1];
        Xonomy.answer(key);
      }
      reader.readAsDataURL(this.val.files[0]);
      return false;
    ">
      <input name='val' type='file' accept="image/*">
      <input type='submit' value='Ok'>
    </form>`;

const generateId = (ids) => (elem) => {
  if (!elem.hasAttribute('ns1:id')) {
    let prefix = generatePrefix(elem);
    let parent = elem.parent();
    let elemNumber = 1 + Math.max(...parent.children.filter((child) => child.name === elem.name).map((child) => {
      let attirbuteValue = child.getAttributeValue('ns1:id', null);
      if (attirbuteValue) {
        return +_.last(attirbuteValue.split('/')).replace(child.name, '');
      }
      return -1;
    }).concat([-1]));
    let id = `${prefix}/${elem.name}${elemNumber}`;
    elem.setAttribute('ns1:id', id);
    ids.push(id);
  }
  return false;
}

const generatePrefix = (elem) => {
  let parent = elem.parent();
  if (!parent) {
    return '';
  }
  let parentid = parent.getAttributeValue('ns1:id', null);
  if (!parentid) {
    return generatePrefix(parent);
  }
  return parentid;
}

const generateLevel = (elem) => {
  let depth = 0;
  let parent = elem.parent();
  while (parent !== null) {
    if (parent.name === elem.name) {
      depth++;
    }
    parent = parent.parent();
  }
  elem.setAttribute('ns1:level', depth);
}

const removableMenu: Array<any> = [{
  caption: "Remove",
  action: Xonomy.deleteElement
},];

const decoratorInlineMenu: Array<any> = [{
  caption: "Bold this text",
  action: Xonomy.wrap,
  actionParameter: { template: `<ns1:bold ${ns}>$</ns1:bold>`, placeholder: "$" }
}, {
  caption: "Italic this text",
  action: Xonomy.wrap,
  actionParameter: { template: `<ns1:italic ${ns}>$</ns1:italic>`, placeholder: "$" }
}, {
  caption: "Underline this text",
  action: Xonomy.wrap,
  actionParameter: { template: `<ns1:underline ${ns}>$</ns1:underline>`, placeholder: "$" }
}];

const tParagraph = {
  mustBeBefore: ["ns1:keywords"],
  hasText: true,
  menu: removableMenu,
  inlineMenu: decoratorInlineMenu.concat([
    {
      caption: "Insert quote here",
      action: Xonomy.wrap,
      actionParameter: {
        template: `<ns1:quote ${ns}>Insert quote</ns1:quote>`, placeholder: "$"
      }
    },
    {
      caption: "Insert list here",
      action: Xonomy.wrap,
      actionParameter: {
        template: `<ns1:list ${ns}><ns1:item>Insert list item</ns1:item></ns1:list>`, placeholder: "$"
      }
    },
    {
      caption: "Insert formule here",
      action: Xonomy.wrap,
      actionParameter: {
        template: `<ns1:formule ${ns}>Insert formule here</ns1:formule>`, placeholder: "$"
      }
    },
    {
      caption: "Insert link here",
      action: Xonomy.wrap,
      actionParameter: {
        template: `<ns1:ref ${ns}>Insert link here</ns1:ref>`, placeholder: "$"
      }
    },
    {
      caption: "Insert internal reference here",
      action: Xonomy.wrap,
      actionParameter: {
        template: `<ns1:internal-ref ${ns}>Insert internal reference here</ns1:internal-ref>`, placeholder: "$"
      }
    }
  ])
};

const paragraphElement = (ids) => {
  return {
    "ns1:paragraph": tParagraph,
    "ns1:bold": {
      menu: removableMenu,
      hasText: true,
      inlineMenu: decoratorInlineMenu
    },
    "ns1:italic": {
      menu: removableMenu,
      hasText: true,
      inlineMenu: decoratorInlineMenu
    },
    "ns1:underline": {
      menu: removableMenu,
      hasText: true,
      inlineMenu: decoratorInlineMenu
    },
    "ns1:quote": {
      isReadOnly: generateId(ids),
      menu: removableMenu,
      hasText: true,
      inlineMenu: decoratorInlineMenu
    },
    "ns1:list": {
      isReadOnly: generateId(ids),
      menu: removableMenu.concat([{
        caption: "Add list item",
        action: Xonomy.newElementChild,
        actionParameter: `<ns1:item ${ns}>Insert list item</ns1:item>`
      },]),
    },
    "ns1:item": tParagraph,
    "ns1:ref": {
      menu: removableMenu
    },
    "ns1:internal-ref": {
      menu: removableMenu,
      asker: Xonomy.askPicklist,
      askerParameter: ids,
    },
    "ns1:formule": {
      menu: removableMenu
    },



  }
};

@Injectable({
  providedIn: 'root'
})
export class XonomyService {

  private articleIDs = [];
  private coverLetterIDs = [];


  // ARTICLE

  getArticleTemplate(): string {
    return articleTemplate;
  }

  getArticleElements(): any {
    return {
      "ns1:authors": {
        menu: [{
          caption: "Add author",
          action: Xonomy.newElementChild,
          actionParameter: `<ns1:author ${ns}>
                <ns1:name>Insert author's name</ns1:name>
                <ns1:institution>Insert author's institution</ns1:institution>
                <ns1:phone-number>Insert author's number</ns1:phone-number>
                <ns1:email>Insert author's email</ns1:email>
                <ns1:address>
                    <ns1:city>Insert author's city</ns1:city>
                    <ns1:country>Insert author's country</ns1:country>
                </ns1:address></ns1:author>`
        }]
      },
      "ns1:name": {
        asker: Xonomy.askString
      },
      "ns1:institution": {
        asker: Xonomy.askString
      },
      "ns1:phone-number": {
        asker: Xonomy.askString
      },
      "ns1:email": {
        asker: Xonomy.askString
      },
      "ns1:city": {
        asker: Xonomy.askString
      },
      "ns1:country": {
        asker: Xonomy.askString
      }, "ns1:author": {
        menu: removableMenu
      },
      "ns1:received": {
        isReadOnly: true
      },
      "ns1:accepted": {
        isReadOnly: true
      },
      "ns1:status": {
        isReadOnly: true
      },
      "ns1:abstract": {
        menu: [{
          caption: "Add paragraph",
          action: Xonomy.newElementChild,
          actionParameter: `<ns1:paragraph ${ns}></ns1:paragraph>`
        },],
      },
      "ns1:keywords": {
        menu: [{
          caption: "Add keyword",
          action: Xonomy.newElementChild,
          actionParameter: `<ns1:keyword ${ns}>Insert keyword</ns1:keyword>`
        },]
      },
      "ns1:keyword": {
        menu: removableMenu,
        asker: Xonomy.askString
      },
      ...paragraphElement(this.articleIDs),
      "ns1:content": {
        menu: [{
          caption: "Add section",
          action: Xonomy.newElementChild,
          actionParameter: `<ns1:section ${ns}><ns1:title>Insert section title here</ns1:title></ns1:section>`
        }]
      },
      "ns1:section": {
        isReadOnly: (elem) => { generateLevel(elem); return generateId(this.articleIDs)(elem); },
        menu: removableMenu.concat([{
          caption: "Add paragraph",
          action: Xonomy.newElementChild,
          actionParameter: `<ns1:paragraph ${ns}></ns1:paragraph>`
        },
        {
          caption: "Add section",
          action: Xonomy.newElementChild,
          actionParameter: `<ns1:section ${ns}><ns1:title>Insert section title here</ns1:title></ns1:section>`
        },
        {
          caption: "Add table",
          action: Xonomy.newElementChild,
          actionParameter: `<ns1:table ${ns}></ns1:table>`
        },
        {
          caption: "Add figure",
          action: Xonomy.newElementChild,
          actionParameter: `<ns1:figure ${ns}><ns1:title>Insert figure title here</ns1:title><ns1:image>Click to insert image</ns1:image></ns1:figure>`
        }])
      },
      "ns1:title": {
        asker: Xonomy.askString
      },
      "ns1:table": {
        isReadOnly: generateId(this.articleIDs),
        menu: removableMenu.concat({
          caption: "Add row",
          action: Xonomy.newElementChild,
          actionParameter: `<ns1:tr ${ns}></ns1:tr>`
        })
      },
      "ns1:tr": {
        menu: removableMenu.concat({
          caption: "Add table cell",
          action: Xonomy.newElementChild,
          actionParameter: `<ns1:td ${ns}>Insert table data here</ns1:td>`
        })
      },
      "ns1:td": {
        menu: removableMenu,
        asker: Xonomy.askString
      },
      "ns1:figure": {
        isReadOnly: generateId(this.articleIDs),
        menu: removableMenu
      },
      "ns1:image": {
        asker: imageAsker('articleImages')
      },
      "ns1:references": {
        menu: [{
          caption: "Add reference",
          action: Xonomy.newElementChild,
          actionParameter:
            `<ns1:reference ${ns}>
            <ns1:referencedAuthors>
                <ns1:referencedAuthor>
                  <ns1:name>Insert author's name</ns1:name>
                  <ns1:institution>Insert author's institution</ns1:institution>
                  <ns1:phone-number>Insert author's number</ns1:phone-number>
                  <ns1:email>Insert author's email</ns1:email>
                  <ns1:address>
                      <ns1:city>Insert author's city</ns1:city>
                      <ns1:country>Insert author's country</ns1:country>
                  </ns1:address>
                </ns1:referencedAuthor>
            </ns1:referencedAuthors>
            <ns1:publication-date>Insert publication date</ns1:publication-date>
            <ns1:title>Insert reference title</ns1:title>
            <ns1:publisher>
                <ns1:institution>Insert reference publisher's institution</ns1:institution>
                <ns1:city>Insert reference publisher's city</ns1:city>
            </ns1:publisher>
           </ns1:reference>`
        }]
      },
      "ns1:reference": {
        isReadOnly: generateId(this.articleIDs),
        menu: removableMenu
      },
      "ns1:referencedAuthor": {
        menu: removableMenu
      }
    }
  };

  convertArticleXSLT(articleXML: string): string {
    articleXML = this.importArticleImages(articleXML);
    xsltProcessor.reset();
    xsltProcessor.importStylesheet(domParser.parseFromString(articleXSLT, 'text/xml'));
    let result = xsltProcessor.transformToDocument(domParser.parseFromString(articleXML, 'text/xml'));
    return xmlSerializer.serializeToString(result);
  }

  importArticleImages(articleXML): string {
    let articleImages = Xonomy.articleImages;
    if (!articleImages) return articleXML;
    for (let key in articleImages) {
      articleXML = articleXML.replace(key, articleImages[key]);
    }
    return articleXML;
  }

  storeImagesArticle(articleXML): string {
    let articleDOM: Document = domParser.parseFromString(articleXML, 'text/xml');
    let nsResolver = (nsName) => nsName == 'ns1' ? 'https://github.com/XML-tim17/ScientificArticles' : null;
    let imagesIterator: XPathResult = articleDOM.evaluate("//ns1:image", articleDOM, nsResolver, XPathResult.ANY_TYPE, null);
    let articleImages = {};
    let imageNodes = [];

    var imageNode = imagesIterator.iterateNext();
    while (imageNode) {
      imageNodes.push(imageNode);
      imageNode = imagesIterator.iterateNext();
    }

    imageNodes.forEach(imageNode => {
      let key = `${uuid()}-${uuid()}`;
      articleImages[key] = imageNode.textContent;
      imageNode.textContent = key;
    });

    Xonomy.articleImages = articleImages;
    this.articleIDs = [];
    return xmlSerializer.serializeToString(articleDOM);
  }


  // COVER LETTER

  getCoverLetterTemplate(): string {
    return coverLetterTemplate;

  }

  getCoverLetterElements(): any {
    return {
      "ns1:cover-letter": {
        menu: [{
          caption: "Dodaj id",
          action: Xonomy.newElementChild,
          actionParameter: "<ns1:id></ns1:id>"
        }]
      },
      "ns1:date": {
        isReadOnly: true
      },
      "ns1:image": {
        asker: imageAsker('coverLetterImages')
      },
      "ns1:content": {
        menu: [{
          caption: "Add paragraph",
          action: Xonomy.newElementChild,
          actionParameter: `<ns1:paragraph ${ns}></ns1:paragraph>`
        }]
      },
      ...paragraphElement(this.coverLetterIDs),
    };
  }

  convertCoverLetterXSLT(coverLetterXML: string): string {
    coverLetterXML = this.importCoverLetterImages(coverLetterXML);
    xsltProcessor.reset();
    xsltProcessor.importStylesheet(domParser.parseFromString(coverLetterXSLT, 'text/xml'));
    let result = xsltProcessor.transformToDocument(domParser.parseFromString(coverLetterXML, 'text/xml'));
    return xmlSerializer.serializeToString(result);
  }

  importCoverLetterImages(coverLetterXML): string {
    let coverLetterImages = Xonomy.coverLetterImages;
    if (!coverLetterImages) return coverLetterXML;
    for (let key in coverLetterImages) {
      coverLetterXML = coverLetterXML.replace(key, coverLetterImages[key]);
    }
    return coverLetterXML;
  }

  storeImagesCoverLetter(coverLetterXML): string {
    let coverLetterDOM: Document = domParser.parseFromString(coverLetterXML, 'text/xml');
    let nsResolver = (nsName) => nsName == 'ns1' ? 'https://github.com/XML-tim17/ScientificArticles' : null;
    let imagesIterator: XPathResult = coverLetterDOM.evaluate("//ns1:image", coverLetterDOM, nsResolver, XPathResult.ANY_TYPE, null);
    let coverLetterImages = {};
    let imageNodes = [];

    var imageNode = imagesIterator.iterateNext();
    while (imageNode) {
      imageNodes.push(imageNode);
      imageNode = imagesIterator.iterateNext();
    }

    imageNodes.forEach(imageNode => {
      let key = `${uuid()}-${uuid()}`;
      coverLetterImages[key] = imageNode.textContent;
      imageNode.textContent = key;
    });

    Xonomy.coverLetterImages = coverLetterImages;
    this.coverLetterIDs = [];
    return xmlSerializer.serializeToString(coverLetterDOM);
  }


  constructor() {
    this.articleIDs = [];
    Xonomy.articleImages = {};
    this.coverLetterIDs = [];
    Xonomy.coverLetterImages = {};
  }
}
