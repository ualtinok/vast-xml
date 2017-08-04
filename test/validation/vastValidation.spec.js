'use strict';

const fs = require('fs');
const libxmljs = require('libxmljs');
const VastXML = require('../../index');

const defaultOptions = { pretty : true, indent: '  ', newline: '\n' };

const VAST_30_XSD = libxmljs.parseXmlString(fs.readFileSync('/Users/victor/Projects/vast-xml/test/files/vast3_draft.xsd').toString());
const INLINE_VAST_AD_VALID = require('../data/inlineVASTAdValid.json');
const INLINE_VAST_AD_NO_SEQUENCE_VALID = require('../data/inlineVASTAdNoSeqValid.json');
const CREATIVE_VALID = require('../data/creativeValid.json');
const MEDIA_FILE_ATTR = require('../data/mediaFileAttr.json');

describe('validate VAST XML documents', () => {
  it('should validate an Inline VAST', () => {
    const vast = new VastXML();
    const ad = vast.attachAd(INLINE_VAST_AD_VALID);
    const creative = ad.attachCreative('Linear', CREATIVE_VALID);

    ad.attachImpression({ id : 23, url : 'http://irrelevantDomain.com' });
    creative.attachVideoClick('ClickThrough', 'http://irrelevantDomain.com');
    creative.attachMediaFile('http://irrelevantVASTCreative.com', MEDIA_FILE_ATTR);

    const xmlObj = libxmljs.parseXmlString(vast.xml(defaultOptions));
    const isValidXML = xmlObj.validate(VAST_30_XSD);

    if (!isValidXML) {
      throw new Error(`Invalid XML:\n${xmlObj.validationErrors}`)
    }
  });
});
