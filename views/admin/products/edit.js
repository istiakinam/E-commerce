import { getError } from "../../helpers.js";
import layout from "../layout.js";

const productsEditTemplate = ({ product, errors }) => {
    return layout ({
        content: `
            <form method="POST">
                <input name="title" value="${product.title}" /> 
                ${getError(errors, 'title')}
                <input name="price" value="${product.price}" />
                ${getError(errors, 'price')}
                <input name="image" type="file" />
                <button>Submit</button> 
            </form>
        `
    })
}

export default productsEditTemplate