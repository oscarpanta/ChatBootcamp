import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { SEND_MESSAGE } from "../../graphql/Messages/mutatios";
import { GET_MESSAGES_BY_USER } from "../../graphql/Messages/queries";
import { MESSAGE_SUBSCRIPTION } from "../../graphql/Messages/subscriptions";

export const MessagesChat = ({ user }) => {
  console.log(user);
  const { id, lastName, firstName } = JSON.parse(
    localStorage.getItem("usuario")
  );
  const usuarioActivo = firstName + " " + lastName;
  const userId = id;
  const receiverId = user.id;
  const { data, loading, error, refetch } = useQuery(GET_MESSAGES_BY_USER, {
    variables: { userId, receiverId },
  });
  console.log(data);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { receiverId },

    onSubscriptionData: ({ subscriptionData }) => {
      console.log("Nuevo mensaje recibido:", subscriptionData.data.messageSent);
      refetch();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;

    try {
      const senderId = userId.toString();
      const { data } = await sendMessage({
        variables: { content, senderId, receiverId },
      });
      console.log("Mensaje enviado:", data.sendMessage);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }

    e.target.reset();
  };

  if (loading) return <p>Cargando mensajes...</p>;
  if (error) return <p>Error al cargar mensajes: {error.message}</p>;

  return (
    <div className="col-12 col-lg-7 col-xl-7 chattt">
      <div className="py-2 px-4 d-none d-lg-block info_user">
        <div className="d-flex align-items-center py-1">
          <div className="position-relative">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar3.png"
              className="rounded-circle mr-1"
              alt="Sharon Lessman"
              width="40"
              height="40"
            />
          </div>
          <div className="flex-grow-1 pl-3">
            <strong>
              {user.firstName} {user.lastName}
            </strong>
          </div>
        </div>
      </div>

      <div className="position-relative">
        <div className="chat-messages p-4">
          {data.getmessagesByUserReceive?.map((msg) => (
            <div
              key={msg.timestamp}
              className={`chat-message-${
                msg.senderId === userId.toString() ? "right" : "left"
              } pb-4`}
            >
              <div>
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  className="rounded-circle mr-1"
                  alt={user.firstName}
                  width="40"
                  height="40"
                />
                <div className="text-muted small text-nowrap mt-2">
                  {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true, 
                  })}
                </div>
              </div>
              <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                <div className="font-weight-bold mb-1">
                  {/* {usuarioActivo} */}
                  {msg.senderId === userId.toString()
                    ? usuarioActivo
                    : `${user.firstName} ${user.lastName}`}
                </div>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      {!user.isLoggedIn ? (
        <p className="desconect">Usuario desconectado</p>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex-grow-0 py-3 px-4 border-top">
          <div className="input-group">
            <input
              type="text"
              name="content"
              className="form-control"
              placeholder="Escribe tu mensaje"
            />
            <button className="btn btn-primary">Enviar Mensaje</button>
          </div>
        </div>
      </form>
    </div>
  );
};
