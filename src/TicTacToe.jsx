import { Replay, Settings } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Circle from './Partials/Circle';
import Close from './Partials/Close';
import React from "react";


export default function TicTacToe({ auth }) {
    const [player, setPlayer] = useState(0);
    const [playerNames, setPlayerNames] = useState(JSON.parse(localStorage.getItem('playerNames')) || ['Player 1', 'Player 2']);
    const [board, setBoard] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [draw, setDraw] = useState(false);
    const [score, setScore] = useState(() => JSON.parse(localStorage.getItem('score')) || [0, 0]);
    const [showModal, setShowModal] = React.useState(false);
    const [player1Name, setPlayer1Name] = useState(playerNames[0]);
    const [player2Name, setPlayer2Name] = useState(playerNames[1]);
    
    useEffect(() => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                const winningPlayer = board[a] === 'X' ? 1 : 2;
                if (!gameOver) {
                    setWinner(winningPlayer);
                    setGameOver(true);
                    setScore((prevScore) => {
                        const newScore = [...prevScore];
                        newScore[winningPlayer - 1]++;
                        return newScore;
                    });
                }
                return;
            }
        }

        if (board.every(cell => cell !== null) && !winner) {
            setGameOver(true);
            setDraw(true);
        }

        if (!gameOver) {
            setPlayer((prevPlayer) => (prevPlayer === 1 ? 0 : 1));
        }

    }, [board, gameOver, winner]); 

    useEffect(() => {
        localStorage.setItem('score', JSON.stringify(score));
    }, [score]);

    function resetGame() {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setGameOver(false);
        setDraw(false);
        setPlayer(Math.floor(Math.random() * 2)); 
    }
    function resetScores() {
        localStorage.setItem('score', JSON.stringify([0,0]));
        setScore([0,0]);
        setBoard(Array(9).fill(null));
        setShowModal(false);
    }
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 bg-white dark:bg-slate-400/10 shadow sm:rounded-lg">
                        <div className='flex justify-between text-slate-400 font-extrabold px-2 pb-4 '>
                            <div>
                                <span className={`absolute text-4xl text-center select-none box-content font-extrabold ${player === 0 ? 'bg-gradient-to-r blur-md from-red-500 via-red-500 to-red-500 bg-clip-text text-transparent' : ''}`}>
                                    {playerNames[0]}
                                </span>
                                <h1
                                className={`relative top-0 w-fit items-center font-extrabold text-4xl text-center select-auto ${player === 0 ? 'bg-gradient-to-r from-red-500 via-red-500 to-red-500 bg-clip-text text-transparent' : ''}`}>
                                    {playerNames[0]}
                                </h1>
                            </div>
                            <div>
                                <span className={`absolute text-4xl text-center select-none box-content font-extrabold ${player === 1 ? 'bg-gradient-to-r blur-md from-blue-500 via-blue-500 to-blue-500 bg-clip-text text-transparent' : ''}`}>
                                    {playerNames[1]}
                                </span>
                                <h1
                                    className={`relative top-0 w-fit items-center font-extrabold text-4xl text-center select-auto ${player === 1 ? 'bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 bg-clip-text text-transparent' : ''}`}>
                                    {playerNames[1]}
                                </h1>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="text-black text-2xl dark:text-slate-400 font-semibold ">
                                <div className="grid grid-cols-3 gap-2">
                                    {[...Array(9)].map((_, i) => (
                                        <button key={i}
                                        onClick={() => {
                                            board[i] = player === 0 ? 'X' : 'O';
                                            setBoard([...board]);
                                        }}
                                        disabled={board[i] || winner}
                                        className={`flex items-center ${board[i] ? 'bg-slate-300 dark:bg-slate-950' : 'bg-slate-200 dark:bg-slate-900'} text-6xl p-4 rounded-md ${!(board[i] || winner) && 'hover:bg-slate-300 dark:hover:bg-slate-950'} cursor-default`}>
                                        <Box
                                            sx={{
                                                height: 40,
                                                width: 40,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {board[i] === 'X' && <Close />}
                                            {board[i] === 'O' && <Circle />}
                                        </Box>
                                    </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end pr-2 text-4xl'>
                            <button
                            className='rounded-md flex items-center bg-slate-200 dark:bg-slate-700 p-1 m-1'
                                onClick={resetGame}
                                title='Reset'
                            >
                                <Replay fontSize='inherit' className='text-slate-400' />
                            </button>

                            <button
                                className="rounded-md flex items-center bg-slate-200 dark:bg-slate-700 p-1 m-1"
                                type="button"
                                onClick={() => setShowModal(true)}
                            >
                                <Settings fontSize='inherit' className='text-slate-400' />
                            </button>
                            {showModal && (
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50"
                                    onClick={() => setShowModal(false)}
                                >
                                    <div 
                                        className={`relative w-auto my-6 mx-auto max-w-sm transform transition-all duration-300 ${
                                        showModal ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-slate-800 outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 dark:border-slate-700 rounded-t">
                                                <h3 className="text-3xl font-semibold text-slate-700 dark:text-slate-400">
                                                    Player Names
                                                </h3>
                                            </div>
                                            <div className="p-4">
                                                <div className="relative z-0 w-full mb-5 group">
                                                    <input type="text" name="player1" id="player1" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                    value={player1Name}
                                                    onChange={(e) => setPlayer1Name(e.target.value)}
                                                    />
                                                    <label htmlFor="player1" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Player 1</label>
                                                </div>
                                                <div className="relative z-0 w-full mb-5 group">
                                                    <input type="text" name="player2" id="player2" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                                    value={player2Name}
                                                    onChange={(e) => setPlayer2Name(e.target.value)}
                                                    />
                                                    <label htmlFor="player2" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Player 2</label>
                                                </div>
                                                <div className="relative z-0 w-full group flex justify-end">
                                                    <button type="button" className="rounded flex items-center bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 hover:dark:bg-slate-600 p-1 m-1 text-slate-400 font-bold text-xl" onClick={resetScores}>
                                                        Reset stats
                                                        </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 dark:border-slate-700 rounded-b">
                                                <button
                                                    className="text-red-500 hover:text-slate-200 hover:bg-slate-600 rounded-md background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Close
                                                </button>
                                                <button
                                                    className="bg-slate-900 text-slate-400 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => {
                                                        setPlayerNames([player1Name || 'Player 1', player2Name || 'Player 2']);
                                                        localStorage.setItem('playerNames', JSON.stringify([player1Name || 'Player 1', player2Name || 'Player 2']))
                                                        setShowModal(false);
                                                    }}
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <div className='flex justify-around text-slate-300 text-xl font-semibold'>
                                <div className='text-red-500'>
                                    <h1>{playerNames[0]}</h1>
                                    <h1 className='flex justify-center'>
                                        {score[0]}
                                    </h1>
                                </div>
                            <h1 className='flex justify-center font-extrabold text-3xl text-green-500'>Score Board</h1>
                                <div className='text-blue-500'>
                                    <h1>
                                    {playerNames[1]}
                                    </h1>
                                    <h1 className='flex justify-center'>
                                        {score[1]}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {(winner || draw) &&
                            <>
                                <div className='flex justify-center'>
                                    <div className="flex w-full items-center justify-center">
                                        <h1 
                                        className="absolute py-4 w-fit font-extrabold text-transparent text-center select-none from-red-500 via-purple-500 to-blue-500 bg-clip-text text-6xl flex
                                        
                                        border justify-center bg-gradient-to-r blur-xl items-center">
                                            {draw ? 'Draw' : (playerNames[winner-1] + ' wins')}
                                        </h1>
                                        <h1 
                                        className="relative py-4 w-fit font-extrabold text-transparent text-center select-none from-red-500 via-purple-500 to-blue-500 bg-clip-text text-6xl flex
                                        
                                        justify-center  bg-gradient-to-r items-center ">
                                            {draw ? 'Draw' : (playerNames[winner-1] + ' wins')}
                                        </h1>

                                    </div>

                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
