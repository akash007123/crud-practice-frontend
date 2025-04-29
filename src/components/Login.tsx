import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { LoginRequest } from "../api/authTypes";

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginRequest>({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(form);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button className="btn btn-primary" type="submit">Login</button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default Login;