import Card from '../components/card';
import image from '../images/bankimg.jpg'

function Home() {
    return (
        <Card
            txtcolor="white"
            bgcolor="main"
            header="HOŞGELDİNİZ"
            width="50rem"
            body={

                <div className="landing ">
                    <div className='img-mk'>
                        <img classname="" src={image} style={{ width: 350 }}></img>
                    </div>

                    <div className="align-right">
                        <h5 className="pushed">Eğer şimdi bir hesap açarsanız:</h5>
                        <ul>
                            <li className="extra-pushed">Anında $100 hediye!</li>
                            <li className="extra-pushed">Havale yaparken işlem ücreti yok!</li>
                            <li className="extra-pushed">Kişisel bilgileriniz bizimle güvende!</li>
                        </ul>
                    </div>
                </div>

            }
        />
    );
}

export default Home;