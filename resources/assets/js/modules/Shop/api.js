const mockProducts = {
    products: [
        {
            id: 1,
            displayName: "Product 1",
            description: "- 1\n- 2\n- 3",
            picture: "",
            sizes: ["S", "M", "L", "XL"],
            price: 100,
        },
        {
            id: 2,
            displayName: "Product 2",
            description: "- 1\n- 2\n- 3",
            picture: "",
            sizes: ["S", "M", "L", "XL"],
            price: 150,
        },
        {
            id: 3,
            displayName: "Product 3",
            description: "- 1\n- 2\n- 3",
            picture: "",
            sizes: ["S", "M", "L", "XL"],
            price: 200,
        },
        {
            id: 4,
            displayName: "Product 4",
            description: "- 1\n- 2\n- 3",
            picture: "",
            sizes: ["S", "M", "L", "XL"],
            price: 250,
        },
        {
            id: 5,
            displayName: "Product 5",
            description: "- 1\n- 2\n- 3",
            picture: "",
            sizes: ["S", "M", "L", "XL"],
            price: 250,
        },
        {
            id: 6,
            displayName: "Product 6",
            description: "- 1\n- 2\n- 3",
            picture: "",
            sizes: ["S", "M", "L", "XL"],
            price: 250,
        },
    ],
    sets: [
        {
            text: 'Set 1 Text'
        },
        {
            text: 'Set 2 Text'
        },
        {
            text: 'Set 3 Text'
        },
    ],
}

export const fetchProducts = async () => mockProducts
