import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB9o8-LYeKrg2q84dxQM5Z1wFKHjt9yHFo",
    authDomain: "digital-pay-haiti.firebaseapp.com",
    projectId: "digital-pay-haiti",
    storageBucket: "digital-pay-haiti.firebasestorage.app",
    messagingSenderId: "182015693140",
    appId: "1:182015693140:web:8a2486b9446bfb791bf8c1",
    measurementId: "G-7JK3CTR4C9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Données des produits
const productData = {
    gaming: [
        { name: "One State", price: "Recharges", img: "onestate.png" },
        { name: "Free Fire", price: "110+10💎 = 157 HTG", img: "freefire-logo.png" },
        { name: "Blood Strike", price: "Recharges", img: "Bloodstrike.png" },
        { name: "Call of Duty", price: "Recharges", img: "callofduty.png" },
        { name: "Minecraft", price: "316 HTG", img: "minecraft-logo.png" },
        { name: "Roblox", price: "750 HTG", img: "roblox-logo.png" },
        { name: "FC Mobile", price: "Recharges", img: "fcmobile.png" },
        { name: "PUBG Mobile", price: "180 Gdes", img: "pubgmobile-logo.png" }
    ],
    streaming: [
        { name: "Netflix", price: "1 Mois = 400 Gdes", img: "netflix.png" },
        { name: "Crunchyroll", price: "1 Mois = 425 Gdes", img: "crunchyroll.png" },
        { name: "Disney+", price: "1 Mois = 625 Gdes", img: "disneyplus.png" },
        { name: "Prime Video", price: "1 Mois = 425 Gdes", img: "primevideo.png" }
    ],
    finance: [
        { name: "Binance (USDT)", price: "Transferts", img: "binance.png" },
        { name: "Meru", price: "Transferts", img: "meru.png" },
        { name: "Wise", price: "International", img: "wise.png" },
        { name: "PayPal", price: "En ligne", img: "paypal.png" }
    ],
    giftcard: [
        { name: "Apple", price: "App Store", img: "applegc.png" },
        { name: "Netflix", price: "Cartes", img: "netflixgc.png" },
        { name: "PlayStation", price: "PSN Store", img: "playstationgc.png" },
        { name: "Steam", price: "Wallet", img: "steamgc.png" },
        { name: "Google Play", price: "Android", img: "googleplaygc.png" }
    ],
    social: [
        { name: "Telegram", price: "Stars / Premium", img: "telegram.png" },
        { name: "TikTok", price: "Pièces", img: "tiktok.png" }
    ]
};

export default function HomePage() {
    const router = useRouter();
    const [showRedirect, setShowRedirect] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    
    useEffect(() => {
        // Détection utilisateur connecté
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                clearTimeout(window.redirectTimer);
                router.push('/home');
            }
        });
        
        // Redirection au bout de 5 secondes (délai total avant la barre de progression)
        window.redirectTimer = setTimeout(() => {
            setShowRedirect(true);
            // La barre de progression CSS dure 3s, puis redirection
            setTimeout(() => {
                router.push('/authentification/login');
            }, 3000);
        }, 5000);
        
        return () => {
            clearTimeout(window.redirectTimer);
            unsubscribe();
        };
    }, [router]);
    
    // Fonction pour afficher les grilles produits
    const renderGrid = (title, items, link) => (
        <section className="pb-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-orbitron text-xl font-bold">{title}</h2>
                    <Link href={link} className="text-blue-500 text-sm font-semibold hover:text-white transition">
                        Voir tout <i className="fa-solid fa-arrow-right ml-1"></i>
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.map((item, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500 hover:-translate-y-2 transition duration-300 cursor-pointer">
                            <div className="aspect-square bg-black/40 flex items-center justify-center">
                                <img src={`/assets/${item.img}`} alt={item.name} className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'} />
                            </div>
                            <div className="p-3 bg-white/5 border-t border-white/5">
                                <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                                <p className="text-blue-400 font-bold text-xs">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
    
    return (
        <>
            <Head>
                <title>DigitalPay – Services Premium</title>
                <meta name="description" content="Recharges, streaming, finance et gift cards." />
            </Head>

            {/* OVERLAY DE REDIRECTION */}
            <div className={`fixed inset-0 z-[9999] bg-black/50 backdrop-blur-[15px] flex items-center justify-center transition-opacity duration-500 ${showRedirect ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="bg-[#12121f] border border-[rgba(59,130,246,0.2)] rounded-3xl p-10 max-w-md w-full text-center shadow-2xl transform scale-90 transition-transform duration-500">
                    <div className="w-12 h-12 border-4 border-white/10 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-bold mb-2">Redirection en cours...</h2>
                    <p className="text-gray-400 text-sm mb-4">Vous allez être redirigé vers la page de connexion.</p>
                    <div className="flex justify-center items-center gap-2 text-gray-500 text-xs mb-4">
                        <i className="fa-solid fa-shield-halved text-blue-400"></i> Connexion sécurisée
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 rounded-full animate-fillProgress"></div>
                    </div>
                </div>
            </div>

            {/* HEADER */}
            <header className="sticky top-4 z-50 mx-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl px-6 h-14 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <img src="/assets/logo.png" alt="DigitalPay" className="h-9 object-contain" />
                </Link>
                <div className="flex items-center gap-2">
                    {/* Recherche */}
                    <button onClick={() => setIsSearchVisible(!isSearchVisible)} className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 text-white flex items-center justify-center hover:border-blue-500 transition">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </header>
            
            {/* Barre de recherche */}
            <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-[#12121f] border border-white/10 rounded-2xl p-3 w-80 max-w-[90%] shadow-2xl transition-all duration-300 ${isSearchVisible ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
                <div className="flex items-center">
                    <input type="text" placeholder="Rechercher un service..." className="bg-transparent border-none outline-none text-white w-full text-sm px-2" />
                    <button onClick={() => setIsSearchVisible(false)} className="text-gray-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
                </div>
            </div>

            {/* HERO */}
            <section className="pt-28 pb-8 text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg aspect-video">
                        <img src="/assets/flyerswelcome.png" alt="Bienvenue" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* CATÉGORIES (Pills) */}
            <section className="px-4 pb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <div className="flex gap-3 justify-center">
                    {['Jeux', 'Streaming', 'Finance', 'Gift Cards', 'Social'].map((cat, idx) => (
                        <div key={idx} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white text-xs font-semibold uppercase tracking-wide hover:border-blue-500 transition">
                            <i className={`fa-solid ${
                                idx===0?'fa-gamepad':idx===1?'fa-tv':idx===2?'fa-coins':idx===3?'fa-gift':'fa-share-nodes'
                            } text-blue-500`}></i>
                            {cat}
                        </div>
                    ))}
                </div>
            </section>

            {/* GRILLES PRODUITS */}
            {renderGrid('Jeux', productData.gaming, '/gaming')}
            {renderGrid('Abonnement', productData.streaming, '/streaming')}
            {renderGrid('Finance', productData.finance, '/finance')}
            {renderGrid('Cartes Cadeaux', productData.giftcard, '/giftcard')}
            {renderGrid('Réseaux Sociaux', productData.social, '/social')}

            {/* TÉMOIGNAGES */}
            <section className="py-12 bg-white/5">
                <div className="container mx-auto px-4">
                    <h2 className="font-orbitron text-xl font-bold mb-6">Avis Clients</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                            <div className="text-yellow-500 text-sm mb-2">★★★★★</div>
                            <p className="text-gray-300 text-sm italic">"Recharge Free Fire reçue en 2 minutes. Service impeccable !"</p>
                            <div className="mt-2 font-semibold text-white text-sm">— Jean P.</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                            <div className="text-yellow-500 text-sm mb-2">★★★★★</div>
                            <p className="text-gray-300 text-sm italic">"Transfert Wise rapide et sécurisé. Je recommande à 100%."</p>
                            <div className="mt-2 font-semibold text-white text-sm">— Marie L.</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                            <div className="text-yellow-500 text-sm mb-2">★★★★☆</div>
                            <p className="text-gray-300 text-sm italic">"Très bon service client, réactif sur WhatsApp. Prix compétitifs."</p>
                            <div className="mt-2 font-semibold text-white text-sm">— Marc D.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="font-orbitron text-xl font-bold mb-6">Questions fréquentes</h2>
                    <div className="border-b border-white/10 py-4">
                        <button className="w-full flex justify-between items-center text-left font-semibold text-sm">Comment passer une commande ? <i className="fa-solid fa-plus text-blue-500 transition-transform"></i></button>
                        <div className="mt-2 text-gray-400 text-sm hidden">Cliquez sur le service souhaité, connectez-vous et suivez les instructions de paiement.</div>
                    </div>
                    <div className="border-b border-white/10 py-4">
                        <button className="w-full flex justify-between items-center text-left font-semibold text-sm">Quels modes de paiement acceptez-vous ? <i className="fa-solid fa-plus text-blue-500 transition-transform"></i></button>
                        <div className="mt-2 text-gray-400 text-sm hidden">MonCash, NatCash, Meru, et Portefeuille DigitalPay.</div>
                    </div>
                </div>
            </section>

            {/* COMMUNAUTÉ WHATSAPP */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
                        <h3 className="font-orbitron text-lg font-bold">Rejoignez notre communauté WhatsApp !</h3>
                        <p className="text-gray-400 text-sm mt-2 mb-4">Restez connecté pour ne manquer aucune promo.</p>
                        <a href="https://whatsapp.com/channel/0029VbAcGmCGufIrRej1sR04" target="_blank" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition"> <i className="fa-brands fa-whatsapp"></i> Rejoindre la chaîne</a>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-black/30 border-t border-white/10 py-6 text-center text-gray-400 text-xs">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <div className="font-orbitron text-white text-sm">DigitalPay</div>
                        <div className="mt-1">Services premium pour tous.</div>
                    </div>
                    <div className="flex gap-4">
                        <a href="/gaming" className="hover:text-white">Jeux</a>
                        <a href="/streaming" className="hover:text-white">Streaming</a>
                        <a href="/support" className="hover:text-white">Support</a>
                    </div>
                    <div className="text-gray-500 text-[10px]">© 2026 DigitalPay • Paiements sécurisés • Support 24/7</div>
                </div>
            </footer>
        </>
    );
}