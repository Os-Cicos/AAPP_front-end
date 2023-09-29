import Image from 'next/image';
import React from 'react';

export default function Switch() {

    return (
        <>
            <div id='bg-switch'>
                <div id='left-icon'>
                    aA
                </div>
                <div id='switch'>

                </div>
                <div id='right-icon'>
                <Image
              src="/assets/speaker.svg"
              alt="Vercel Logo"
              className={'speaker-icon'}
              width={50}
              height={50}
              priority
            />
                </div>

            </div>
        </>)
}
