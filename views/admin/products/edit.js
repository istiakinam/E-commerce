import layout from "../layout.js";

const productsEditTemplate = ({ product }) => {
    return layout ({
        content: `
            <form method="POST">
                <input name="title" value="${product.title}" /> 
                <input name="price" value="${product.price}" />
                <input name="image" type="file" />
                <button>Submit</button> 
            </form>
        `
    })
}

export default productsEditTemplate