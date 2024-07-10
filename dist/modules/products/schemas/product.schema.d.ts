import { IProduct } from '../interfaces/products.interface';
import mongoose from "mongoose";
export declare class Product implements IProduct {
    product1cId: string;
    article: string;
    name: string;
    description: string;
    description1c: string;
    color: string[];
    equipment: string[];
    category: string | null;
    size: string;
    frame: string;
    imagePatch: string;
    geometry: string;
    is_active: boolean;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, mongoose.Document<unknown, any, Product> & Product & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product, mongoose.Document<unknown, {}, mongoose.FlatRecord<Product>> & mongoose.FlatRecord<Product> & {
    _id: mongoose.Types.ObjectId;
}>;
