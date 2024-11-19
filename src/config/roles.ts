import { IRoles } from "../types/common";
import { EUserRole } from "./state";

const USER_PERMISSIONS = ["control_board", "control_event", "control_task"];

const ADMIN_PERMISSIONS = [
  "control_user",
  "control_role",
  "control_permission",
  "control_board",
  "control_event",
  "control_task",
];

const ROLES: Array<IRoles> = [
  {
    name: EUserRole.ADMIN,
    permissions: ADMIN_PERMISSIONS,
  },
  {
    name: EUserRole.USER,
    permissions: USER_PERMISSIONS,
  },
];
export default ROLES;
