import { useState } from 'react';
import { Container } from './styles';

import StatusBox from '../../components/StatusBox';

import backgroundImg from '../../assets/bgimage/bg/room.jpg';

import bodyImg from '../../assets/fgimage/s/body/sit_b.png';
import headImg from '../../assets/fgimage/s/body/sit_h1.png';
import dressImg from '../../assets/fgimage/s/dress/R/a1.png';
import armsImg from '../../assets/fgimage/s/body/sit_a1.png';
import armrightImg from '../../assets/fgimage/s/body/sit_a2.png';

import eyeImg from '../../assets/fgimage/s/face/R/e_def.gif';
import mouthImg from '../../assets/fgimage/s/face/R/m_def.png';

import hairImg from '../../assets/fgimage/s/body/sit_fh.png';
import ToolsBox from '../../components/ToolsBox';
import { useSlave } from '../../hooks/useSlave';
import ChatBox, { IChatSequence } from '../../components/ChatBox';

const RestRoom = ():JSX.Element => {
  const { isSleeping, setIsSleeping } = useSlave();
  const [isDressed, setIsDressed] = useState(true);

  const aboutChat:IChatSequence = { // 0
    text: '',
    options: [
      { // ==== 0
        text: 'Whats your name',
        next: {
          text: 'They just call me slave, master can calm me like you want',
          options: [

          ],
        },
      },
      {
        text: 'How old are you',
        next: {
          text: 'I think im 18',
          options: [

          ],
        },
      },
      {
        text: 'About these scars',
        next: {
          text: 'My last master enjoys to see slaves suffering',
          options: [
            {
              text: 'Tell me about',
              next: {
                text: 'Sometimes he burned me, sometimes put things inside me and others he just strangled me till I passed out',
                options: [
                  {
                    text: 'Your dont deserve this',
                    next: {
                      text: 'You are good and kind master, im Happy to be here.',
                    },
                  },
                  {
                    text: 'You are a slave, you should be glad he didnt kill you',
                    next: {
                      text: 'Yes master.',
                    },
                  },
                  {
                    text: 'What did you feel?',
                    next: {
                      text: 'Most of the time I feel pain an become afraid, but sometimes it was good when Master put small things inside me',
                      options: [
                        {
                          text: 'Afraid?',
                          next: {
                            text: 'Sometimes Master strangled me so strong that I passed out and pissed mylself, so master beated me with rage. I didnt like that',
                            options: [
                              {
                                text: 'Your last master likes to hurt slaves?',
                                next: {
                                  text: 'He liked too much to see me scream. A day, Master tried to put a baseball bat inside my back.',
                                  options: [
                                    {
                                      text: 'Interesting...',
                                      next: {
                                        text: 'He tried but the bat as too big and my back was to tight that he couldnt put it inside, so masted beated me with the bat till I pass out. When I woke, that thing was inside me and master left me with it all the day.',
                                      },
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                        },
                        {
                          text: 'What did you like?',
                          next: {
                            text: 'I like when Master fuck me very fast till I fell that feeling',
                            options: [],
                          },
                        },

                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        text: 'What can I do with you?',
        next: {
          text: 'Master can do what makes you happy.',
          options: [
            {
              text: 'Hurt you?',
              next: {
                text: 'Usually what makes people happy is to beat or choke their slaves, so if you feel good, you can hurt me like you want.',
              },
            },
            {
              text: 'Penetrate?',
              next: {
                text: 'Yes, you can fuck or penetrate me with things to see me suffer. Or you can fill my belly with liquid.',
                options: [
                  {
                    text: 'Liquid?',
                    next: {
                      text: 'Master call it enema. You fill me with liquid and order me to hold it, so I gonna fight as long as I can to keep it inside me and give joy to master.',
                      options: [
                        {
                          text: 'How this is done?',
                          next: {
                            text: 'Master put a syringe inside my back and fill my belly like a ballon, if its too much I feel great pain and cant hold too long',
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              text: 'Even kill you?',
              next: {
                text: 'Im just a dirty slave, Master. Nobody cares if you choke me to death or beat me till I die',
              },
            },
          ],
        },
      },
    ],
  };

  const commandChat:IChatSequence = { // 0
    text: '[Slave] Yes Master...',
    options: [
      { text: 'Remove your dress', action: () => { setIsDressed(false); } },
      { text: 'Put your dress', action: () => { setIsDressed(true); } },
      { text: 'Go to your room', action: () => { setIsSleeping(true); } },
      { text: 'Talk', action: () => { }, next: aboutChat },
    ],
  };

  return (
    <Container>

      <img className="background" src={backgroundImg} alt="" />

      { !isSleeping
      && (
      <>
        <img src={armrightImg} alt="" />
        <img src={bodyImg} alt="" />
        <img src={headImg} alt="" />
        <img src={eyeImg} alt="" />
        <img src={mouthImg} alt="" />
        <img src={hairImg} alt="" />
        {isDressed
        && <img src={dressImg} alt="" />}
        <img src={armsImg} alt="" />
        <ChatBox initchat={commandChat} />
      </>
      )}
      <ToolsBox />
      <StatusBox />
    </Container>
  );
};
export default RestRoom;
