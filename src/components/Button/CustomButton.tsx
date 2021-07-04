import React from "react";
import styles from "./CustomButton.module.scss";
const { "custom-button": customButtonClass } = styles;

interface ButtonProps {
    text: string;
    onClick: () => void;
}

export function CustomButton({ text, onClick }: ButtonProps) {
    return <button className={customButtonClass} onClick={onClick}>{text}</button>;
}
