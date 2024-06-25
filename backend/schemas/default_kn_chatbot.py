"""shoe_id	shoe_name	brand_name	size_number	color_name	discounted_price  created_at	promotion_name	promotion_start_date	promotion_end_date	promotion_discount_percent"""

import uuid
from datetime import datetime


class DefaultKNChatbotSchema:
    # Define keys for accessing properties
    SHOE_ID = "_shoe_id"
    SHOE_NAME = "_shoe_name"
    BRAND_NAME = "_brand_name"
    SIZE_NUMBER = "_size_number"
    COLOR_NAME = "_color_name"
    DISCOUNTED_PRICE = "_discounted_price"
    CREATED_AT = "_created_at"
    PROMOTION_NAME = "_promotion_name"
    PROMOTION_START_DATE = "_promotion_start_date"
    PROMOTION_END_DATE = "_promotion_end_date"
    PROMOTION_DISCOUNT_PERCENT = "_promotion_discount_percent"

    # Initialize properties
    _shoe_id: uuid.UUID
    _shoe_name: str
    _brand_name: str
    _size_number: int
    _color_name: str
    _discounted_price: float
    _created_at: str
    _promotion_name: str
    _promotion_start_date: str
    _promotion_end_date: str
    _promotion_discount_percent: float

    def __init__(self, builder: "DefaultKNChatbotSchema.Builder"):
        # Set properties
        self._shoe_id = builder._shoe_id
        self._shoe_name = builder._shoe_name
        self._brand_name = builder._brand_name
        self._size_number = builder._size_number
        self._color_name = builder._color_name
        self._discounted_price = builder._discounted_price
        self._created_at = builder._created_at
        self._promotion_name = builder._promotion_name
        self._promotion_start_date = builder._promotion_start_date
        self._promotion_end_date = builder._promotion_end_date
        self._promotion_discount_percent = builder._promotion_discount_percent

    @staticmethod
    def convert_date(date_string):
        if date_string is None or date_string.lower() == 'none':
            return None
        try:
            # Parse the date string into a datetime object
            dt = datetime.fromisoformat(date_string)
            # Format the datetime object into the desired format
            return dt.strftime("%d-%m-%Y")
        except ValueError:
            # Handle invalid date string formats
            return None

    # Builder method
    @staticmethod
    def builder() -> "DefaultKNChatbotSchema.Builder":
        return DefaultKNChatbotSchema.Builder()

    # Getters
    def get_shoe_id(self) -> uuid.UUID:
        return self._shoe_id

    def get_shoe_name(self) -> str:
        return self._shoe_name

    def get_brand_name(self) -> str:
        return self._brand_name

    def get_size_number(self) -> int:
        return self._size_number

    def get_color_name(self) -> str:
        return self._color_name

    def get_discounted_price(self) -> float:
        return self._discounted_price
    
    def get_created_at(self) -> str:
        return self._created_at

    def get_promotion_name(self) -> str:
        return self._promotion_name

    def get_promotion_start_date(self) -> str:
        return self._promotion_start_date

    def get_promotion_end_date(self) -> str:
        return self._promotion_end_date

    def get_promotion_discount_percent(self) -> float:
        return self._promotion_discount_percent

    # Builder class
    class Builder:
        _shoe_id: uuid.UUID
        _shoe_name: str
        _brand_name: str
        _size_number: int
        _color_name: str
        _discounted_price: float
        _created_at: str
        _promotion_name: str
        _promotion_start_date: str
        _promotion_end_date: str
        _promotion_discount_percent: float

        def __init__(self):
            self._shoe_id = None
            self._shoe_name = None
            self._brand_name = None
            self._size_number = None
            self._color_name = None
            self._discounted_price = None
            self._created_at = None
            self._promotion_name = None
            self._promotion_start_date = None
            self._promotion_end_date = None
            self._promotion_discount_percent = None

        # Methods to set properties
        def with_shoe_id(self, shoe_id: uuid.UUID) -> "DefaultKNChatbotSchema.Builder":
            self._shoe_id = shoe_id
            return self

        def with_shoe_name(self, shoe_name: str) -> "DefaultKNChatbotSchema.Builder":
            self._shoe_name = shoe_name
            return self

        def with_brand_name(self, brand_name: str) -> "DefaultKNChatbotSchema.Builder":
            self._brand_name = brand_name
            return self

        def with_size_number(
            self, size_number: int
        ) -> "DefaultKNChatbotSchema.Builder":
            self._size_number = size_number
            return self

        def with_color_name(self, color_name: str) -> "DefaultKNChatbotSchema.Builder":
            self._color_name = color_name
            return self

        def with_discounted_price(
            self, discounted_price: float
        ) -> "DefaultKNChatbotSchema.Builder":
            self._discounted_price = discounted_price
            return self
        
        def with_created_at(
            self, created_at: str
        ) -> "DefaultKNChatbotSchema.Builder":
            self._created_at = created_at
            return self

        def with_promotion_name(
            self, promotion_name: str
        ) -> "DefaultKNChatbotSchema.Builder":
            self._promotion_name = promotion_name
            return self

        def with_promotion_start_date(
            self, promotion_start_date: str
        ) -> "DefaultKNChatbotSchema.Builder":
            self._promotion_start_date = promotion_start_date
            return self

        def with_promotion_end_date(
            self, promotion_end_date: str
        ) -> "DefaultKNChatbotSchema.Builder":
            self._promotion_end_date = promotion_end_date
            return self

        def with_promotion_discount_percent(
            self, promotion_discount_percent: float
        ) -> "DefaultKNChatbotSchema.Builder":
            self._promotion_discount_percent = promotion_discount_percent
            return self

        # Build method
        def build(self) -> "DefaultKNChatbotSchema":
            return DefaultKNChatbotSchema(self)
