import layout from "../layout.js";
import { getError } from "../../helpers.js"

const productsNewTemplate = ({ errors }) => {
    return layout ({
        content: `
            <form method="POST" enctype="multipart/form-data">
                <input placeholder="Title" name="title" />
                ${getError(errors, 'title')}
                <input placeholder="Price" name="price" />
                ${getError(errors, 'price')}
                <input type="file" name="image" />
                <button>Submit</button>
            </form>
        `
    })
}

export default productsNewTemplate;