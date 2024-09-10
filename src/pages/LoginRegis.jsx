import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/AuthService'

export function LoginRegisPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        email: ""
    });
    const navigate = useNavigate();
   
    const handleLogin = async () => {
        let hasError = false;
        const newErrors = { username: "", password: "" };

        if (!username) {
            newErrors.username = "Username is required";
            hasError = true;
        }
        if (!password) {
            newErrors.password = "Password is required";
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) return;

        try {
            const user = { username, password };
            const response = await login(user);
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.username));
            navigate(`/`);
            window.location.reload();
            console.log(localStorage.getItem('user'))
            console.log("Login successful:", response.data.data.username);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleRegister = async () => {
        let hasError = false;
        const newErrors = { username: "", password: "", email: "" };

        if (!username) {
            newErrors.username = "Username is required";
            hasError = true;
        }
        if (!password) {
            newErrors.password = "Password is required";
            hasError = true;
        }
        if (!email) {
            newErrors.email = "Email is required";
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) return;

        try {
            const newUser = { username, password, email };
            const response = await register(newUser);
            console.log(response);
            setIsLogin(true);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };


    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: 8}}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    {isLogin ? "Login" : "Register"}
                </Typography>

                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ mt: 1 }}
                >
                    {isLogin ? (
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={Boolean(errors.username)}
                                helperText={errors.username}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2, backgroundColor:'#e5b41a',color:'black'}}
                                onClick={handleLogin}
                            >
                                Sign In
                            </Button>
                        </>
                    ) : (
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2,backgroundColor:'#e5b41a',color:'black' }}
                                onClick={handleRegister}
                            >
                                Register
                            </Button>
                        </>
                    )}

                    <Button
                        fullWidth
                        variant="text"
                        sx={{ mt: 2,color:'black' }}
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "No account yet?" : "Already have account"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default LoginRegisPage;
