import { FunctionalComponent, h } from "preact"
import { getHack, getPlayer, getGameData, saveGame } from "../../hack"
import { ArgumentFailureError } from "../../swal"

interface HackProps {
    name: string
    description: string
    hackFunction: HackFunction
}

const Hack: FunctionalComponent<HackProps> = ({ name, description, hackFunction }) => {
    async function onClick () {
        const hack = process.env.EXTENSION ? _.game : getHack() as any
        const player = process.env.EXTENSION ? _.player : getPlayer() as any
        const gameData = process.env.EXTENSION ? _.gameData : getGameData() as any
        if (hack) {
            try {
                await hackFunction(hack, player, gameData)
            } catch (error) {
                if (error instanceof ArgumentFailureError) return
                throw error
            }
            setTimeout(() => {
                player.appearanceChanged = true
                saveGame() // TODO: If on extension, use _ method.
            }, 1000)
        }
    }

    return <button onClick={onClick} title={description} className="capitalize odd:bg-blue-600 even:bg-emerald-600 forest:odd:bg-pink-400 forest:even:bg-orange-400 shiverchill:odd:bg-[#5AC6FF] shiverchill:even:bg-[#7589CC] bonfire-spire:odd:bg-[#F76E11] bonfire-spire:even:!text-black bonfire-spire:even:bg-[#FF9F45] mt-2 md:mb-0 mr-3 text-white shadow-xl forest:shadow-md odd:shadow-blue-400 even:shadow-emerald-400 forest:odd:shadow-pink-400 forest:even:shadow-orange-400 shiverchill:odd:shadow-[#5AC6FF] shiverchill:even:shadow-[#7589CC] bonfire-spire:odd:shadow-[#F76E11] bonfire-spire:even:shadow-[#FF9F45] rounded px-4 py-1.5" data-mdb-ripple="true" data-mdb-ripple-color="light">{name}</button>
}

export default Hack
