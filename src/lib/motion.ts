
export interface AnimateProps {
  initial?: Object;
  animate?: Object;
  exit?: Object;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string | number[];
    type?: string;
  };
  className?: string;
}

export const fadeIn = (direction: string, delay: number): AnimateProps => {
  return {
    initial: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0,
    },
    animate: {
      y: 0,
      x: 0,
      opacity: 1,
    },
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  };
};

export const staggerContainer = (staggerChildren: number, delayChildren: number): AnimateProps => {
  return {
    animate: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};
