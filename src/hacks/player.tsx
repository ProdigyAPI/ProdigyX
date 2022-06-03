import { h } from "preact"
import { useState } from "preact/hooks"
import { getMembership } from "../hack"
import { ArgumentFailureError, customMessage, InputTypes, success } from "../swal"
import { Category } from "./base/categories"
import { withCategory } from "./base/registry"

withCategory(Category.PLAYER, ({ hack, toggle }) => {
    hack("Set Gold", "Set's the amount of gold you have currently.", async (hack, player) => {
        const value = await InputTypes.integer("Please enter the amount of gold you want to get.", 1, 9999999)
        player.data.gold = value
        success(`You now have ${value} gold.`)
    })
    hack("Set Level", "Set's the level of your player.", async (hack, player) => {
        const value = await InputTypes.integer("Please enter the level you want to be.", 1, 100)
        if (value === 1) {
            player.data.stars = 0
        } else if (value === 2) {
            player.data.stars = 10
        } else {
            const offsetLevel = value - 2
            const xpConstant = 1.042
            player.data.stars = Math.round((((1 - Math.pow(xpConstant, offsetLevel)) / (1 - xpConstant)) * 20) + 10)
        }

        player.data.level = value
        success(`You are now level ${value}.`)
    })
    hack("Set Member Stars", "Set's the amount of member stars you have currently.", async (hack, player) => {
        const value = await InputTypes.integer("Please enter the amount of member stars you want to get.", 1, 9999999)
        player.data.storedMemberStars = value
        success(`You now have ${value} member stars.`)
    })
    hack("Set Bounty Points", "Set's the amount of member stars you have currently.", async (hack, player) => {
        const value = await InputTypes.integer("Please enter the amount of bounty points you want to get.", 1, 100)
        player.data.bountyScore = value
        success(`You now have ${value} bounty points.`)
    })
    toggle("Toggle Membership", (hack, player, _gameData, toggled) => {
        getMembership(toggled)
        success(`You are ${toggled ? "now a member" : "no longer a member"}.`)
    }, (hack, player) => player.hasMembership())
    hack("Set Wins", "Set's the amount of wins you have currently.", async (hack, player) => {
        const value = await InputTypes.integer("Please enter the amount of wins you want to get.", 0, 9999999)
        player.data.win = value
        success(`You now have ${value} wins.`)
    })
    hack("Set Losses", "Set's the amount of losses you have currently.", async (hack, player) => {
        const value = await InputTypes.integer("Please enter the amount of losses you want to get.", 0, 9999999)
        player.data.loss = value
        success(`You now have ${value} losses.`)
    })
    hack("Get All Achievements", "Gets every achievements.", async (hack, player) => {
        for (let i = 0; i < 100; i++) {
            player.achievements.data.progress[i] = 10
        }
        player.achievements.updated = true
        success("You now have every achievements.")
    })
    hack("Set Dark Tower Floor", "Set's the floor you are on in the dark tower.", async (hack, player) => {
        const floor = await InputTypes.integer("Please enter the floor you want to be on.", 1, 100)
        player.data.tower = floor
        success(`You are now on floor ${floor}.`)
    })
    hack("Change Name", "Changes the name of your player.", async (hack, player, gameData) => {
        const names = gameData.name

        const [firstName, setFirstName] = useState<number>(player.name.data.firstName)
        const [middleName, setMiddleName] = useState<number>(player.name.data.middleName)
        const [lastName, setLastName] = useState<number>(player.name.data.lastName)

        const name = await customMessage({
            title: "Set Player Name",
            html: <div>
                <select className="swal2-select flex mx-0 !w-full" onChange={event => { setFirstName(parseInt(event.currentTarget.value)) }} defaultValue={firstName.toString()}>
                    <option disabled>First Name...</option>
                    {names.filter(e => e.data.type === 0).map(n => <option value={n.ID} key={n.ID}>{n.name}</option>)}
                </select>
                <select className="swal2-select flex mx-0 !w-full" onChange={event => { setMiddleName(parseInt(event.currentTarget.value)) }} defaultValue={middleName.toString()}>
                    <option disabled>Middle Name...</option>
                    {names.filter(e => e.data.type === 1).map(n => <option value={n.ID} key={n.ID}>{n.name}</option>)}
                </select>
                <select className="swal2-select flex mx-0 !w-full" onChange={event => { setLastName(parseInt(event.currentTarget.value)) }} defaultValue={lastName.toString()}>
                    <option disabled>Last Name...</option>
                    {names.filter(e => e.data.type === 2).map(n => <option value={n.ID} key={n.ID}>{n.name}</option>)}
                </select>
                {/* <select className="swal2-select flex mx-0 !w-full">

                </select> */}
            </div>,
            showCancelButton: true
        })
        if (name.dismiss) throw new ArgumentFailureError()
    })
})
