import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
        handle: string;
        productCode: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/${product.handle}`} className="apex-card group reveal">
            <div className="aspect-[4/5] relative overflow-hidden">
                <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    <span className="text-[0.6rem] font-black uppercase tracking-widest bg-white text-black px-4 py-2 rounded-full">Explore Garment</span>
                </div>
            </div>
            <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                    <h4 className="text-xl font-black tracking-tighter uppercase group-hover:text-accent transition-colors">{product.name}</h4>
                    <span className="text-lg font-black text-accent">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/20 font-black">Node SKU: {product.productCode}</p>
            </div>
        </Link>
    );
}
