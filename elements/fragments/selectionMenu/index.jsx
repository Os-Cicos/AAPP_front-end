import React, { useContext } from "react";
import Button from "@/elements/components/button_c05";
import './style.css';
import { AlterPDF, listPDF } from "@/services";
import WaintingSelection from "../waitingSelection";
import { MenuContext } from "@/context/menuContext";

/* SelectionMenu: Componente de seleção de conteeúddos
    props:
        options: array de objetos {title: 'Titulo do conteudo', icon: 'url para o icone', index:'number para representando o index dele no back'
        exemplo de uso:
        <SelectionMenu options={[
                {title: 'Python', icon: 'assets/pythonIcon.svg', index: 0 },
                { title: 'Lógica', icon: 'assets/logicaIcon.svg', index: 1 }]} />*/



export default function SelectionMenu({ }) {


    const [list, setList] = React.useState([{}])
    const [isSelect, setIsSelect] = React.useState(Array(list.length).fill(false));
    const { selected, setSelected } = useContext(MenuContext)
    const [isWaiting, setIsWaiting] = React.useState(false);

    React.useEffect(() => {
        listPDF(setList)

    }, [])

    const SelectPDF = (index) => {
        setIsWaiting(true);
        const selectedOption = list.find(option => option.index === index);
        if (selectedOption) {
            AlterPDF(index).then((response) => {
                setSelected({ index: index, name: selectedOption.name });
                const newIsSelect = Array(list.length).fill(false);
                newIsSelect[index] = true;
                setIsSelect(newIsSelect);
                setIsWaiting(false);
            }).catch((error) => {
                alert(error.response.status);
                setIsWaiting(false);
            });
        }
    };

    return (
        <div id="bg-selectionMenu">
            <WaintingSelection isWaiting={isWaiting} />
            Conteúdos
            <div id='bg-selectionMenu2'>
                <div id='optionsMap'>
                    {list?.map((option) => {
                        const { index, name } = option;
                        return (
                            <div className='optionItem' key={index}>
                                <Button
                                    type="button"
                                    alt={`Botão para selecionar conteúdo de ${name}`}
                                    text={name}
                                    outlined={true}
                                    isSelected={isSelect[index]}
                                    noIcon
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
