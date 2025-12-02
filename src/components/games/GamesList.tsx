import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { type Game } from "../../client/types";

export default function GamesList() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/games')
            .then(response => response.json())
            .then(data => setGames(data))
    }, []);

    return (
        <>
            <section id="juegosHome" className="container-fluid min-vh-100 mt-3">
                <div className="container">
                    <hr className="border" />
                    <div id="productsRow" className="row row-cols-1 row-cols-md-3 g-4">
                        {games.map((g) => (
                            <GameCard key={g.id} game={g} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}