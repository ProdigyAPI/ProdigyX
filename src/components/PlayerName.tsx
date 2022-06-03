import { FunctionalComponent, h } from "preact"
import { useEffect, useState } from "preact/hooks"

export interface NameInfo {
    first: number
    middle: number
    last: number
    nickname: number | null
}

interface PlayerNameProps {
    names: any[]
    nicknames: any[]
    obj: NameInfo
}

const PlayerName: FunctionalComponent<PlayerNameProps> = ({ names, obj, nicknames }) => {
    const [firstName, setFirstName] = useState<number>(obj.first)
    const [middleName, setMiddleName] = useState<number>(obj.middle)
    const [lastName, setLastName] = useState<number>(obj.last)
    const [nickname, setNickname] = useState<number | null>(obj.nickname)

    useEffect(() => {
        obj.first = firstName
        obj.middle = middleName
        obj.last = lastName
    }, [firstName, middleName, lastName, obj])

    useEffect(() => {
        obj.nickname = nickname === -1 ? null : nickname
    }, [nickname, obj])

    return <div>
        <select className="swal2-select flex mx-0 !w-full" onChange={event => { setFirstName(parseInt(event.currentTarget.value)) }} defaultValue={firstName.toString()}>
            <option disabled>First Name...</option>
            {names.filter(e => e.data.type === 0).map(n => <option value={n.ID} key={n.ID}>{n.name}</option>)}
        </select>
        {(!nickname || nickname === -1) && <select className="swal2-select flex mx-0 !w-full" onChange={event => { setMiddleName(parseInt(event.currentTarget.value)) }} defaultValue={middleName.toString()}>
            <option disabled>Middle Name...</option>
            {names.filter(e => e.data.type === 1).map(n => <option value={n.ID} key={n.ID}>{n.name}</option>)}
        </select>}
        {(!nickname || nickname === -1) && <select className="swal2-select flex mx-0 !w-full" onChange={event => { setLastName(parseInt(event.currentTarget.value)) }} defaultValue={lastName.toString()}>
            <option disabled>Last Name...</option>
            {names.filter(e => e.data.type === 2).map(n => <option value={n.ID} key={n.ID}>{n.name}</option>)}
        </select>}
        <select className="swal2-select flex mx-0 !w-full" onChange={event => { setNickname(parseInt(event.currentTarget.value)) }} defaultValue={(nickname ?? "-1").toString()}>
            <option disabled>Nickname...</option>
            <option value="-1">None</option>
            {nicknames.map(n => <option value={n.ID} key={n.ID}>{n.data.value.replace("{first}", names.find(e => e.ID === firstName)?.data?.name ?? "")}</option>)}
        </select>
    </div>
}

export default PlayerName
