import { MouseMapping } from "./inputMaps";

export class MouseHandler
{
    private static _mousePosition: number[] = [];
    private static _mouseSpeed: number[] = [];
    private static _pressedButtons: boolean[];

    public constructor() {
        MouseHandler._pressedButtons = [];
    }

    public static initialize(): void {
        MouseHandler._pressedButtons = Array(5).fill(false);
    }
    
    public static get mousePosition(): number[] { return MouseHandler._mousePosition; }
    public static get mouseSpeed(): number[] { return MouseHandler._mouseSpeed; }
        
    public static onButtonDown(button: number): void
    {
        MouseHandler._pressedButtons[button] = true;
    }

    public static onButtonUp(button: number): void
    {
        MouseHandler._pressedButtons[button] = false;
    }

    public static isButtonPressed(buttonName: string): boolean
    {
        if (buttonName in MouseMapping)
        {
            const buttonCode = MouseMapping[buttonName]['button'];
            return MouseHandler._pressedButtons[buttonCode];
        }
        return false;
    }

    public static onMouseMove(x_pos: number, y_pos: number, x_speed: number, y_speed: number): void
    {
        MouseHandler._mousePosition[0] = x_pos;
        MouseHandler._mousePosition[1] = y_pos;
        MouseHandler._mouseSpeed[0] = x_speed;
        MouseHandler._mouseSpeed[1] = y_speed;
    }
}