import { Category } from "./hacks/base/categories"

/* eslint-disable no-unused-vars */
declare global {
    type HackFunction = (hack: any, player: any, gameData: any) => Promise<void> | void
    type ToggleFunction = (hack: any, player: any, gameData: any, toggleState: boolean) => Promise<void> | void
    interface HackData {
        name: string
        description?: string
        onClick: HackFunction | ToggleFunction
        type: "hack" | "toggle"
        category: Category
        extensionOnly?: boolean
        getDefaultValue?: (hack: any, player: any, gameData: any) => boolean // for toggle hacks
    }
    const _: any
}

declare module "*.scss"

export {}
