import React, { useEffect, useState } from "react";
import cross from "../../assets/icons/crossW.svg";
import TeamCard from "../../components/TeamCard";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getTeam } from "../../redux/action/admin/team";
import TeamForm from "../../components/TeamForm";
import Loader from "../../components/Loader";
import { DELETE_TEAM_RESET } from "../../redux/type/admin/team";

const Teams = () => {
  const [register, setRegister] = useState(false);
  const [editData, setEditData] = useState(false);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { team, error, loading, teamDeleted } = useSelector(
    (state) => state.team
  );

  useEffect(() => {
    dispatch(getTeam());
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (teamDeleted) {
      alert.success("Member deleted!");
      dispatch({ type: DELETE_TEAM_RESET });
    }
  }, [dispatch, alert, teamDeleted, error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="admin_clients_container">
      {register && (
        <TeamForm
          register={register}
          setRegister={setRegister}
          editData={editData}
          setEditData={setEditData}
        />
      )}

      <div className="container-fluid">
        <div className="inner_admin_clients_container">
          <div className="d-flex justify-content-between">
            <h5 className="fw400">TEAM</h5>
            <button
              onClick={() => {
                setRegister(true);
                setEditData(null);
              }}
              className="bg-transparent border-0"
            >
              <img src={cross} alt="" />
            </button>
          </div>

          <div className="clients_container mt-3">
            {(team.length &&
              team.map((content, i) => {
                return (
                  <div key={i}>
                    <TeamCard
                      {...content}
                      setEditData={setEditData}
                      setRegister={setRegister}
                    />
                  </div>
                );
              })) || (
              <div className="text-white text-center py-3">no data found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
