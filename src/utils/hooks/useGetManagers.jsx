import { useSelector } from "react-redux";

export const useGetManagers = (clientId) => {
  const { managers } = useSelector((state) => state.manager);
  const filterManagers = managers.filter(({ client }) => client === clientId);
  return filterManagers;
};
