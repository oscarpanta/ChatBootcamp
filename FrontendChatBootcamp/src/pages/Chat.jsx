import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "../graphql/Users/mutations";
import { FriendsChat } from "../components/FriendsChat";
import { MessagesChat } from "../components/MessagesChat";
import { useState } from "react";
export const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { id } = JSON.parse(localStorage.getItem("usuario"));
  const userId = id;
  const navigate = useNavigate();
  const [logoutUser, { loading, error }] = useMutation(LOGOUT_USER, {
    variables: { userId },
    onCompleted: () => {
      navigate("/");
    },
  });

  const handleLogout = () => {
    logoutUser();
  };
  if (loading) return <p>Procesando...</p>;
  if (error) return <p>Error al salir: {error.message}</p>;
  return (
    <main className="content mt-4">
      <div className="container p-0">
        <div className="d-flex justify-content-between mb-3">
          <h1 className="h3 mb-3">MENSAJES</h1>
     
          <button className="chat_button" onClick={handleLogout}>
            Salir
          </button>
        </div>

        <div className="card">
          <div className="row g-4">
            <FriendsChat onSelectUser={setSelectedUser} />
            {selectedUser ? (
              <MessagesChat user={selectedUser} />
            ) : (
              <div className="col-12 col-lg-6 col-xl-6 text-center selecciona">
                <p>SELECCIONA UN USUARIO PARA CHATEAR</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
