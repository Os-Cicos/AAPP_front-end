import React from "react";
import Button from "@/elements/components/button_c05";
import './style.css';
import { AlterPDF } from "@/services";
import WaintingSelection from "../waitingSelection";

export default function SelectionMenu({ options }) {
    const [isSelect, setIsSelect] = React.useState(Array(options.length).fill(false));
    const [isWaiting, setIsWaiting] = React.useState(false);

    const SelectPDF = (index) => {
        setIsWaiting(true)
        AlterPDF(index).then((response)=>{
            const newIsSelect = Array(options.length).fill(false);
            newIsSelect[index] = true;
            setIsSelect(newIsSelect);
            setIsWaiting(false)
        }).catch((error)=>{
            alert(error.response.status)
            setIsWaiting(false)
        })

    };

    return (
        <div id="bg-selectionMenu">
            <WaintingSelection isWaiting={isWaiting}/>
            Conteúdos
            <div id='bg-selectionMenu2'>
                <div id='optionsMap'>
                    {options.map((option) => {
                        const { icon, title, index } = option;
                        return (
                            <div className='optionItem' key={index}>
                                <Button
                                    icon={icon}
                                    type="button"
                                    alt={`Botão para selecionar conteúdo de ${title}`}
                                    text={title}
                                    outlined={true}
                                    isSelected={isSelect[index]}
                                    onClick={() => SelectPDF(index)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
