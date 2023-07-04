import React from 'react';
import "./Names.scss";
import { useEffect } from "react";
import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Title = styled.h2`
  font-size: 148px;
  font-weight: 500;
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

const Character = styled(motion.span)`
  display: inline-block;
  margin-right: -0.05em;
`;
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

    const wordAnimation = {
        hidden: {},
        visible: {},
    };

    const characterAnimation = {
        hidden: {
            opacity: 0,
            // y: `0.25em`,
        },
        visible: {
            opacity: 1,
            // y: `0em`,
            transition: {
                // delay: 1,
                duration: 1.5,
                ease: [0.2, 0.65, 0.3, 0.9],
            },
        },
    };
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
                    variants={wordAnimation}
                    transition={{
                    delayChildren: index * 0.25,
                    staggerChildren: 0.05,
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




