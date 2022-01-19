class APIFeatures {
    query: any;
    queryString: any
    constructor(query: any, queryString: any) {
      this.query = query;
      this.queryString = queryString;
    }
  


limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields); // the operation of selecting just a few names is called projecting
    } else {
      this.query = this.query.select('-__v'); //the minus will exclude the __v field from being sent to the client
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit); //skip is the amount of result that should be skipped before queryiing that, while limit is the amount of result that we want in the query

    return this;
  }
}

export default APIFeatures;