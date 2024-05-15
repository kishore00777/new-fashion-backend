class product {
  constructor(
    title,
    color,
    price,
    actualPrice,
    model,
    description,
    images = [],
    spec = [],
    topDeals,
    dealHead
  ) {
    this.title = title;
    this.color = color;
    this.price = price;
    this.actualPrice = actualPrice;
    this.model = model;
    this.description = description;
    this.images = images;
    this.spec = spec;
    this.topDeals = topDeals;
    this.dealHead = dealHead;
  }
}

module.exports = product;
