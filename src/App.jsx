import {useState, useContext} from "react";
import {Link, Routes, Route} from "react-router-dom";
import Chatgpt from "./chatgpt"

function App() {

    return (
        <div>
            <Header/>
            <div className="max-w-5xl mx-auto">
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/pictures"} element={<Pictures/>}/>
                    <Route path={"/home"} element={<Home/>}/>
                    <Route path={"/contact"} element={<Contact/>}/>
                    <Route path={"/chatgpt"} element={<Chatgpt/>}/>
                </Routes>
            </div>
        </div>
    )
}

function Header() {
    return (
        <div className="p-4 mb-5">
            <nav className="space-x-4 text-xl flex justify-center items-center shadow">
                <Link className="px-8 py-5 block" to="/home">Home</Link>
                <Link className="px-8 py-5 block" to="/pictures">Pictures</Link>
                <Link className="px-8 py-5 block" to="/contact">Contact</Link>
                <Link className="px-8 py-5 block" to="/chatgpt">Chatgpt</Link>
                <a href="https://abc.qyzhizi.cn:8080/"
                   className="flex gap-2 items-start justify-start">
                    <span>lzp blog</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                </a>
            </nav>
        </div>
    )
}

function Image({ src, width }) {
    return (
        <img 
            src={src} 
            alt="" 
            style={{ width: `${width}px`, height: 'auto', objectFit: 'contain' }} 
        />
    );
}

function Pictures() {
    return (
        <div className="space-y-16 text-center">
            <h2 className="text-2xl">This is Pictures.</h2>
            <div className="flex gap-4 flex-wrap items-start">
                <Image 
                    src="https://openai-75050.gzc.vod.tencent-cloud.com/openaiassets_e07d6a54917baf0dc57fe6611f3da362_2579861727268007477.jpeg"
                    width={500} 
                />
                <Image 
                    src="https://openai-75050.gzc.vod.tencent-cloud.com/openaiassets_76099698d8cb082fbf1a4fd7bf37f76b_2579861727268062932.jpeg"
                    width={500} 
                />
            </div>
        </div>
    );
}

function Home() {
    return (
        <div className="flex justify-center flex-col items-center">
            <img src="https://openai-75050.gzc.vod.tencent-cloud.com/openaiassets_c4b71326604a6203f73a10ea231bc603_2579861727268109318.jpg" alt="" className="rounded-full mb-20" style={{ width: '100px',height: 'auto', objectFit: 'contain' }}/>
            
            <h2 className="text-2xl mb-10">Home <a href="https://qyzhizi-github-io.vercel.app/"
                                                    className="font-bold uppercase text-blue-400">Hollis</a></h2>
            <p>Hello , everyone , I'm Hollis.
            </p>
        </div>
    )
}

function Contact() {
    return (
        <div>
            <h2 className="text-2xl mb-10">Contact me</h2>
            <p className="text-lg">Email: <a href="l2830942138@gmail.com"
                                             className="underline text-blue-700 leading-relaxed">l2830942138@gmail.com</a>
            </p>
        </div>
    )
}

// function Chatgpt(){
//     return (
//         <div className="text-center">
//             <h2 className="text-2xl mb-10">Chatgpt</h2>

//         </div>
//     )
// }


export default App
