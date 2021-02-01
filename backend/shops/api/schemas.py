from marshmallow import Schema, fields


class SizeSchema(Schema):
    name = fields.String()


class ProductSizeSchema(Schema):
    quantity = fields.Integer()
    size = fields.Nested(SizeSchema)
