"""u_id	u_display_name	u_email	u_role_name	u_list_permission_name"""

import uuid


class UserRolePermissionSchema:
    # Define keys for accessing properties
    U_ID = "_u_id"
    U_DISPLAY_NAME = "_u_display_name"
    U_EMAIL = "_u_email"
    U_ROLE_NAME = "_u_role_name"
    U_LIST_PERMISSION_NAME = "_u_list_permission_name"

    # Initialize properties

    _u_id: uuid.UUID
    _u_display_name: str
    _u_email: str
    _u_role_name: str
    _u_list_permission_name: list[str]

    def __init__(self, builder: "UserRolePermissionSchema.Builder"):
        # Set properties
        self._u_id = builder._u_id
        self._u_display_name = builder._u_display_name
        self._u_email = builder._u_email
        self._u_role_name = builder._u_role_name
        self._u_list_permission_name = builder._u_list_permission_name

    # Builder method
    @staticmethod
    def builder() -> "UserRolePermissionSchema.Builder":
        return UserRolePermissionSchema.Builder()

    @staticmethod
    def convert_str_to_list(str_permission: str) -> list[str]:
        return str_permission.split("-")

    # Getters
    @property
    def u_id(self) -> uuid.UUID:
        return self._u_id

    @property
    def u_display_name(self) -> str:
        return self._u_display_name

    @property
    def u_email(self) -> str:
        return self._u_email

    @property
    def u_role_name(self) -> str:
        return self._u_role_name

    @property
    def u_list_permission_name(self) -> list[str]:
        return self._u_list_permission_name

    # Builder class
    class Builder:
        _u_id: uuid.UUID
        _u_display_name: str
        _u_email: str
        _u_role_name: str
        _u_list_permission_name: list[str]

        def __init__(self):
            self._u_id = None
            self._u_display_name = None
            self._u_email = None
            self._u_role_name = None
            self._u_list_permission_name = None

        # Methods to set properties
        def with_u_id(self, u_id: uuid.UUID) -> "UserRolePermissionSchema.Builder":
            self._u_id = u_id
            return self

        def with_u_display_name(
            self, u_display_name: str
        ) -> "UserRolePermissionSchema.Builder":
            self._u_display_name = u_display_name
            return self

        def with_u_email(self, u_email: str) -> "UserRolePermissionSchema.Builder":
            self._u_email = u_email
            return self

        def with_u_role_name(
            self, u_role_name: str
        ) -> "UserRolePermissionSchema.Builder":
            self._u_role_name = u_role_name
            return self

        def with_u_list_permission_name(
            self, u_list_permission_name: list[str]
        ) -> "UserRolePermissionSchema.Builder":
            self._u_list_permission_name = u_list_permission_name
            return self

        # Build method
        def build(self) -> "UserRolePermissionSchema":
            return UserRolePermissionSchema(self)
