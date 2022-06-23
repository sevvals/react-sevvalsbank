import React                    from 'react';
import { UserContext }          from '../components/user-context';
import Card                     from '../components/card';
import { datedTransaction }     from '../components/dated-transaction';
import validate                 from '../components/validate';

function Withdraw() {
    const ctx = React.useContext(UserContext);

    const [status, setStatus]       = React.useState('');
    const [withdraw, setWithdraw]   = React.useState(0);
    const [message, setMessage]     = React.useState(null);
    const [enable, setEnable]       = React.useState(false);
    const [show, setShow]           = React.useState(() => {
        if (ctx.currentUser) {
            return true;
        } else {
            return false;
        }
    });
    
    function handleSubmit() {
        let i = ctx.userIndex;
        let currentBalance = Number(ctx.users[i].balance);

        if (currentBalance < Number(withdraw)) {
            setMessage(`İstenen miktar mevcut bakiyenizi aşıyor`);
            setWithdraw(0);
            return;
        }

        if (withdraw <= 0) {
            setMessage('Lütfen sıfırdan büyük bir tutar giriniz');
            return;
        }
        ctx.users[i].balance = currentBalance - Number(withdraw);
        const currentTransaction = datedTransaction((0 - Number(withdraw)));
        ctx.users[i].history.splice(0,0,currentTransaction);
        ctx.currentUser = ctx.users[i];
        setMessage(`Başarılı $${withdraw}`)
        setWithdraw(0)
        setEnable(false);
    };

    const validateThis = () => {
        if (validate(withdraw, 'lütfen miktarı girin', setStatus))
            {
                return true
            } else {
                return false
            };
    };

    const makeChange = (e, setThis) => {
        setThis(e.currentTarget.value);
        setMessage(null);
        if (validateThis())
            {setEnable(true)};
    }; 

    return (
        <Card
            bgcolor="main"
            header="Havale"
            status={status}
            body={show ? (
                <>
                    <h5>Hoşgeldiniz {ctx.currentUser.name}</h5>
                    <h6>Mevcut bakiyeniz:</h6>
                    <h6>${ctx.currentUser.balance}</h6>
                    Havale<br/>
                    <input type="number" className="form-control" id="withdraw" placeholder="Havale yapılacak miktarı giriniz" value={withdraw} onChange={e => {makeChange(e, setWithdraw)}}/><br/>
                    <button type="submit" disabled={!enable} className="btn btn-light" onClick={handleSubmit}>DEVAM</button><br/><br/>
                    {message && <h5>{message}</h5>}
                </>
            ):(
                <>
                    <h5>Devam etmek için giriş yapmalısınız</h5>
                </>
            )}
        />
    );
}

export default Withdraw;