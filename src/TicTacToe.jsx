import { Replay } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Circle from './Partials/Circle';
import Close from './Partials/Close';


export default function TicTacToe({ auth }) {
    const [player, setPlayer] = useState(0);
    const [playerNames, setPlayerNames] = useState(localStorage.getItem('playerNames') || ['player 1', 'player 2']);
    const [board, setBoard] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [draw, setDraw] = useState(false);
    const [score, setScore] = useState(() => JSON.parse(localStorage.getItem('score')) || [0, 0]);

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

    }, [board]); 

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
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 bg-white dark:bg-slate-400/10 shadow sm:rounded-lg">
                        <div className='flex justify-between text-slate-400 font-extrabold px-2 pb-4 '>
                            <div>
                                <span className={`absolute text-4xl text-center select-none box-content font-extrabold ${player === 0 ? 'bg-gradient-to-r blur-md from-red-500 via-red-500 to-red-500 bg-clip-text text-transparent' : ''}`}>
                                    Player 1
                                </span>
                                <h1
                                className={`relative top-0 w-fit items-center font-extrabold text-4xl text-center select-auto ${player === 0 ? 'bg-gradient-to-r from-red-500 via-red-500 to-red-500 bg-clip-text text-transparent' : ''}`}>
                                    Player 1
                                </h1>
                            </div>
                            <div>
                                <span className={`absolute text-4xl text-center select-none box-content font-extrabold ${player === 1 ? 'bg-gradient-to-r blur-md from-blue-500 via-blue-500 to-blue-500 bg-clip-text text-transparent' : ''}`}>
                                    Player 2
                                </span>
                                <h1
                                    className={`relative top-0 w-fit items-center font-extrabold text-4xl text-center select-auto ${player === 1 ? 'bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 bg-clip-text text-transparent' : ''}`}>
                                    Player 2
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
                        <div className='flex justify-end pr-7 text-4xl'>
                                <button
                                className='rounded-md flex items-center bg-slate-200 dark:bg-slate-700 p-1'
                                    onClick={resetGame}
                                    title='Reset'
                                ><Replay fontSize='inherit' className='text-slate-400' /></button>
                        </div>
                        <div>
                            <div className='flex justify-around text-slate-300 text-xl font-semibold'>
                                <div className='text-red-500'>
                                    <h1>Player 1</h1>
                                    <h1 className='flex justify-center'>
                                        {score[0]}
                                    </h1>
                                </div>
                            <h1 className='flex justify-center font-extrabold text-3xl text-green-500'>Score Board</h1>
                                <div className='text-blue-500'>
                                    <h1>
                                        Player 2
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
                                        <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl box-content font-extrabold text-transparent text-center select-none">
                                            {draw ? 'Draw' : ('Player ' + (winner) + ' wins')}
                                        </span>
                                        <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-none">
                                            {draw ? 'Draw' : ('Player ' + (winner) + ' wins')}
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
