import { subject } from '@casl/ability';
import ability from '@/services/ability';
import { ALL, GROUP } from '@/constants/methods';
import { GET_USER_LOGGED } from '@/graphql/local-state/queries';

export const permissionGroupMixin = {
  data() {
    return {
      membersGroup: [],
    };
  },
  methods: {
    canGroup(method, permission, permissionGroup, owner) {
      const ownerCopyId = owner.authorId;
      if (ownerCopyId) {
        return (
          ability.can(method, subject(permission, { authorId: ownerCopyId })) ||
          (ability.can(ALL, permissionGroup) &&
            ability.can(method, permission)) ||
          (ability.can(GROUP, permissionGroup) &&
            this.membersGroup.includes(ownerCopyId) &&
            ability.can(method, permission))
        );
      }
      return false;
    },
  },
  apollo: {
    membersGroup: {
      query: GET_USER_LOGGED,
      update({ userCurrent }) {
        return userCurrent.membersGroup;
      },
    },
  },
};
