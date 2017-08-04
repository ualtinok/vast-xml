'use strict';

const LinearCreativeElement = require('./creativeElement/linear.creativeElement');
const NonLinearCreativesElement = require('./creativeElement/nonLinear.creativesElement');
const CompanionAdsCreativeElement = require('./creativeElement/companionAds.creativeElement');


class CreativesElement {
  constructor(ad, track) {
    this._creatives = ad.creatives;
    this._track = track;
  }

  initCreatives(xmlElement) {
    this._xmlCreativesElement = xmlElement.element('Creatives');
    return this;
  }

  insertLinearCreatives() {
    const linearCreatives = this._creatives.filter(c => c.type === 'Linear');

    if (linearCreatives.length > 0) {
      const linearCreativeElement = new LinearCreativeElement(linearCreatives, this._track);
      linearCreativeElement.initCreative(this._xmlCreativesElement)
        .insertLinearCreatives();
    }

    return this;
  }

  insertNonLinearCreatives() {
    const nonLinearCreatives = this._creatives.filter(c => c.type === 'NonLinear');

    if (nonLinearCreatives.length > 0) {
      const nonLinearCreativeElement = new NonLinearCreativesElement(nonLinearCreatives, this._track);
      nonLinearCreativeElement.initCreative(this._xmlCreativesElement)
        .insertNonLinearCreatives();
    }

    return this;
  }

  insertCompanionAdCreatives() {
    const companionAds = this._creatives.filter(c => c.type === 'CompanionAd');

    if (companionAds.length > 0) {
      const companionAdsElement = new CompanionAdsCreativeElement(companionAds, this._track);
      companionAdsElement.initCreative(this._xmlCreativesElement)
        .insertCompanionAds();
    }

    return this;
  }
}

module.exports = CreativesElement;