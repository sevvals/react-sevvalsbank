import React                    from 'react';
import { UserContext }          from '../components/user-context';
import Card                     from '../components/card';
import { datedTransaction }     from '../components/dated-transaction';
import validate                 from '../components/validate';

function Deposit() {
    const ctx = React.useContext(UserContext);

    const [status, setStatus]     = React.useState('');
    const [deposit, setDeposit]   = React.useState(0);
    const [message, setMessage]   = React.useState(null);
    const [enable, setEnable]     = React.useState(false);
    const [show, setShow]         = React.useState(() => {
        if (ctx.currentUser) {
            return true;
        } else {
            return false;
        }
    });
    
    function handleSubmit() {
        if (deposit <= 0) {
            setMessage('Please enter a number greater than zero');
            return;
        }
        let i = ctx.userIndex;
        let currentBalance = Number(ctx.users[i].balance);
        ctx.users[i].balance = currentBalance + Number(deposit);
        const currentTransaction = datedTransaction(deposit);
        ctx.users[i].history.splice(0,0,currentTransaction);
        ctx.currentUser = ctx.users[i];
        setMessage(`İşlem Başarılı $${deposit}`)
        setDeposit(0)
        setEnable(false);
    };

    const validateThis = () => {
        if (validate(deposit, 'Yatırılacak tutarı giriniz', setStatus))
            {
                return true
            } else {
                return false
            };
    };

    const makeChange = (e, setThis) => {
        setThis(e.currentTarget.value);
        if (validateThis())
            {setEnable(true)};
    }; 

    return (
        <Card
            bgcolor="main"
            header="Para Yatır"
            status={status}
            body={show ? (
                <>
                    <h5><center>Hoşgeldiniz {ctx.currentUser.name}</center></h5>
                    
                    <h6><center>Mevcut bakiyeniz:</center></h6>
                    <center>${ctx.currentUser.balance}</center>
                    
                    Yatırılacak Tutar:<br/>
                    <input type="number" className="form-control" id="deposit" placeholder="Yatırılacak tutarı giriniz." value={deposit} onChange={e => {makeChange(e, setDeposit)}}/><br/>
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

export default Deposit;