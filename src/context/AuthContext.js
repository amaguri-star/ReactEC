import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// createContext()でコンテキストオブジェクトを作成
// Providerと、Consumerというコンポーネントを所持している。
// 
// ■ Provider
// Providerコンポネントは、propsとしてvalueを受け取ります。
// このvalueに入れるのが、実際に配下のコンポーネントに渡したい値。通常バケツリレーしていた値。
// Providerコンポーネントではvalueが変更されると配下のコンポーネントを再レンダーします。
// その際の比較方法は参照の同一性のため、プリミティブ値以外を渡す場合は参照の変更の有無に気をつける必要がある。
//
// ■ Consumer
// これも同様にコンテキストオブジェクトから引っ張ってきます。
// Providerにvalueとして渡した値を受け取る為のコンポーネントです。
// Render Propsになっているので、Consumerコンポーネントのprops.childに対して関数を渡すと、その引数に値が入ります。
//
// hooksでは？
// React.useContextを使います。
// const resourceName = React.useContext(ResourceContext);
// ↑こんな感じで使う。Consumerを使う機会はあまりないかもです。
const AuthContext = createContext();

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    // {}でwrapしている?
    const value = { user, loading };

    /**
     * ■ useEffectとは？
     * 関数の実行タイミングをReactのレンダリング後まで遅らせるhook
     * 第一引数には実行させたい副作用関数を記述（戻り値はクリーンアップ関数）
     * 第二引数には副作用関数の実行タイミングを制御する依存データを記述
     * 
     * ■ 初回レンダリング時のみ副作用関数を実行させる
     * 副作用関数を初回レンダリング時の一度だけ実行させたい場合、第二引数に空の依存配列[]を指定します。
     * 
     * ■ 依存配列の値が変化した場合のみ副作用関数を実行させる
     * useEffect（）の第２引数に[count]を渡すと、countに変化があったときだけ副作用関数を実行します。
     * */
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            setLoading(false);
        });

        // ■ クリーンアップについて
        // クリーンアップとはイベントリスナの削除、タイマーのキャンセルなどのこと。
        // クリーンアップ関数をreturnすると、２度目以降のレンダリング時に副作用を消してしまうことができる。
        // useEffect()では、副作用関数がクリーンアップ関数を返すことで、マウント時に実行した処理をアンマウント時に解除します。
        // またその副作用関数は、毎回のレンダリング時に実行され、新しい副作用関数を実行する前に、ひとつ前の副作用処理をクリーンアップします。
        return () => {
            unsubscribed();
        };
    }, []);

    // ■ Context.Provider
    // <MyContext.Provider value={/* 何らかの値 */}>
    // loadingがfalseの時と、childrenがある時？
    if (loading) {
        return <p>laoding...</p>
    } else {
        return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
    }
}