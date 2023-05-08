import { rulesAdmin, rulesOthers } from '../constants/roles';
import ability from './ability';

function getPermissionGroup(permissions) {
  if (permissions.length > 0) {
    return permissions.map(({ methods, keyId: subject }) => {
      if (methods?.length > 0) {
        const methodGroup = methods.filter((method) => method.isEnabled);
        return {
          action: methodGroup[0].keyId,
          subject,
        };
      }
      return [];
    });
  }
  return [];
}

function getPermissionsRole(authorId, listPermissions) {
  if (listPermissions.length > 0) {
    return Array.prototype.concat.apply(
      [],
      listPermissions.map(({ methods, keyId: subject }) => {
        if (methods?.length > 0) {
          const enabledPermissions = methods.filter(
            (method) => method.isEnabled,
          );
          if (enabledPermissions.length > 0) {
            return enabledPermissions.map(({ method }) => {
              return {
                action: method,
                subject,
                conditions: {
                  authorId,
                },
              };
            });
          }
        }
        return [];
      }),
    );
  }
  return [];
}

function addAuthorPermission(authorId, listPermission) {
  return listPermission.map((permission) => {
    return {
      ...permission,
      conditions: {
        authorId,
      },
    };
  });
}

export const updatePermissionsAbility = (
  authorId,
  { type, permissions },
  permissionsGroup,
) => {
  if (type === 'ADMIN') {
    ability.update(rulesAdmin);
  } else {
    ability.update([
      ...getPermissionsRole(authorId, [...permissions]),
      ...addAuthorPermission(authorId, rulesOthers),
      ...getPermissionGroup(permissionsGroup),
    ]);
  }
};
