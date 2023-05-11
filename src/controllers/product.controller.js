import Controller from "./controller";

export default
class ProductController
    extends Controller{

    constructor(props) {
        super(props);
        this.tableName = 'Product'
    }

}