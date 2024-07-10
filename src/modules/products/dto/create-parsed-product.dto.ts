import { File } from 'src/modules/file-service/schemas/file.schema';

export class CreateParsedProductDto {
  product_id: string;
  name: string;
  images: File[];
  is_active?: boolean;
}

export class GetProductParamsDto {
  minPrice: string;
  maxPrice: string;
  minDiameter: string;
  maxDiameter: string;
  currentPage: string;
  perPage: string;
  categoryes?: string;
  searchTitle?: string;
}
