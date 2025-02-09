import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const AdminSignup = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/admin";
            const { data: res } = await axios.post(url, data);
            window.location.href = "/admin/AdminLogin";
            console.log(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/admin/Login">
                        <button type="button" className={styles.white_btn}>
                            Admin Sign in
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                       
                        <h1>Create Admin Account</h1>                 
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <Link to="/admin/Login">
                        <button type="submit" className={styles.adminButton}>
                            Admin Sign Up
                        </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminSignup;
