import type { Category } from "./categories"

export interface CategoryContext {
    hack: (name: string, description: string, onClick: HackFunction, extensionOnly?: boolean) => void
    toggle: (name: string, onClick: ToggleFunction, getDefaultValue?: (hack: any, player: any) => boolean, extensionOnly?: boolean) => void
}

export const hackRegistry: HackData[] = []

export const hack = (data: HackData): void => {
    if (!process.env.EXTENSION && data.extensionOnly) {
        return
    }
    hackRegistry.push(data)
}

export const withCategory = (category: Category, func: (ctx: CategoryContext) => void) => {
    func({
        hack: (name, description, onClick, extensionOnly) => hack({ category, name, description, onClick, type: "hack", extensionOnly }),
        toggle: (name, onClick, getDefaultValue = () => false, extensionOnly) => hack({ category, name, onClick, getDefaultValue, type: "toggle", extensionOnly })
    })
}
