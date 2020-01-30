import { Injectable } from '@angular/core';
import { articleTemplate } from './templates/articleTemplate';
import { coverLetterTemplate } from './templates/coverLetterTemplate';
import { articleXSLT } from './xslt/articleXSLT';
import { coverLetterXSLT } from './xslt/coverLetterXSLT';

declare const Xonomy: any;
const xsltProcessor = new XSLTProcessor();
const domParser = new DOMParser();
const xmlSerializer = new XMLSerializer();
const ns = `xmlns:ns1='https://github.com/XML-tim17/ScientificArticles'`;

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
        template: `<ns1:internal-ref ${ns}></ns1:internal-ref>`, placeholder: "$"
      }
    }
  ])
};

@Injectable({
  providedIn: 'root'
})
export class XonomyService {

  getCoverLetterTemplate(): string {
    return coverLetterTemplate;

  }

  getArticleTemplate(): string {
    return articleTemplate;
  }

  getArticleElements(): any {
    return {
      "ns1:authors": {
        menu: [{
          caption: "Add author",
          action: Xonomy.newElementChild,
          actionParameter: `<ns1:author ${ns}><ns1:name>Insert author's name</ns1:name>
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
        menu: removableMenu,
        hasText: true,
        inlineMenu: decoratorInlineMenu
      },
      "ns1:list": {
        menu: removableMenu.concat([{
          caption: "Add list item",
          action: Xonomy.newElementChild,
          actionParameter: `<ns1:item ${ns}>Insert list item</ns1:item>`
        },]),

      },
      "ns1:item": tParagraph,
      "ns1:ref": {
        menu: removableMenu
      }, "ns1:internal-ref": {
        menu: removableMenu
      },
      "ns1:formule": {
        menu: removableMenu
      },

    };
  }

  getCoverLetterElements(): any {
    return {
      "ns1:cover-letter": {
        menu: [{
          caption: "Dodaj id",
          action: Xonomy.newElementChild,
          actionParameter: "<ns1:id></ns1:id>"
        }]
      }
    };
  }

  convertArticleXSLT(articleXML: string): string {
    xsltProcessor.reset();
    xsltProcessor.importStylesheet(domParser.parseFromString(articleXSLT, 'text/xml'));
    let result = xsltProcessor.transformToDocument(domParser.parseFromString(articleXML, 'text/xml'));
    return xmlSerializer.serializeToString(result);
  }

  convertCoverLetterXSLT(coverLetterXML: string): string {
    xsltProcessor.reset();
    xsltProcessor.importStylesheet(domParser.parseFromString(coverLetterXSLT, 'text/xml'));
    let result = xsltProcessor.transformToDocument(domParser.parseFromString(coverLetterXML, 'text/xml'));
    return xmlSerializer.serializeToString(result);
  }

  constructor() { }
}
