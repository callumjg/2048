import React from "react";
import { connect } from "react-redux";
import { TransitionMotion, spring } from "react-motion";
import "./GameOverCard.css";

const GameOverCard = (props) => {
  const willLeave = () => ({ opacity: spring(0) });
  const willEnter = () => ({ opacity: 0 });
  const styles = props.isGameOver
    ? [
        {
          key: "main",
          style: { opacity: spring(1, { stiffness: 55 }) },
        },
      ]
    : [];

  return (
    <TransitionMotion
      willLeave={willLeave}
      willEnter={willEnter}
      styles={styles}
    >
      {(styles) => (
        <>
          {styles.map((conf) => (
            <div
              key={conf.key}
              className="game-over-card"
              style={{ ...conf.style }}
            >
              <h1>Game Over</h1>
            </div>
          ))}
        </>
      )}
    </TransitionMotion>
  );
};

const mapStateToProps = ({ isGameOver }) => ({ isGameOver });

export default connect(mapStateToProps)(GameOverCard);
