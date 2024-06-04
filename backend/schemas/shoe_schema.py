import uuid
from typing import List, Optional

import pydantic

from backend.schemas._base_schema import BaseSchema
from backend.schemas.brand_schema import BrandCreateSchema
from backend.schemas.color_schema import ColorCreateSchema
from backend.schemas.review_schema import ReviewOutInProductDetailPageSchema
from backend.schemas.size_schema import SizeCreateSchema


class ShoeCreateSchema(pydantic.BaseModel):
    # brand_id: uuid.UUID
    brand: BrandCreateSchema
    size: SizeCreateSchema
    color: ColorCreateSchema
    image_url: str
    shoe_name: str
    description: str
    quantity_in_stock: int
    display_price: float
    warehouse_price: float
    discounted_price: Optional[float] = None


"""
{
    is_active: true,
    created_at: '2024-05-22T00:07:57.887748Z',
    updated_at: '2024-05-22T00:11:57.343553Z',
    deleted_at: null,
    id: 'fbf3f990-650e-43b4-9797-95a2398978ad',
    brand: {
        brand_name: 'Puma',
        brand_logo: 'https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/brand_logo_Puma.png',
    },
    size: { size_number: 43 },
    color: { color_name: 'Light Blue', hex_value: '#71c1dd' },
    image_url: 'https://raw.githubusercontent.com/DNAnh01/assets/main/SoleMateAI/shoe4.png',
    shoe_name: 'Nike Air Max 90 Essential',
    description: 'Giày thể thao nam Nike Air Max 90 Essential mang đến sự êm ái, thoải mái cho người sử dụng.',
    quantity_in_stock: 1,
    display_price: 2000000,
    warehouse_price: 1500000,
    discounted_price: 1600000,
    avg_rating: 4.5,
}
"""


class AdminUpdateShoeSchema(pydantic.BaseModel):
    id: uuid.UUID
    brand: BrandCreateSchema
    size: SizeCreateSchema
    color: ColorCreateSchema
    image_url: str
    shoe_name: str
    description: str
    quantity_in_stock: int
    display_price: float
    warehouse_price: float
    discounted_price: float
    avg_rating: Optional[float] = None
    is_active: bool
    created_at: str
    updated_at: str
    deleted_at: Optional[str] = None


class ShoeUpdateSchema(BaseSchema):
    brand: Optional[BrandCreateSchema] = None
    size: Optional[SizeCreateSchema] = None
    color: Optional[ColorCreateSchema] = None
    image_url: Optional[str] = None
    shoe_name: Optional[str] = None
    description: Optional[str] = None
    quantity_in_stock: Optional[int] = None
    display_price: Optional[float] = None
    warehouse_price: Optional[float] = None
    discounted_price: Optional[float] = None


class ShoeOutSchema(BaseSchema):
    id: uuid.UUID
    brand: BrandCreateSchema
    size: SizeCreateSchema
    color: ColorCreateSchema
    image_url: str
    shoe_name: str
    description: str
    quantity_in_stock: int
    display_price: float
    warehouse_price: float
    discounted_price: float


class ShoeOutInHomePageSchema(BaseSchema):
    id: uuid.UUID
    brand: BrandCreateSchema
    size: SizeCreateSchema
    color: ColorCreateSchema
    image_url: str
    shoe_name: str
    description: str
    quantity_in_stock: int
    display_price: float
    warehouse_price: float
    discounted_price: float
    avg_rating: Optional[float] = None


class ShoeOutInProductDetailPageSchema(BaseSchema):
    id: uuid.UUID
    brand: BrandCreateSchema
    size: SizeCreateSchema
    color: ColorCreateSchema
    image_url: str
    shoe_name: str
    description: str
    quantity_in_stock: int
    display_price: float
    warehouse_price: float
    discounted_price: float
    avg_rating: Optional[float] = None
    reviews: Optional[List[ReviewOutInProductDetailPageSchema]] = None


class ShoeInDBSchema(BaseSchema):
    id: uuid.UUID
    brand_id: uuid.UUID
    size_id: uuid.UUID
    color_id: uuid.UUID
    image_url: str
    shoe_name: str
    description: str
    quantity_in_stock: int
    display_price: float
    warehouse_price: float
    discounted_price: float

    class Config:
        orm_mode = True
