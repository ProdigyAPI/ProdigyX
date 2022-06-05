import { h } from "preact"
import { saveGame, setFromUserID } from "../hack"
import { InputTypes, success, confirm, error, customMessage } from "../swal"
import { Category } from "./base/categories"
import { withCategory } from "./base/registry"

withCategory(Category.UTILITY, ({ hack, toggle }) => {
    hack("Save Character", "Use this to make sure your character is saved.", async () => {
        saveGame() // TODO: If on extension, use _ method.
        success("Your character has been saved.")
    })
    let teleportingInterval
    toggle("Toggle Click Teleporting", (hack, player, gameData, toggled) => {
        if (toggled) {
            teleportingInterval = setInterval(() => {
                player._playerContainer.walkSpeed = 500
            }, 100)
            success("You will now teleport when you click the screen.")
        } else {
            clearInterval(teleportingInterval)
            player._playerContainer.walkSpeed = 1.5
            success("You will no longer teleport when you click the screen.")
        }
    })
    hack("Edit Walkspeed", "Edit the walkspeed of your character.", async (hack, player) => {
        const walkSpeed = await InputTypes.float("Please enter the walkspeed you want your character to be at. The default is 1.5")
        if (player._playerContainer?.walkSpeed) {
            player._playerContainer.walkSpeed = walkSpeed || 1.5
        } else {
            const interval = setInterval(() => {
                if (player._playerContainer?.walkSpeed) {
                    player._playerContainer.walkSpeed = walkSpeed || 1.5
                    clearInterval(interval)
                }
            }, 100)
        }
        success(`You are now at a walkspeed ${walkSpeed}.`)
    })
    hack("Reset Account", "Completely resets your account.", async (hack, player) => {
        const confirmed = await confirm("Are you sure you want to reset your account?")
        if (confirmed) {
            player.resetAccount()
            success("Your account has been reset.")
        } else {
            success("Your account has not been reset.")
        }
    })
    hack("Find the UserId of People on the Screen", "Get's the UserId of every player on the screen currently", async (hack) => {
        const users = hack?._state?._current?.playerList ?? {}
        if (Object.keys(users).length === 0) {
            error("There are no other players on the screen.")
        } else {
            customMessage({
                title: "The user's on the screen are:",
                html: <div>
                    <ul className="list-disc list-inside">
                        {Object.keys(users).map(user => <li key={user}>
                            User Id: {user} - {users[user].nameText.textSource.source}
                        </li>)}
                    </ul>
                </div>
            })
        }
    })
    hack("Duplicate an Account", "Copy an account from it's UserId.", async () => {
        const userId = await InputTypes.string("Please enter the UserId of the account you want to copy. Warning: this will delete your current account.")
        const account = await setFromUserID(userId) // TODO: If on extension, use _ method.
        if (account) {
            success(`Account ${userId} has been copied to your account.`)
        } else {
            error(`Account ${userId} could not be copied.`)
        }
    })
})
