import { useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'motion/react';

const getRotationTransition = (duration, from, loop = true) => ({
    from,
    to: from + 360,
    ease: 'linear',
    duration,
    type: 'tween',
    repeat: loop ? Infinity : 0
});

const getTransition = (duration, from) => ({
    rotate: getRotationTransition(duration, from),
    scale: {
        type: 'spring',
        damping: 20,
        stiffness: 300
    }
});

const CircularText = ({
    text,
    spinDuration = 20,
    onHover = 'speedUp',
    className = '',
    centerImage
}) => {
    const letters = Array.from(text);
    const controls = useAnimation();
    const rotation = useMotionValue(0);

    useEffect(() => {
        const start = rotation.get();
        controls.start({
            rotate: start + 360,
            scale: 1,
            transition: getTransition(spinDuration, start)
        });
    }, [spinDuration, text]);

    const handleHoverStart = () => {
        const start = rotation.get();
        let transitionConfig = getTransition(spinDuration, start);

        switch (onHover) {
            case 'slowDown':
                transitionConfig = getTransition(spinDuration * 2, start);
                break;
            case 'speedUp':
                transitionConfig = getTransition(spinDuration / 4, start);
                break;
            case 'pause':
                transitionConfig = { rotate: {}, scale: {} };
                break;
            case 'goBonkers':
                transitionConfig = getTransition(spinDuration / 20, start);
                break;
        }

        controls.start({
            rotate: start + 360,
            scale: 1,
            transition: transitionConfig
        });
    };

    const handleHoverEnd = () => {
        const start = rotation.get();
        controls.start({
            rotate: start + 360,
            scale: 1,
            transition: getTransition(spinDuration, start)
        });
    };

    return (
        <div className={`relative w-[130px] h-[130px] sm:w-40 sm:h-40 lg:w-[180px] lg:h-[180px] mx-auto ${className} shadow-md bg-[#f0edde] rounded-full flex items-center justify-center`}>

            {centerImage && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <img
                        src={centerImage}
                        alt="center"
                        className="
                            object-contain
                            w-14 h-14
                            md:w-16 md:h-16
                            lg:w-20 lg:h-20
                        "
                        loading="lazy"
                    />
                </div>
            )}


            {/* ROTATING TEXT */}
            <motion.div
                className={`m-0 mx-auto rounded-full w-[125px] h-[125px] md:w-[140px] md:h-[140px] lg:w-[150px] lg:h-[150px] relative font-black text-center cursor-pointer origin-center ${className}`}
                style={{ rotate: rotation }}
                initial={{ rotate: 0 }}
                animate={controls}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
            >
                {/* CENTER IMAGE */}

                {/* CIRCULAR LETTERS */}
                {letters.map((letter, i) => {
                    const rotationDeg = (360 / letters.length) * i;
                    const factor = Math.PI / letters.length;
                    const x = factor * i;
                    const y = factor * i;
                    const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

                    return (
                        <span
                            key={i}
                            className="absolute inline-block inset-0 text-xl md:text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
                            style={{ transform }}
                        >
                            {letter}
                        </span>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default CircularText;
