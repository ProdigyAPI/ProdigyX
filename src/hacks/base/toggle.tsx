import { h, FunctionalComponent } from "preact"
import { useState } from "preact/hooks"
import { getGameData, getHack, getPlayer, saveGame } from "../../hack"
import { ArgumentFailureError } from "../../swal"

interface ToggleProps {
    name: string
    toggleFunction: ToggleFunction
    checkedByDefault?: boolean
}

const Toggle: FunctionalComponent<ToggleProps> = ({ name, toggleFunction, checkedByDefault = false }) => {
    const [toggled, setToggled] = useState<boolean>(checkedByDefault)

    async function onChange () {
        const newToggled = !toggled
        setToggled(newToggled)
        const hack = process.env.EXTENSION ? _.game : getHack() as any
        const player = process.env.EXTENSION ? _.player : getPlayer() as any
        const gameData = process.env.EXTENSION ? _.gameData : getGameData() as any
        if (hack) {
            try {
                await toggleFunction(hack, player, gameData, newToggled)
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

    return (
        <div className="pl-10 group mt-2">
            <input className="checked:group-odd:bg-blue-600 checked:group-even:bg-emerald-600 forest:checked:group-odd:bg-pink-400 forest:checked:group-even:bg-orange-400 shiverchill:checked:group-odd:bg-[#5AC6FF] shiverchill:checked:group-even:bg-[#7589CC] bonfire-spire:checked:group-odd:bg-[#F76E11] bonfire-spire:checked:group-even:bg-[#FF9F45] switch-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-zinc-400 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id={`select-hack-${name}`} checked={toggled} onClick={onChange} />
            <label className="form-check-label inline-block text-gray-800 mr-3" htmlFor={`select-hack-${name}`}>{name}</label>
        </div>
    )
}

export default Toggle
