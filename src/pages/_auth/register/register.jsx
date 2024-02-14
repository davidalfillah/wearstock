import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    slug: "david-alfillah",
    email: "",
    password: "",
    avatar: "",
    isAdmin: false,
  });
  const [msg, setMsg] = useState("");

  const saveUser = async (e) => {
    try {
      await axios.post("http://localhost:3307/users", registerData);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const logout = () => {};

  return (
    <div>
      {/* Formulir pendaftaran */}
      <input
        type="text"
        placeholder="Nama"
        value={registerData.name}
        onChange={(e) =>
          setRegisterData({ ...registerData, name: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={registerData.email}
        onChange={(e) =>
          setRegisterData({ ...registerData, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={registerData.password}
        onChange={(e) =>
          setRegisterData({ ...registerData, password: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Avatar URL"
        value={registerData.avatar}
        onChange={(e) =>
          setRegisterData({ ...registerData, avatar: e.target.value })
        }
      />
      <button onClick={saveUser}>Registrasi</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Register;
