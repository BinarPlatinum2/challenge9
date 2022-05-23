import React, { useEffect, useState } from 'react'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { Link } from 'react-router-dom'

const GamePages = () => {
    const [games, setGames] = useState([])

    const gamesCollectionRef = collection(db, "games")
    const getGames = async () => {
        try {
            const data = await getDocs(gamesCollectionRef)
            console.log(data.docs);
            setGames(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGames()
    }, [])


    return (
        <>
            <section className="bg-dark p-3" style={{ height: '100vh' }}>
                <div className="container">
                    <h5 className='text-warning mb-3'>Recommended for you</h5>
                    <div className="row">
                        {
                            games.map((e) => {
                                return (
                                    <div className="col-sm-4" key={e.id}>
                                        <div className="position-relative" style={{ height: '250px' }}>
                                            <img src={e.imageUrl} alt="Photo 3" className="img-fluid" style={{ height: '205px', width: '100%' }} />
                                            <div className="ribbon-wrapper ribbon-xl">
                                                <div className="ribbon bg-danger text-md">
                                                    {e.title}
                                                </div>
                                            </div>
                                            <Link to='/rps' className='btn btn-warning mt-1 col-12'>Play Now</Link>
                                            <div className="card mt-2 bg-dark">
                                                <div className="card-footer">
                                                    <p className="text-light"><small>{e.account}</small></p>
                                                    <p className="text-light"><small>{e.release} | {e.platform} | {e.genre} | {e.developer}</small></p>
                                                    <p className='text-secondary'><small>{e.description}</small></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default GamePages