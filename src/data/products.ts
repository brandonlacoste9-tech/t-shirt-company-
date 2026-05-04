export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    brand: string;
    sku: string;
    productCode: string; // The Apliiq internal style code
    variants: string[];
}

export const products: Product[] = [
    {
        id: "apliiq-3719",
        name: "Aura Premium Hoodie",
        price: 65.00,
        image: "/assets/apliiq-hoodie.png",
        description: "Premium Bella+Canvas Sponge Fleece. Ultra-soft, streetwear fit.",
        brand: "Bella+Canvas",
        sku: "3719-AURA",
        productCode: "3719",
        variants: ["S", "M", "L", "XL", "2XL"]
    },
    {
        id: "apliiq-ec1000",
        name: "Earth-First Organic Tee",
        price: 38.00,
        image: "/assets/apliiq-organic.png",
        description: "100% Organic Cotton. Sustainable style for the modern era.",
        brand: "Econscious",
        sku: "EC1000-AURA",
        productCode: "EC1000",
        variants: ["S", "M", "L", "XL"]
    },
    {
        id: "apliiq-5000",
        name: "Industrial Heavy Tee",
        price: 32.00,
        image: "/assets/apliiq-heavy.png",
        description: "Heavyweight cotton with a structured, boxy fit.",
        brand: "Gildan",
        sku: "5000-AURA",
        productCode: "5000",
        variants: ["S", "M", "L", "XL", "2XL", "3XL"]
    }
];
