const UsersConnected = ({user}) => {
  return (
    <a href="#" className="list-group-item list-group-item-action border-0"
    style={{display: "flex",justifyContent:"space-between",alignItems:"center"}}>
      
      <div className="d-flex align-items-start">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar5.png"
          className="rounded-circle mr-1"
          alt="user.firstName"
          width="40"
          height="40"
        />
        <div className="flex-grow-1 ml-3">
          <span className="letra">{user.firstName} {user.lastName}</span>
          <div className="small">
            <p className="fas fa-circle chat-online letra_connected"></p> {user.isLoggedIn ?'Conectado' : 'Desconectado'}
          </div>
        </div>
      </div>
      <div 
      className={`float-right ${user.isLoggedIn ? "bg-success" : "bg-danger"}`}
      style={{width: "10px",height:"10px"}}
      >

      </div>
    </a>
  );
};

export default UsersConnected;
