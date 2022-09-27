import { auth } from "../firebase";
import { Redirect, useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
    // useHistoryとは？
    const history = useHistory();
    const { user } = useAuthContext();

    const handleLogout = () => {
        signOut(auth)
            .then(() => console.log('ログアウト成功'))
            .catch((err) => console.log(err));
        history.push('/login');
    };
    if (!user) {
        return <Redirect to="/login" />
    } else {
        return (
            <div>
                <h1>ホームページ1</h1>
                <button onClick={handleLogout}>ログアウト</button>
            </div>
        );
    }
};

export default Home;