import {
  UPDATE,
  EXPORT,
  IMPORT,
  FUSE,
  DUPLICATE,
  SHARE,
  USER_MANAGEMENT,
  ENTERPRISE_MANAGEMENT,
} from './methods';
import {
  PERMISSIONS_ALL,
  PERMISSIONS_ACTIVITIES,
  PERMISSIONS_NOTES,
  PERMISSIONS_FILES,
} from './permissions';

/* ROLES */
// Superadmin ALL
export const SUPERADMIN = 'SUPERADMIN';
// Just admin -> suscription, billing, invoices, users
export const ADMIN = 'ADMIN';
// Only allow modules
export const OTHER = 'OTHER';

export const rulesAdmin = [
  {
    action: 'manage',
    subject: PERMISSIONS_ALL,
  },
  {
    action: EXPORT,
    subject: PERMISSIONS_ALL,
  },
  {
    action: IMPORT,
    subject: PERMISSIONS_ALL,
  },
  {
    action: FUSE,
    subject: PERMISSIONS_ALL,
  },
  {
    action: DUPLICATE,
    subject: PERMISSIONS_ALL,
  },
  {
    action: SHARE,
    subject: PERMISSIONS_ALL,
  },
  {
    action: USER_MANAGEMENT,
    subject: PERMISSIONS_ALL,
  },
  {
    action: ENTERPRISE_MANAGEMENT,
    subject: PERMISSIONS_ALL,
  },
];

export const rulesOthers = [
  {
    action: UPDATE,
    subject: PERMISSIONS_ACTIVITIES,
  },
  {
    action: UPDATE,
    subject: PERMISSIONS_NOTES,
  },
  {
    action: UPDATE,
    subject: PERMISSIONS_FILES,
  },
];
