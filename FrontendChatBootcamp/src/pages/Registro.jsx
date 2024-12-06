import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_USER } from "../graphql/Users/mutations";


export const Registro = () => {

  const [formData, setFormData] = useState({ nombre: "", apellido: "" });
  const [createUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!formData.nombre || !formData.apellido) return alert('Llene los campos profavor')

      const { data } = await createUser({
        variables: { firstName: formData.nombre, lastName: formData.apellido,isLoggedIn:true },
      });
      console.log("Usuario creado:", data.createUser);
      localStorage.setItem("usuario",JSON.stringify(data.createUser));
      navigate("/chatear");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src="src/assets/images/img-01.png" alt="IMG" />
          </div>

          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title">ENTRA A CHATEAR</span>

            <div
              className="wrap-input100 validate-input"
            >
             <input
                className="input100"
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
            >
              <input
                className="input100"
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" type="submit">Entrar</button>
            </div>

          
          </form>
        </div>
      </div>
    </div>
  );
};

