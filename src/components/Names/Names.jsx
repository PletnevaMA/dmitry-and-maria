import React from 'react';
import "./Names.scss";
import { useEffect } from "react";
import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Title = styled.h2`
  font-size: 148px;
  font-weight: 500;
  @media (max-width: 1100px) {
    font-size: 82px;
  }
  @media (max-width: 660px) {
    font-size: 62px;
  }
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

const Character = styled(motion.span)`
  display: inline-block;
  // margin-right: -0.05em;
`;

const characterAnimation = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 2.5,
            ease: [0.17, 0.67, 0.83, 0.67],
        },
    },
};


export const Names = () => {
    const text = ['Дмитрий', 'и Мария'];
    const ctrls = useAnimation();

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            ctrls.start("visible");
        }
        if (!inView) {
            ctrls.start("hidden");
        }
    }, [ctrls, inView]);

    return (
        <div className="names">
            <Title aria-label={text} role="heading">
                {text.map((line, index) => <div style={{textAlign: index === 1 ?  'right' : 'left', width: '100%'}}>{line.split(" ").map((word, index) => {
                    return (
                    <Word
                    ref={ref}
                    aria-hidden="true"
                    key={index}
                    initial="hidden"
                    animate={ctrls}
                    transition={{
                        delay: 3,
                        delayChildren: index * 0.55,
                        staggerChildren: 0.1,
                }}
                    >
                {word.split("").map((character, index) => {
                    return (
                    <Character
                    aria-hidden="true"
                    key={index}
                    variants={characterAnimation}
                    >
                {character}
                    </Character>
                    );
                })}
                    </Word>
                    );
                })}</div>)}
            </Title>
        </div>
    );
};




