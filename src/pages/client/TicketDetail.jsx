import React, { useEffect, useState } from "react";
import check from "../../assets/check.svg";
import checkg from "../../assets/icons/checkg.svg";
import deleteI from "../../assets/icons/delete.svg";
import cross from "../../assets/icons/cross.svg";
import { Link, useParams } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleTicket,
  deleteTicket,
  clearErrors,
} from "../../redux/action/client/ticket";
import DetailForm from "../../components/DetailForm";
import { DELETE_TICKET_RESET } from "../../redux/type/client/ticket";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Chat from "../../components/Chat";
import Timeline from "../../components/Timeline";
import TeamImages from "../../components/TeamImages";
import Reporter from "../../components/Reporter";
import useCreatedBy from "../../hooks/useCreatedBy";

const TicketDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const alert = useAlert();

  const { singleTicket, ticketDeleted, error, loading } = useSelector(
    (state) => state.ticket
  );

  const user = JSON.parse(localStorage.getItem("user"));
  const auth = JSON.parse(localStorage.getItem("auth"));

  const [register, setRegister] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getSingleTicket(id));
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (ticketDeleted) {
      alert.success("Ticket deleted!");
      dispatch({ type: DELETE_TICKET_RESET });
      navigation("/");
    }
  }, [dispatch, alert, ticketDeleted, error]);

  const createdBy = useCreatedBy(singleTicket.createdBy);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="ticket_container d-flex flex-column">
      <DeleteModal
        isOpen={register}
        setIsOpen={setRegister}
        title={singleTicket.subject}
        action={() => {
          dispatch(deleteTicket(singleTicket.id, singleTicket.screenshot));
        }}
        message={
          <p className="mt-4">
            You are about to permanently delete this Ticket including all his
            data.
          </p>
        }
      />

      <Link to="/">
        <img className="cross" src={cross} alt="" />
      </Link>

      <div className="d-flex align-items-center color1 gap-2">
        {(singleTicket.status === "done" && (
          <img style={{ maxWidth: "20px" }} src={checkg} alt="" />
        )) || <img style={{ maxWidth: "20px" }} src={check} alt="" />}
        <p className="mb-0 fw400 f15 opacity-50">Ticket: {user.name}</p>
      </div>
      <p className="f18 mt-1">{singleTicket.subject}</p>

      <div className="main_chat_container">
        <div className="row gy-5">
          <div className="col-12 col-md-9">
            <Chat createdBy={createdBy[0]} singleTicket={singleTicket} />
          </div>
          <div className="col-12 col-md-3">
            <div className="d-flex flex-column h-100">
              <div className="details_container d-flex flex-column justify-content-between h-100">
                <div>
                  <h6 className="mb-0 fw400 px-2 pt-3 pb-2">Details</h6>
                  <hr className="my-1" />
                  {Object.keys(singleTicket).length && (
                    <DetailForm singleTicket={singleTicket} />
                  )}
                  <hr className="my-1" />
                  <ul className="list-unstyled d-flex flex-column gap-2 px-2 py-2 mb-0">
                    <li className="d-flex align-items-center justify-content-between">
                      <p className="mb-0">Team</p>
                      <TeamImages />
                    </li>
                    <Reporter createdBy={createdBy[0]} />
                  </ul>
                </div>
                <div className="px-2 py-1">
                  {auth?.projects && (
                    <button
                      onClick={() => {
                        setRegister(true);
                      }}
                      className="border-0 bg-transparent d-flex gap-1 align-items-center"
                    >
                      <img src={deleteI} alt="" />
                      Remove ticket
                    </button>
                  )}
                </div>
              </div>
              <Timeline singleTicket={singleTicket} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
