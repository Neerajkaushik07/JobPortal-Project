import React from 'react'
import { Navbar } from 'react-bootstrap'
import Navigation from '../components/navigation/Navigation'
import { Link } from 'react-router-dom'

const Home = () => {
    return ( <><Navbar/>
    <Navigation/>
                <body className="bg-gradient-to-r from-indigo-500 to-purple-500">
                    <div className="container mx-auto px-4">
                        
                        <header className="text-white py-10">
                            <h1 className="text-4xl font-bold text-center text-white mb-6"> Job finder</h1>
                            <div className="mt-4 flex justify-center gap-2">
                                <input type="text" placeholder="Creative Design" className="p-3 rounded-l bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
                                <input type="text" placeholder="Town/city or postcode" className="p-3 bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
                                <button className="bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white p-3 rounded-r transition-colors duration-300">Search</button>
                            </div>
                        </header>
                
                        
                        <main className="pt-10 pb-16">
                            
                            <section className="bg-white p-8 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-semibold text-indigo-600 mb-4">How it works</h2>
                                <p className="text-gray-700 leading-relaxed mb-6">Swimming hundreds of feet beneath the surface in cold parts of the world, marine mammals gather around arctic ice sheets in giant survival gears. These remarkable creatures are about the size of large fridges, but nifty. They crawl on ice sheets to bask.</p>
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full transition-colors duration-300"> <Link to="/dashboard">Get Started</Link></button>
                            </section>
                
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                                
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="text-xl font-semibold text-indigo-600 mb-4">Apply job</h3>
                                    <p className="text-gray-700 mb-4">While many of the collisions of dust particles hitting the spacecraft are perfectly written the name of the rings, we cannot hear it.</p>
                                    <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center transition-colors duration-300">Know more <span className="ml-2">&#8594;</span></a>
                                </div>
                                
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="text-xl font-semibold text-indigo-600 mb-4">Search your job</h3>
                                    <p className="text-gray-700 mb-4">Wires many of the collisions of dust particles hitting the spacecraft are perfectly written the name of the rings, we cannot hear it.</p>
                                    <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center transition-colors duration-300">Know more <span className="ml-2">&#8594;</span></a>
                                </div>
                                
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h3 className="text-xl font-semibold text-indigo-600 mb-4">Submit resume</h3>
                                    <p className="text-gray-700 mb-4">Wires many of the collisions of dust particles hitting the spacecraft are perfectly written the name of the rings, we cannot hear it.</p>
                                    <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center transition-colors duration-300">Know more <span className="ml-2">&#8594;</span></a>
                                </div>
                            </div>
                        </main>
                    </div>
                </body>
                </>
            )
}

export default Home