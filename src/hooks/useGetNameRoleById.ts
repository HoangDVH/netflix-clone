import { useGetRoleByIdQuery } from "../apis/accountUser";


const useGetRolesByIds = (roleIds: never[]) => {
  const roles = roleIds.map((roleId) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: roleData } = useGetRoleByIdQuery(roleId);
    return { roleData };
  });
  return roles;
};

export default useGetRolesByIds;
