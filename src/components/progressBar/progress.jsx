import { useNProgress } from "../../utils/nProgress/useNProgress";

function Progress({ isAnimating }) {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <div
      style={{
        opacity: isFinished ? 0 : 1,
        pointerEvents: "none",
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      <div
        style={{
          background: "#54fff5",
          height: 3,
          left: 0,
          marginLeft: `${(-1 + progress) * 100}%`,
          position: "fixed",
          top: 0,
          transition: `margin-left ${animationDuration}ms linear`,
          width: "100%",
          zIndex: 1031,
        }}
      >
        <div
          style={{
            boxShadow: "0 0 10px #54fff5, 0 0 5px #54fff5",
            display: "block",
            height: "100%",
            opacity: 1,
            position: "absolute",
            right: 0,
            transform: "rotate(3deg) translate(0px, -4px)",
            width: 100,
          }}
        />
      </div>
    </div>
  );
}

export default Progress;
