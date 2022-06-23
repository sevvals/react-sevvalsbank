import React from 'react';
import { UserContext } from '../components/user-context';
import Card from '../components/card';
import './styles/transaction-history.css';

function History() {
    const ctx = React.useContext(UserContext);
    const [status, setStatus] = React.useState('');
    const [show, setShow] = React.useState(() => {
        if (ctx.currentUser) {
            return true;
        } else {
            return false;
        }
    });

    function Transaction({ t }) {
        const date = `${t.month + 1}/${t.day}/${t.year}`;
        const time = `${t.hour}:${t.minutes}:${t.seconds}`
        let amount;
        if (t.amount > 0) {
            amount = `Yatırıldı - $${t.amount}`
        } else {
            amount = `Çekildi - $${t.amount}`
        };
        return (
            <div className="transaction">{date} - {time} - {amount}</div>
        )
    }


    return (
        <Card
            bgcolor="main"
            header="Hesap Hareketleri"
            status={status}
            body={show ? (
                <>
                    <h5>Hoşgeldiniz {ctx.currentUser.name}</h5>
                    <h6>Bakiyeniz:</h6>
                    <h6>${ctx.currentUser.balance}</h6>
                    <h6>Hesap Hareketleri</h6>
                    {ctx.currentUser.history.map((transaction, i) =>
                        <Transaction key={i} t={transaction} />
                    )}
                </>
            ) : (
                <>
                    <h5>Devam etmek için giriş yapmalısınız</h5>
                </>
            )}
        />
    );
}

export default History;