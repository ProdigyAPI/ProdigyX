import { getWorld } from "../hack"
import { success, error } from "../swal"
import { Category } from "./base/categories"
import { withCategory } from "./base/registry"

withCategory(Category.BATTLE, ({ hack, toggle }) => {
    hack("PVP Health", "Set's the amount of health you have currently.", async (hack, player) => {
        player.pvpHP = 1e9
        player.getMaxHearts = () => 1e9
        success("You now have unlimited health.")
    })
    toggle("Instant Kill", (hack, player, _gameData, toggled) => {
        player.modifiers.damage = toggled ? 1e9 : 1
        success(toggled ? "You will now kill everything after one attack." : "You will no longer kill everything after one attack.")
    }, (hack, player) => player.modifiers.damage === 1e9)
    hack("Escape Battle [PvP, PvE]", "Escape a battle", async (hack, player) => {
        const currentState = hack.state.current
        if (currentState === "PVP") {
            Object.fromEntries(hack.state.states).PVP.endPVP()
            success("You have successfully escaped from the PvP battle.")
        } else if (currentState === "CoOp") {
            if (process.env.EXTENSION) {
                _.instance.prodigy.world.$(player.data.zone)
            } else {
                getWorld().$(player.data.zone)
            }
            success("You have successfully escaped from the battle.")
        } else if (!["Battle", "SecureBattle"].includes(currentState)) {
            error("You are not in a battle.")
        } else {
            Object.fromEntries(hack.state.states)[currentState].runAwayCallback()
            success("You have successfully escaped from the PvE battle.")
        }
    })
    hack("Win Battle [PvE]", "Win a battle in PvE", async (hack) => {
        const currentState = hack.state.current
        switch (currentState) {
        case "PvP":
        case "CoOp":
            error("This hack is not available in PvP or CoOp.")
            break
        case "Battle":
            Object.fromEntries(hack.state.states).Battle.startVictory()
            success("You have successfully won the battle.")
            break
        case "SecureBattle":
            Object.fromEntries(hack.state.states).SecureBattle.battleVictory()
            success("You have successfully won the battle.")
            break
        default:
            error("You are not in a battle.")
        }
    })
    hack("Fill Battle Energy", "Fills up your battle energy.", async (hack) => {
        const state = hack.state.getCurrentState()
        if (!("teams" in state)) {
            error("You are currently not in a battle.")
            return
        }
        state.teams[0].setEnergy(99)
        success("Your battle energy has been filled.")
    })

    hack("Heal Team", "Heal's your team", async (hack, player) => {
        const currentState = hack.state.current
        if (["Battle", "SecureBattle"].includes(currentState)) {
            player.heal()
            success(
                "Your team has been healed successfully!"
            )
        } else {
            error("You are currently not in a battle.")
        }
    })
})
