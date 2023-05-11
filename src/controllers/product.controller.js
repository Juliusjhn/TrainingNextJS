import Controller from "./controller";

export default
class ProductController
    extends Controller{

    constructor(props) {
        super(props);
        this.tableName = 'Product'
    }


    async getImageProduct(){
        let id = 1;

        this.tableName = 'product_image';
        this.key = 'productId'
        this.value = id
        return await this._detail();
    }

}