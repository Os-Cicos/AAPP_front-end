import React from "react";
import Button from "@/elements/components/button_c05";
import './style.css';
import { AlterPDF } from "@/services";

export default function SelectionMenu({ options }) {
    const [isSelect, setIsSelect] = React.useState(Array(options.length).fill(false));

    const SelectPDF = (index) => {
        AlterPDF(index).then((response)=>{
            const newIsSelect = [...isSelect];
            newIsSelect[index] = true;
            setIsSelect(newIsSelect);
        }).catch((error)=>{
            alert(error.response.status)
        })

    };

    return (
        <div id="bg-selectionMenu">
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
                                    isSelect={isSelect[index]}
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
