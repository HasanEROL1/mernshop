class ProductFilter {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        let queryCopy = { ...this.queryStr };

        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(field => delete queryCopy[field]);

        if (queryCopy.category) {
            queryCopy.category = {
                $in: queryCopy.category.split(",")
            };
        }

        if (queryCopy.minPrice || queryCopy.maxPrice) {
            queryCopy.price = {};

            if (queryCopy.minPrice) {
                queryCopy.price.$gte = Number(queryCopy.minPrice);
            }

            if (queryCopy.maxPrice) {
                queryCopy.price.$lte = Number(queryCopy.maxPrice);
            }

            delete queryCopy.minPrice;
            delete queryCopy.maxPrice;
        }

        this.query = this.query.find(queryCopy);
        return this;
    }

    pagination(resultPerPage) {
        const activePage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (activePage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ProductFilter;