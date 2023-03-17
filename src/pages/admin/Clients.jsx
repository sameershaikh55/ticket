import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import cross from "../../assets/icons/crossW.svg";
import ClientCard from "../../components/ClientCard";
import ClientForm from "../../components/ClientForm";
import Loader from "../../components/Loader";
import { clearErrors, getClient } from "../../redux/action/admin/clients";
import { DELETE_CLIENT_RESET } from "../../redux/type/admin/clients";

const Client = () => {
  const [register, setRegister] = useState(false);
  const [editData, setEditData] = useState(false);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { clients, error, loading, clientDeleted } = useSelector(
    (state) => state.client
  );

  useEffect(() => {
    dispatch(getClient());
  }, []);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (clientDeleted) {
      alert.success("Member deleted!");
      dispatch({ type: DELETE_CLIENT_RESET });
    }
  }, [dispatch, alert, clientDeleted, error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="admin_clients_container">
      {register && (
        <ClientForm
          register={register}
          setRegister={setRegister}
          editData={editData}
          setEditData={setEditData}
        />
      )}

      <div className="container-fluid">
        <div className="inner_admin_clients_container">
          <div className="d-flex justify-content-between">
            <h5 className="fw400">CLIENTS</h5>
            <button
              onClick={() => setRegister(true)}
              className="bg-transparent border-0"
            >
              <img src={cross} alt="" />
            </button>
          </div>

          <div className="clients_container mt-3">
            {(clients.length &&
              clients.map((content, i) => {
                return (
                  <div key={i}>
                    <ClientCard
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

export default Client;
