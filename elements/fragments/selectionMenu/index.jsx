import React from 'react'
import './style.css'
import Button from '@/elements/components/button_c05'

export default function SelectionMenu({options: [icon, title, index] }) {
    return (
        <>
            <div id="bg-selectionMenu">
                <div id='bg2-selectionMenu'>
                    <div id='optionsMap'>
                        {options.map((option)=>{
                            <div className='optionItem'>
                                <Button icon={icon}
                                type={'button'}/>
                            </div>
                        })}

                    </div>

                </div>
            </div>
        </>
    )
}