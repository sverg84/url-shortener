from piccolo.columns import Boolean, Integer, Text
from piccolo.table import Table

class URL(Table, tablename="urls"):
    key: Text = Text(unique=True, index=True)
    secret_key: Text = Text(unique=True, index=True)
    target_url: Text = Text(index=True)
    is_active: Boolean = Boolean(default=True)
    clicks: Integer = Integer()
