import { useState, useEffect} from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db'

function App() {

    // State
    const [data, setData] = useState([]) // inicio como arreglo vacío
    const [cart, setCart] = useState([]) // inicio como arreglo vacío

    // cuando utilizo api uso useEffect ==> llama al api una vez que todo el front esté cargado.
    useEffect(() =>{
        setData(db)
    }, [])

    function addToCart(item){
        const indexExist = cart.findIndex(guitar => guitar.id === item.id)
        console.log(indexExist)
        if(indexExist === -1){
            item.quantity = 1
            setCart([...cart, item])
        }
        else{
            const updatedCart = [...cart]
            updatedCart[indexExist].quantity ++
            setCart(updatedCart)
            console.log("elemento ya existe")
        }
    }
    
    return (
        <>
            <Header
                cart={cart}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar)=>(
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            addToCart={addToCart}
                        />
                    ))}
                    
                </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App
