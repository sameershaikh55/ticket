import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getManager } from "../redux/action/admin/managers";
import { getTeam } from "../redux/action/admin/team";

const useCreatedBy = (id) => {
  const dispatch = useDispatch();

  const { team } = useSelector((state) => state.team);
  const { managers } = useSelector((state) => state.manager);

  useEffect(() => {
    if (!team.length) {
      dispatch(getTeam());
    }
    if (!managers.length) {
      dispatch(getManager());
    }
  }, []);

  const createdBy = [...team, ...managers].filter(
    (content) => content.id === id
  );

  return createdBy;
};

export default useCreatedBy;
