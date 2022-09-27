import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";

const SignUp = () => {
    const history = useHistory();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Eメール/パスワード方式でユーザ登録を行う。
        // firebase ver9から記法が変更したらしく、
        // 第一引数にauthを渡す + 非同期として定義してあげないとエラーにはまる（はまった）ので注意
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => history.push('/'))
            .catch((err) => setError(err.message));
    }

    const handleChangeEmail = (event) => {
        setEmail(event.currentTarget.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.currentTarget.value);
    }
    return (
        <div>
            <h1>ユーザ登録</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>メールアドレス</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="email"
                        onChange={(event) => handleChangeEmail(event)} />
                </div>
                <div>
                    <label>パスワード</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={(event) => handleChangePassword(event)} />
                </div>
                <div>
                    <button>登録</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;