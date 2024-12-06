import { useState } from "react";
import { useDebounce } from "use-debounce";
import UsersConnected from "../FriendsChat/UsersConnected";
import { useQuery, useSubscription } from "@apollo/client";
import {
  USER_ADDED_SUBSCRIPTION,
  USER_LOGGED_OUT_SUBSCRIPTION,
} from "../../graphql/Users/suscriptions";
import { GET_USERS } from "../../graphql/Users/queries";

export const FriendsChat = ({ onSelectUser }) => {
  const [search, setSearch] = useState("");

  const [searchDebounce] = useDebounce(search, 500);

  const { loading, data, refetch } = useQuery(GET_USERS, {
    variables: { search: searchDebounce },
  });
  const { id } = JSON.parse(localStorage.getItem("usuario"));

  const filteredUsers = data?.users?.filter(user => user.id !== id) || [];

  useSubscription(USER_LOGGED_OUT_SUBSCRIPTION, {
    onSubscriptionData: () => {
      refetch();
    },
  });
  useSubscription(USER_ADDED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("Nuevo ususario recibido:", subscriptionData.data.messageSent);
      refetch();
    },
  });

  console.log(data);

  const _handleSearch = (e) => {
    setSearch(e.target.value);
    refetch({ search: e.target.value });
  };

  if (loading) return <p>Cargando usuarios...</p>;
  return (
    <div className="col-12 col-lg-6 col-xl-5">
      <div className="px-4 d-none d-md-block">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">
            <input
              type="text"
              className="form-control my-3 input_background"
              placeholder="Buscar usuario..."
              value={search}
              onChange={_handleSearch}
            />
          </div>
        </div>
      </div>

      {/* {users.map((user) => ( */}
      {filteredUsers.map((user) => (
        <div key={user.id} onClick={() => onSelectUser(user)}>
          <UsersConnected user={user} />
        </div>
      ))}

      <hr className="d-block d-lg-none mt-1 mb-0" />
    </div>
  );
};
