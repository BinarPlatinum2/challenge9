import React from 'react'
import video_game from '../assets/image/video_game.svg'
import multi_player from '../assets/image/multi_player.svg'
import score_rank from '../assets/image/score_rank.svg'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Home = () => {
  const { user } = UserAuth()
  return (
    <>
     <section
      className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start" style={{height:'100vh'}}
    >
      <div className="container">
        <div className="d-sm-flex align-items-center justify-content-between">
          <div>
            <h1>Work hard  ,<span className="text-warning"> Play hard </span></h1>
            <p className="lead my-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ipsa expedita id laudantium velit ducimus.
            </p>
            <Link to='/signup'
              className="btn btn-warning btn-lg col-8"
            >
              Sign Up for free
            </Link>
          </div>
          <img
            className="img-fluid w-50 d-none d-sm-block"
            src={video_game}
            alt=""
          />
        </div>
      </div>
    </section>
    <div className='p-4'>
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md">
              <div className="card bg-dark text-light" style={{height:'320px'}}>
                <div className="card-body text-center">
                  <div className="mb-3">
                    <img src={video_game} style={{width:'150px'}} />
                  </div>
                  <h4 className='my-2 text-uppercase'>Fun Play</h4>
                  <p className="card-text">
                    <small>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Iure, quas quidem possimus dolorum esse eligendi?
                    </small>
                  </p>
                  <a href="#" className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card bg-secondary text-light" style={{height:'320px'}}>
                <div className="card-body text-center">
                  <div className="mb-3">
                  <img src={multi_player} style={{width:'130px'}} />
                  </div>
                  <h4 className='my-2 text-uppercase'>multi player support</h4>
                  <p className="card-text">
                    <small>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Iure, quas quidem possimus dolorum esse eligendi?
                    </small>
                  </p>
                  <a href="#" className="btn btn-dark">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-md">
            <div className="card bg-dark text-light" style={{height:'320px'}}>
                <div className="card-body text-center">
                  <div className="mb-3">
                    <img src={score_rank} style={{width:'150px'}} />
                  </div>
                  <h4 className='my-2 text-uppercase'>Score Rank</h4>
                  <p className="card-text">
                    <small>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Iure, quas quidem possimus dolorum esse eligendi?
                    </small>
                  </p>
                  <a href="#" className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home