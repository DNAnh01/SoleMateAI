import '~/App.css';
import Hero from './components/organisms/Hero';
import { heroApi } from '~/data/data.js';
import Navbar from './components/organisms/Navbar';
import Cart from './components/organisms/Cart';

function App() {
    return (
        <>
            <Navbar />
            <Cart />
            <main className="flex flex-col gap-16 relative">
                <Hero heroApi={heroApi} />
            </main>
        </>
    );
}

export default App;
