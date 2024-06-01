import uuid
from typing import Optional

from sqlalchemy import text
from sqlalchemy.orm import Session

from backend.common.logger import setup_logger
from backend.schemas.user_role_permission_schema import \
    UserRolePermissionSchema

logger = setup_logger()


GET_USER_ROLE_PERMISSION = f"""
                            WITH detailed_role_permission_info AS ( 
                                SELECT 
                                    r.id AS r_id, 
                                    r.role_name AS r_role_name, 
                                    STRING_AGG(CONCAT(p.permission_name, '-'), '') AS p_list_str_permissions 
                                FROM roles AS r 
                                JOIN roles_permissions AS rp ON r.id = rp.role_id 
                                JOIN permissions AS p ON rp.permission_id = p.id 
                                AND r.deleted_at IS NULL 
                                AND rp.deleted_at IS NULL 
                                AND p.deleted_at IS NULL 
                                GROUP BY r.id 
                            ) 
                            SELECT 
                                u.id AS {UserRolePermissionSchema.U_ID}, 
                                u.display_name AS {UserRolePermissionSchema.U_DISPLAY_NAME}, 
                                u.email AS {UserRolePermissionSchema.U_EMAIL}, 
                                drpi.r_role_name AS {UserRolePermissionSchema.U_ROLE_NAME}, 
                                drpi.p_list_str_permissions AS u_list_permission_name 
                            FROM users AS u 
                            JOIN detailed_role_permission_info AS drpi 
                            ON u.role_id = drpi.r_id 
                            WHERE u.id = :user_id
                            AND u.deleted_at IS NULL;
                        """


class CRUDUserRolePermission:
    def get_user_role_permission(
        self, db: Session, user_id: uuid.UUID
    ) -> Optional[UserRolePermissionSchema]:
        result_proxy = db.execute(text(GET_USER_ROLE_PERMISSION), {"user_id": user_id})
        column_names = result_proxy.keys()
        result = result_proxy.fetchone()

        if result:
            result_dict = dict(zip(column_names, result))
            builder = UserRolePermissionSchema.builder()
            """u_id	u_display_name	u_email	u_role_name	u_list_permission_name"""
            builder.with_u_id(
                result_dict[UserRolePermissionSchema.U_ID]
            ).with_u_display_name(
                result_dict[UserRolePermissionSchema.U_DISPLAY_NAME]
            ).with_u_email(
                result_dict[UserRolePermissionSchema.U_EMAIL]
            ).with_u_role_name(
                result_dict[UserRolePermissionSchema.U_ROLE_NAME]
            ).with_u_list_permission_name(
                UserRolePermissionSchema.convert_str_to_list(
                    result_dict["u_list_permission_name"]
                )
            )

            user_role_permission = builder.build()
            return user_role_permission

        else:
            return None


crud_user_role_permission = CRUDUserRolePermission()
