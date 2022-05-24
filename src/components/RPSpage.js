import { addDoc, collection, doc, Firestore, getDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { RPSChoice } from '../data'
import styled from "styled-components";

const Title = styled.h1`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 3.5em;
    text-align: center;
    margin-bottom: 0.5em;
`
const GameRecord = styled.h2`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.5em;
    text-align: center;
    border-bottom: 2px solid gray;
    margin-bottom: 0.5em;
`

const Image = styled.img`
    width: 60px;
    height: 100px;
    align-items: center;
    margin-top: 2em;
`

const PlayerChoice = styled.div`
    display: flex;
    justify-content: center;
    height: 400px;
    align-items: center;
`

const PlayerChoiceImage = styled.img`
    width: 60px;
    height: 60px;
    margin-top: 1em;
    border: none;
`

const ComputerChoiceImage = styled.img`
width: 60px;
    height: 60px;
    margin-top: 1em;
    border: none;
`

const GameResult = styled.h1`
font-size: 48px;
`

const InnerText = styled.p`
color: whitesmoke;
font-size: 2em;
opacity: 0;
transition: all 0.5s ease;
`

const Button = styled.button`
    width: 150px;
    height: 180px;
    border: 5px solid whitesmoke;
    border-radius: 50px;
    margin-top: 20px;
    margin-right: 20px;
    background-color: #323233;
    transition: all 0.5s ease;

    &:hover {
    background-color: #325544;;
    transform: translateY(-40px);
    height: 200px;
    width: 180px;
  }

    &:hover ${InnerText} {
        opacity: 1;
        transform: translateY(-10px);
    }
`

const Guide = styled.ul``

const GuideList = styled.li`
text-align: center;
font-weight: 500;
list-style: none;
margin-top: 3px;
color: gray;
`

const GuideDesc = styled.div`
background-color: white;
width: fit-content ;
margin: 10px auto 0px;
`



const RPSpage = () => {
    const [userChoice, setUserChoice] = useState(null)
    const [computerChoice, setComputerChoice] = useState(null)
    const [result, setResult] = useState('')
    const [score, setScore] = useState(0)
    const choices = ['rock', 'paper', 'scissors']
    const { user } = UserAuth()
    const [counter, setCounter] = useState(0)
    const [userWin, setUserWin] = useState(0)
    const [userLoss, setUserLoss] = useState(0)
    const [userDraw, setUserDraw] = useState(0)
    const [btn, setBtn] = useState(true)
    const [gameStats, setGameStats] = useState(0)
    const [totalScore, setTotalScores] = useState(0)
    const [username, setUsername] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')
    const [guide, setGuide] = useState(false)
    const [imgName, setImgName] = useState(null)
    const [compImgName, setCompImgName] = useState(null)

    let navigate = useNavigate()

    let id = user.uid

    const handleClick = (value) => {
        setUserChoice(require('../assets/image/' + value + '.png'))
        setImgName(value)
        generateComputerChoice()
        setCounter(counter + 1)
        stopGame()
    }

    const stopGame = () => {
        if (counter === 4) {
            setBtn(false)
        }
    }

    const gameStateRef = collection(db, 'gamestats')

    const btnClick = async () => {
        await addDoc(gameStateRef, {
            userid: user.uid,
            point: score,
            playCount: counter,
            userWin: userWin,
            userLoss: userLoss,
            userDraw: userDraw,
            username,
            img: photoUrl,
            createdAt: serverTimestamp()
        })
        navigate('/games')
    }

    const generateComputerChoice = () => {
        const randomChoice = choices[Math.floor(Math.random() * choices.length)]

        setCompImgName(randomChoice)

        if (randomChoice === 'rock') {
            setComputerChoice(require('../assets/image/rock.png'))
        } else if (randomChoice === 'paper') {
            setComputerChoice(require('../assets/image/paper.png'))
        } else {
            setComputerChoice(require('../assets/image/scissors.png'))
        }
    }

    useEffect(() => {
        checkResult()
    }, [userChoice, computerChoice])


    const checkResult = () => {
        switch (imgName + compImgName) {
            case 'scissorspaper':
            case 'rockscissors':
            case 'paperrock':
                setResult('YOU WIN!')
                setUserWin(userWin + 1)
                setScore(score + 10)
                break
            case 'paperscissors':
            case 'scissorsrock':
            case 'rockpaper':
                setResult('YOU LOSE!')
                setUserLoss(userLoss + 1)
                setScore(score - 5)
                break
            case 'rockrock':
            case 'paperpaper':
            case 'scissorsscissors':
                setResult('ITS A DRAW!')
                setScore(score + 0)
                setUserDraw(userDraw + 1)
                break
        }
    }

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "profiles"), where("userid", "==", user.uid || ''));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            console.log(data);
            setUsername(data.username)
            setPhotoUrl(data.photoUrl)
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUserName();
    }, []);

    return (
        <>
            <section className='dark-mode' style={{ height: '150vh' }}>
                <div className="container">
                    <Title>Rock - Paper - Scissors</Title>
                    <GameRecord>Game Stats</GameRecord>
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-info"><i className="fas fa-thumbs-up" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Win</span>
                                    <span className="info-box-number">{userWin}</span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        <div className="col-md-3 col-sm-6 col-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-success"><i className="fas fa-handshake" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Draw</span>
                                    <span className="info-box-number">{userDraw}</span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        <div className="col-md-3 col-sm-6 col-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-warning"><i className="fas fa-thumbs-down" /></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Loss</span>
                                    <span className="info-box-number">{userLoss}</span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        <div className="col-md-3 col-sm-6 col-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-danger"><i className="fas fa-chalkboard-teacher"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Score</span>
                                    <span className="info-box-number">{score}</span>
                                </div>
                                {/* /.info-box-content */}
                            </div>
                            {/* /.info-box */}
                        </div>
                        {/* /.col */}
                    </div>
                    <div className="row my-3">
                        <div className="col-md-4 d-flex flex-column">
                            <h2 className='align-self-center'>{username} Choice:</h2>
                            <PlayerChoiceImage src={userChoice} className="justify-content-center align-self-center" />
                            <h3 className='align-self-center'>{imgName}</h3>
                        </div>
                        <div className="col-md-4 text-center">
                            <GameResult className='p-5 font-weight-bold'>{result}</GameResult>
                        </div>
                        <div className="col-md-4 d-flex flex-column">
                            <h2 className='align-self-center'>Computer Choice:</h2>
                            <ComputerChoiceImage src={computerChoice} className="justify-content-center align-self-center" />
                            <h3 className='align-self-center'>{compImgName}</h3>
                        </div>

                        <PlayerChoice>
                            {RPSChoice.map((item) => <Button key={item.id} onClick={() => handleClick(item.choice)}><Image src={require('../assets/image/' + item.img + '.png')} /><InnerText>{item.choice}</InnerText></Button>)}
                        </PlayerChoice>
                        {/* {choices.map((choice, index) => <button key={index} className='col-1 btn btn-secondary btn-flat ml-1' onClick={() => handleClick(choice)}>{choice}</button>)} */}



                        <div className="">
                            <button className='btn btn-warning btn-flat mt-3 col-4 offset-4' type='submit' disabled={btn} onClick={btnClick}>Quit and Save</button>
                        </div>

                        <div className="">
                            <button className='btn btn-primary btn-flat mt-3 col-4 offset-4' type='button' onClick={() => setGuide(!guide)}>{guide === true ? 'Close Guide' : 'Guide'}</button>
                        </div>

                        {
                            guide && <GuideDesc>
                                <Guide>
                                    <GuideList>It's Player vs Computer Game</GuideList>
                                    <GuideList>Choose one between Rock, Paper or Scissors</GuideList>
                                    <GuideList>If you win the match, you'll get +10 points, lose -5 points and draw 0 point</GuideList>
                                    <GuideList>If you quit and save, your account score will updated with the amount of points you get</GuideList>
                                </Guide>
                            </GuideDesc>
                        }




                    </div>
                </div>
            </section>
        </>
    )
}

export default RPSpage