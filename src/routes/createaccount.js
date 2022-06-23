import React from 'react';
import Card from '../components/card';
import { UserContext } from '../components/user-context';
import validate from '../components/validate';

function CreateAccount() {
    const ctx = React.useContext(UserContext);

    const [show, setShow]                   = React.useState(true);
    const [status, setStatus]               = React.useState('');
    const [errorMessage, setErrorMessage]   = React.useState(null);
    const [enable, setEnable]               = React.useState(false);
    const [name, setName]                   = React.useState('');
    const [email, setEmail]                 = React.useState('');
    const [password, setPassword]           = React.useState('');
 
    function handleCreate() {
        console.log(name,email,password);
        if (!validateThis()) return;
        if (!email.includes('@') || !email.includes('.')) {
            setErrorMessage('Email adresini kontrol edin. "@" ve "." içermelidir.');
            return
        }
        if (password.length < 8) {
            setErrorMessage('Şifreniz en az 8 karakter uzunluğunda olmalıdır.');
            return
        }
        setErrorMessage(null);
        ctx.users.push({name:name,email:email,password:password,balance:100,history:[]});
        const newUserIndex = ctx.users.length - 1;
        ctx.currentUser = ctx.users[newUserIndex];
        ctx.userIndex = newUserIndex;
        setShow(false);
    }
    
    
    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
        setEnable(false);
    }

    const validateThis = () => {
        if (validate(name, 'Lütfen isminizi giriniz.', setStatus) &&
            validate(email, 'Lütfen email giriniz.', setStatus) &&
            validate(password, 'Lütfen bir parola giriniz.', setStatus))
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
             header="Hesap Açma"
             status={status}
             body={show ? (
                 <>
                     İsim<br/>
                     <input type="input" className="form-control" id="name" placeholder="İsim giriniz" value={name} onChange={e => {makeChange(e, setName)}}/><br/>
                     Email<br/>
                     <input type="input" className="form-control" id="email" placeholder="Email giriniz" value={email} onChange={e => {makeChange(e, setEmail)}}/><br/>
                     Şifre<br/>
                     <input type="password" className="form-control" id="password" placeholder="Şifre giriniz" value={password} onChange={e => {makeChange(e, setPassword)}}/><br/>
                     <button type="submit" disabled={!enable}className="btn btn-light" onClick={handleCreate}>DEVAM</button>
                     <br/><br/>
                     {errorMessage && <h5>{errorMessage}</h5>}
                 </>
             ):(
                 <>
                     <h5>Başarılı! Hoşgeldiniz {ctx.currentUser.name}</h5>
                     <p>Hesabınız oluşturuldu ve giriş yaptınız.</p>
                     <button type="submit" className="btn btn-light" onClick={clearForm}>Başka bir hesap aç</button>
 
                 </>
             )}        
        />
    )
 }

 export default CreateAccount;