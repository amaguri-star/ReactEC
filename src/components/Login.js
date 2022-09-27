import { auth, provider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const history = useHistory();
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((res) => {
                console.log(res);
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    };

    const handleLogin = async (event) => {
        try {
            await signInWithPopup(auth, provider);
            history.push('/');
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }

    return (
        <div>
            <h1>ログイン</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>メールアドレス</label>
                    <input name="email" type="email" placeholder="email" />
                </div>
                <div>
                    <label>パスワード</label>
                    <input name="password" type="password" placeholder="password" />
                </div>
                <div>
                    <button>ログイン</button>
                </div>
                <div>
                    ユーザ登録<Link to={'/signup'}>こちら</Link>から
                </div>
            </form>
            <hr />
            <button onClick={handleLogin}>Googleログイン</button>
        </div>
    );
};

export default Login;