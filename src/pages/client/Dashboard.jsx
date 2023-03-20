import React, { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard";
import add from "../../assets/icons/add.svg";
import TicketForm from "../../components/TicketForm";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getTicket } from "../../redux/action/client/ticket";
import { DELETE_TICKET_RESET } from "../../redux/type/client/ticket";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const [tickets, setTickets] = useState([
    {
      heading: "TO DO",
      tickets: [],
    },
    {
      heading: "In Progress",
      tickets: [],
    },
    {
      heading: "DONE",
      tickets: [],
    },
  ]);
  const [register, setRegister] = useState(false);
  const [editData, setEditData] = useState(false);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { ticket, error, loading, ticketDeleted } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    dispatch(getTicket());
  }, []);

  useEffect(() => {
    console.log(ticket, "ticket");
    const todo = ticket.filter(({ status }) => status === "todo");
    const progress = ticket.filter(({ status }) => status === "progress");
    const done = ticket.filter(({ status }) => status === "done");
    setTickets([
      {
        heading: "TO DO",
        tickets: todo,
      },
      {
        heading: "In Progress",
        tickets: progress,
      },
      {
        heading: "DONE",
        tickets: done,
      },
    ]);
  }, [ticket]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (ticketDeleted) {
      alert.success("Ticket deleted!");
      dispatch({ type: DELETE_TICKET_RESET });
    }
  }, [dispatch, alert, ticketDeleted, error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="dashboard_container">
      <TicketForm
        register={register}
        setRegister={setRegister}
        editData={editData}
        setEditData={setEditData}
      />

      <div className="container-fluid">
        <div className="row gy-3">
          {tickets.map((content, i) => {
            return (
              <div key={i} className="col-12 col-md-4">
                <div className="task_container">
                  <h6 className="text-uppercase">{content.heading}</h6>

                  <div className="inner_container one">
                    {content.tickets.map((content, i) => {
                      return (
                        <div key={i}>
                          <TaskCard
                            {...content}
                            setEditData={setEditData}
                            setRegister={setRegister}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {i === 0 && (
                    <div className="todo_actions">
                      <button onClick={() => setRegister(true)}>
                        <img src={add} alt="" />
                        Create ticket
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
