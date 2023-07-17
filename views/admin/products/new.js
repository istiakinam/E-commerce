import layout from "../layout.js";
import { getError } from "../../helpers.js"

const productsNewTemplate = ({ errors }) => {
    return layout ({
        content: `
            <form>
                <input placeholder="Title" name="title" />
                <input placeholder="Price" name="price" />
                <input type="file" name="image" />
                <button>Submit</button>
            </form>
        `
    })
}

export default productsNewTemplate;