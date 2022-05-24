import React from 'react'
import video_game from '../../assets/image/gamebg.jpg'
import { Link } from 'react-router-dom'
import Slider from "./Slider";
import travel_02 from "../../assets/image/suwit.png";
import travel_03 from "../../assets/image/comingsoon.jpg";
import metacritic from "../../assets/image/metacritic.png";
import ign from "../../assets/image/ign.png";
import gamespot from "../../assets/image/gamespot.png";


const LandingPage  = () => {
   return (
       <>
             <section
      className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start" style={{height:'100vh'}}
    >
      <div className="container">
        <div className="d-sm-flex align-items-center justify-content-between">
          <div>
            <h1>Exciting Games That Will Not Dissapoint</h1>
            <p className="lead my-5">
              Bored with mediocre game out there?, just try our games now
            </p>
            <Link to='/signup'
              className="btn btn-warning btn-lg col-8"
            >
              Sign Up and Play
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

    <section
      className="bg-light text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start" style={{height:'100vh'}}
    >
      <div className="container">
        <div className="d-sm-flex align-items-center justify-content-between">
        <Slider
        imageSrc={travel_02}
        title={"Unique Rock Paper Siscors."}
        subtitle={
          "Try out world best addictive rock paper siscors"
        }
      />
        </div>
      </div>
    </section>

    <section
      className="bg-light text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start" style={{height:'100vh'}}
    >
      <div className="container">
        <div className="d-sm-flex align-items-center justify-content-between">
      <Slider
        imageSrc={travel_03}
        title={"Memories for a Freetime."}
        subtitle={"Your dream games is made by us."}
        flipped={true}
      />
        </div>
      </div>
    </section>

    <section>
    <div className='p-4'>
        <div className="container">
        <h1>Our Studio Review</h1>
          <div className="row text-center g-4">
            <div className="col-md">
              <div className="card bg-dark text-light" style={{height:'320px'}}>
                <div className="card-body text-center">
                  <div className="mb-3">
                    <img src={ign} style={{width:'150px'}} />
                  </div>
                  <h4 className='my-2 text-uppercase'>Fun Play</h4>
                  <p className="card-text">
                    <small>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Iure, quas quidem possimus dolorum esse eligendi?
                    </small>
                  </p>
                  {/* <a href="#" className="btn btn-primary">Read More</a> */}
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="card bg-secondary text-light" style={{height:'320px'}}>
                <div className="card-body text-center">
                  <div className="mb-3">
                  <img src={gamespot} style={{width:'130px'}} />
                  </div>
                  <h4 className='my-2 text-uppercase'>Great Games</h4>
                  <p className="card-text">
                    <small>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Iure, quas quidem possimus dolorum esse eligendi?
                    </small>
                  </p>
                  {/* <a href="#" className="btn btn-dark">Read More</a> */}
                </div>
              </div>
            </div>
            <div className="col-md">
            <div className="card bg-dark text-light" style={{height:'320px'}}>
                <div className="card-body text-center">
                  <div className="mb-3">
                    <img src={metacritic} style={{width:'150px'}} />
                  </div>
                  <h4 className='my-2 text-uppercase'>Very Addictive</h4>
                  <p className="card-text">
                    <small>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Iure, quas quidem possimus dolorum esse eligendi?
                    </small>
                  </p>
                  {/* <a href="#" className="btn btn-primary">Read More</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
   
       </>
   )
}

export default LandingPage